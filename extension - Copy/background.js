// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 
    extensionEnabled: false,
    backendStatus: 'checking'
  });
  checkBackendStatus();
});


// Check backend status periodically
async function checkBackendStatus() {
  try {
    const response = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      credentials: 'include',
      signal: AbortSignal.timeout(5000)
    });
    
    const status = response.ok ? 'online' : 'offline';
    chrome.storage.sync.set({ backendStatus: status });
    
  } catch (error) {
    chrome.storage.sync.set({ backendStatus: 'offline' });
  }
}


setInterval(checkBackendStatus, 30000);


// ========== BULK PROCESSING STATE (NEW) ==========
let bulkQueue = [];
let bulkProcessing = false;
let bulkCurrentIndex = -1;
let bulkTabId = null;

function processNextBulkUrl() {
  if (!bulkProcessing) return;

  bulkCurrentIndex += 1;
  if (bulkCurrentIndex >= bulkQueue.length) {
    bulkProcessing = false;
    bulkQueue = [];
    bulkTabId = null;
    return;
  }

  const url = bulkQueue[bulkCurrentIndex];

  if (bulkTabId) {
    chrome.tabs.update(bulkTabId, { url });
  } else {
    chrome.tabs.create({ url }, (tab) => {
      bulkTabId = tab.id;
    });
  }
}


// ========== API PROXY FOR CONTENT SCRIPT ==========
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  // Handle API requests from content script
  if (request.action === 'apiRequest') {
    const { url, method, body, headers } = request;
    
    fetch(url, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      credentials: 'include', // Session cookies included here
      body: body ? JSON.stringify(body) : undefined
    })
    .then(response => {
      return response.json().then(data => ({
        ok: response.ok,
        status: response.status,
        data: data
      }));
    })
    .then(result => {
      sendResponse(result);
    })
    .catch(error => {
      sendResponse({ 
        ok: false, 
        status: 0, 
        error: error.message 
      });
    });
    
    return true; // Keep channel open for async response
  }
  
  if (request.action === 'checkBackend') {
    checkBackendStatus().then(() => {
      chrome.storage.sync.get(['backendStatus'], (data) => {
        sendResponse({ status: data.backendStatus });
      });
    });
    return true;
  }
  
  if (request.action === 'toggleExtension') {
    chrome.storage.sync.get(['extensionEnabled'], (data) => {
      const newState = !data.extensionEnabled;
      chrome.storage.sync.set({ extensionEnabled: newState });
      
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { 
            action: 'extensionStateChanged', 
            enabled: newState 
          }).catch(() => {});
        });
      });
      
      sendResponse({ enabled: newState });
    });
    return true;
  }

  // ========== BULK PROCESSING MESSAGES (NEW) ==========
  if (request.action === 'startBulkProcessing') {
    if (!request.urls || !request.urls.length) {
      sendResponse({ started: false, error: 'No URLs' });
      return true;
    }

    bulkQueue = request.urls;
    bulkProcessing = true;
    bulkCurrentIndex = -1;
    processNextBulkUrl();
    sendResponse({ started: true });
    return true;
  }

  if (request.action === 'bulkItemDone') {
    setTimeout(() => {
      processNextBulkUrl();
    }, 1500);
    sendResponse({ ok: true });
    return true;
  }
});
