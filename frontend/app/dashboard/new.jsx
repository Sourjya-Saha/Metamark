'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  Package,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Download,
  ShoppingCart,
  Building2,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  Eye,
  FileText,
  Shield,
  Star,
  ArrowUp,
  ArrowDown,
  Bell,
  X,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from 'recharts';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
const COLORS = ['#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

// Navbar Component
import Navbar from '../Navbar';

// Product Details Modal (for full product details & compliance report)
const ProductDetailsModal = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/api/product/${productId}`, {
      credentials: 'include', // ✅ Send session cookie
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Session expired. Please log in again.');
          }
          throw new Error('Failed to fetch product details');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data.product);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching product details');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (!productId) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-60 px-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="product-details-title"
    >
      <div className="bg-gradient-to-br from-purple-900/30 to-black rounded-3xl border-2 border-purple-500/50 p-8 max-w-4xl w-full max-h-90vh overflow-y-auto text-white shadow-2xl shadow-purple-500/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-500/30">
          <h2
            id="product-details-title"
            className="text-2xl font-bold uppercase tracking-wider"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Product Details - <span className="text-purple-400">{productId}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-purple-600/20 p-2 rounded-lg transition-all focus:outline-none"
            aria-label="Close product details"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p
              className="text-gray-300 uppercase tracking-wider mt-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Loading Product Details...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-600/20 border border-red-500/50 rounded-xl p-4 mb-4">
            <p
              className="text-red-400 uppercase tracking-wider"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Product */}
        {product && (
          <section className="mb-8">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline mb-4 block font-semibold text-lg"
            >
              {product.title}
            </a>
            <p className="mb-2 font-semibold">
              <strong>Price:</strong> {product.currency} {product.price}
            </p>
            <p className="mb-2">
              <strong>ASIN:</strong> {product.asin} | <strong>Country:</strong> {product.country} |{' '}
              <strong>Language:</strong> {product.language}
            </p>
            <p className="mb-4 italic text-sm">{product.remarks}</p>

            {product.productjson?.description && (
              <>
                <h3 className="text-xl font-bold mb-2">Description</h3>
                <p className="mb-4">{product.productjson.description}</p>
              </>
            )}

            {product.productjson?.featurebullets && (
              <>
                <h3 className="text-xl font-bold mb-2">Features</h3>
                <ul className="list-disc list-inside mb-4">
                  {product.productjson.featurebullets.map((fb, idx) => (
                    <li key={idx}>{fb.value}</li>
                  ))}
                </ul>
              </>
            )}

            {product.productjson?.productdetails && (
              <>
                <h3 className="text-xl font-bold mb-2">Product Details</h3>
                <ul className="list-disc list-inside mb-4">
                  {Object.entries(product.productjson.productdetails).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {product.productjson?.specifications && (
              <>
                <h3 className="text-xl font-bold mb-2">Specifications</h3>
                <ul className="list-disc list-inside mb-4">
                  {Object.entries(product.productjson.specifications).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="text-xl font-bold mb-2">Compliance Score</h3>
            <p className="font-bold text-lg mb-2">
              {product.compliancereport?.compliancescore ?? product.rating} (
              {product.compliancereport?.compliancegrade ?? 'N/A'})
            </p>
            <p
              className={`mb-4 font-semibold ${
                product.compliancereport?.iscompliant ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {product.compliancereport?.iscompliant ? 'Compliant' : 'Non-Compliant'}
            </p>

            {product.compliancereport?.violations?.length > 0 && (
              <>
                <h3 className="text-xl font-bold mb-2">Violations</h3>
                <ul className="list-disc list-inside text-sm mb-6">
                  {product.compliancereport.violations.map((viol, idx) => (
                    <li key={idx}>
                      <strong>{viol.severity}:</strong> {viol.regulation} - {viol.issue}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {product.compliancereport?.strengths && (
              <>
                <h3 className="text-xl font-bold mb-2">Strengths</h3>
                <ul className="list-disc list-inside text-sm mb-6">
                  {product.compliancereport.strengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </>
            )}

            {product.compliancereport?.recommendations && (
              <>
                <h3 className="text-xl font-bold mb-2">Recommendations</h3>
                <ul className="list-disc list-inside text-sm">
                  {product.compliancereport.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {/* Images */}
        {product && (
          <section>
            <h3 className="text-xl font-bold mb-4">Product Images ({product.imagecount})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Array.from({ length: product.imagecount }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-purple-800 rounded-lg aspect-square flex items-center justify-center text-purple-400"
                >
                  Image {idx + 1}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Mini Line Graph Component
const MiniLineGraph = ({ trend }) => {
  if (!trend) return null;
  const data = Array.from({ length: 7 }, (_, i) => ({
    value: 50 + Math.sin(i) * 20 + trend * i,
  }));

  return (
    <div className="mt-3 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="miniGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke="#fff" fill="url(#miniGradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, icon, trend, bgColor, subtitle }) => (
  <div
    className={`${bgColor} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    style={{
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      fontFamily: 'Poppins, sans-serif',
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="bg-white/20 rounded-full p-3 backdrop-blur">{icon}</div>
      {trend !== undefined && (
        <div className="flex items-center gap-1">
          <span className={trend >= 0 ? 'text-green-400' : 'text-white'}>
            {trend >= 0 ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
          </span>
          <span className="text-sm font-semibold">{Math.abs(trend).toFixed(1)}%</span>
        </div>
      )}
    </div>
    <h3 className="text-xs font-semibold uppercase tracking-wider opacity-90 mb-2">{title}</h3>
    <p className="text-4xl font-extrabold">{value}</p>
    {subtitle && <p className="text-xs uppercase tracking-wide opacity-70 mt-1">{subtitle}</p>}
    <MiniLineGraph trend={trend} />
  </div>
);

// Main Dashboard Component
export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ AUTHENTICATION STATE
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ AUTHENTICATION CHECK
  useEffect(() => {
    const userIdParam = searchParams.get('userId');
    const roleParam = searchParams.get('role');

    // Try URL params first
    if (userIdParam && roleParam) {
      setUserId(parseInt(userIdParam));
      setUserRole(roleParam);
      setIsAuthenticated(true);

      // Also store in localStorage
      localStorage.setItem('user_id', userIdParam);
      localStorage.setItem('user_role', roleParam);
      localStorage.setItem('isAuthenticated', 'true');

      console.log(`[AUTH] User ID: ${userIdParam}, Role: ${roleParam}`);
    } else {
      // Fallback to localStorage
      const storedUserId = localStorage.getItem('user_id');
      const storedRole = localStorage.getItem('user_role');
      const storedAuth = localStorage.getItem('isAuthenticated');

      if (storedUserId && storedRole && storedAuth === 'true') {
        setUserId(parseInt(storedUserId));
        setUserRole(storedRole);
        setIsAuthenticated(true);
        console.log(`[AUTH] Loaded from localStorage - User ID: ${storedUserId}, Role: ${storedRole}`);
      } else {
        console.warn('[AUTH] No authentication found, redirecting to login...');
        setIsAuthenticated(false);
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    }
  }, [searchParams, router]);

  // State management
  const [summary, setSummary] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [timeFilter, setTimeFilter] = useState('week');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const itemsPerPage = 5;
  const [complianceTrend, setComplianceTrend] = useState([]);

  // Scroll state (for any UI effects, not used but kept consistent)
  useEffect(() => {
    const handleScroll = () => window.scrollY;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom scrollbar styles injection
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Custom Scrollbar Styles */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3));
        border-radius: 10px;
        transition: all 0.3s ease;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, rgba(168, 85, 247, 0.6), rgba(6, 182, 212, 0.6));
      }
      /* Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(168, 85, 247, 0.3) transparent;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // ✅ FETCH ALL DASHBOARD DATA WITH AUTHENTICATION
  const fetchAllData = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      // Fetch summary and products using new APIs
      const [dashboardRes, productsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/dashboard`, {
          credentials: 'include', // ✅ Send session cookie
        }),
        fetch(`${API_BASE_URL}/api/products`, {
          credentials: 'include', // ✅ Send session cookie
        }),
      ]);

      if (!dashboardRes.ok || !productsRes.ok) {
        if (dashboardRes.status === 401 || productsRes.status === 401) {
          // Session expired - redirect to login
          localStorage.clear();
          router.push('/auth/login');
          return;
        }
        throw new Error('Failed to fetch dashboard data');
      }

      const dashboardData = await dashboardRes.json();
      const productsData = await productsRes.json();

      // Normalize products - productsData has .products array
      const normalizedProducts = productsData.products.map((p) => ({
        ...p,
        category: p.category || 'Uncategorized', // default can be extended if API has categories
        compliance_score: p.rating ?? 0,
        compliance_grade: p.remarks && p.remarks.includes('minor') ? 'B' : 'A', // simple heuristic
        organic_certified: false,
        listed_price: p.price,
      }));

      setSummary({
        total_products_scanned: dashboardData.statistics?.total_products ?? 0,
        compliant_products: dashboardData.statistics?.compliant_products ?? 0,
        non_compliant_products: dashboardData.statistics?.non_compliant_products ?? 0,
        compliance_rate: dashboardData.statistics?.average_compliance_score ?? 0,
        total_violations: dashboardData.statistics?.total_violations ?? 0,
        recent_violations: dashboardData.top_violations ?? [],
        violations_by_severity: {
          critical: dashboardData.statistics?.critical_violations ?? 0,
          major: dashboardData.statistics?.major_violations ?? 0,
          minor: dashboardData.statistics?.minor_violations ?? 0,
        },
      });

      setProducts(normalizedProducts);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FETCH DATA ON MOUNT (only when authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  // Generate notifications and compliance trend when data changes
  useEffect(() => {
    if (summary && products.length > 0) {
      generateNotifications();
      // Generate complianceTrend for area chart (mocked monthly)
      setComplianceTrend(
        Array.from({ length: 12 }, (_, i) => ({
          date: `2025-${String(i + 1).padStart(2, '0')}-01`,
          score: Math.min(100, Math.max(0, 50 + i * 3 + Math.sin(i) * 10)),
        }))
      );
    }
  }, [summary, products]);

  // Notifications generator from summary
  const generateNotifications = () => {
    const newNotifications = [];

    if (summary?.recent_violations?.length > 0) {
      newNotifications.push({
        id: 'recent-violations',
        type: 'warning',
        title: 'NEW VIOLATIONS DETECTED',
        message: `${summary.recent_violations.length} violation types detected`,
        time: 'RECENT',
        icon: <AlertCircle className="h-4 w-4" />,
      });
    }

    if ((summary?.violations_by_severity?.critical ?? 0) > 0) {
      newNotifications.push({
        id: 'critical-violations',
        type: 'alert',
        title: 'CRITICAL VIOLATIONS',
        message: `${summary.violations_by_severity.critical} critical violations found`,
        time: '1 HOUR AGO',
        icon: <XCircle className="h-4 w-4" />,
      });
    }

    if (summary?.compliant_products > 0) {
      newNotifications.push({
        id: 'compliance-success',
        type: 'success',
        title: 'COMPLIANCE SUCCESS',
        message: `${summary.compliant_products} products fully compliant`,
        time: 'TODAY',
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    }

    setNotifications(newNotifications);
  };

  // ✅ REFRESH DASHBOARD DATA WITH AUTHENTICATION
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setTimeout(() => setRefreshing(false), 800);
  };

  // ✅ EXPORT CSV VIOLATIONS WITH AUTHENTICATION
  const handleExportViolations = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/dashboard/export-violations`, {
        credentials: 'include', // ✅ Send session cookie
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'violations.csv';
      a.click();
    } catch (err) {
      console.error('Error exporting violations CSV:', err);
    }
  };

  // Analytics memoized for charts
  const analytics = useMemo(() => {
    if (!products.length) return null;

    // Compliance grade distribution
    const gradeDistribution = products.reduce((acc, p) => {
      const grade = p.compliance_grade || 'N/A';
      acc[grade] = (acc[grade] || 0) + 1;
      return acc;
    }, {});

    // Violations by severity from summary
    const severityDistribution = summary?.violations_by_severity;

    // Marketplace distribution (placeholder)
    const marketplaceData = products.reduce((acc, p) => {
      const mp = p.marketplace || 'Unknown';
      acc[mp] = (acc[mp] || 0) + 1;
      return acc;
    }, {});

    // Category distribution (placeholder)
    const categoryData = products.reduce((acc, p) => {
      const cat = p.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    return {
      gradeDistribution,
      severityDistribution,
      marketplaceData,
      categoryData,
      avgScore: products.reduce((sum, p) => sum + parseFloat(p.compliance_score || 0), 0) / products.length,
      validatedProducts: products.filter((p) => p.compliance_score).length,
    };
  }, [products, summary]);

  // Data transformations for charts
  const gradeData = analytics ? Object.entries(analytics.gradeDistribution).map(([name, value]) => ({ name, value })) : [];
  const severityData = analytics
    ? Object.entries(analytics.severityDistribution).map(([name, value]) => ({ name: name.toUpperCase(), value }))
    : [];
  const marketplaceData = analytics ? Object.entries(analytics.marketplaceData).map(([name, total]) => ({ name, total })) : [];
  const categoryChartData = analytics ? Object.entries(analytics.categoryData).map(([name, products]) => ({ name, products })) : [];

  // Filtered product list with search and category filter
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productid?.toString().includes(searchTerm);
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  const categories = ['all', ...new Set(products.map((p) => p.category).filter(Boolean))];
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // ✅ SHOW AUTHENTICATION WARNING IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8 ml-0 md:ml-64 flex items-center justify-center">
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <AlertCircle className="w-12 h-12 text-red-400" />
              <h2 className="text-2xl font-bold text-red-400">Authentication Required</h2>
            </div>
            <p className="text-gray-300 mb-4">Please log in to access this page. Redirecting to login...</p>
            <button
              onClick={() => router.push('/auth/login')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
            >
              Go to Login
            </button>
          </div>
        </div>
      </>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center ml-64">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-300 uppercase tracking-wider text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white p-8 ml-64" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 mt-4 flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tight"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  Compliance Dashboard
                </span>
              </h1>
              <div className="border-t-2 border-purple-400/50" />
              <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
                Real-time compliance monitoring and analytics
              </p>
            </div>

            <div className="flex gap-3 items-center">
              {/* Time Filter */}
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-black/60 border border-purple-500/30 rounded-lg px-4 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-cyan-400/50"
              >
                <option value="week">THIS WEEK</option>
                <option value="month">THIS MONTH</option>
                <option value="year">THIS YEAR</option>
              </select>

              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-all"
                aria-label="Toggle notifications panel"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Refresh */}
              <button
                onClick={handleRefresh}
                className={`px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-all ${
                  refreshing ? 'animate-pulse' : ''
                }`}
                aria-label="Refresh dashboard"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>

              {/* Export */}
              <button
                onClick={handleExportViolations}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all uppercase tracking-wider flex items-center gap-2 text-xs"
                aria-label="Export violations CSV"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="bg-black/60 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold uppercase tracking-wider">Notifications ({notifications.length})</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close notifications panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border ${
                      notif.type === 'warning'
                        ? 'bg-amber-600/10 border-amber-500/30'
                        : notif.type === 'alert'
                        ? 'bg-red-600/10 border-red-500/30'
                        : 'bg-green-600/10 border-green-500/30'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-white/10">{notif.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm uppercase tracking-wider">{notif.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{notif.message}</p>
                      <span className="text-xs text-gray-500 mt-1 block uppercase tracking-wider">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Products"
              value={summary?.total_products_scanned || 0}
              subtitle={`${summary?.total_products_scanned || 0} Scanned`}
              icon={<Package className="w-6 h-6" />}
              trend={summary?.total_products_scanned}
              bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            />
            <MetricCard
              title="Compliant"
              value={summary?.compliant_products || 0}
              subtitle={`${summary?.compliance_rate?.toFixed(1) || 0}% Rate`}
              icon={<CheckCircle2 className="w-6 h-6" />}
              trend={summary?.compliance_rate}
              bgColor="bg-gradient-to-br from-green-500 to-green-600"
            />
            <MetricCard
              title="Non-Compliant"
              value={summary?.non_compliant_products || 0}
              subtitle={`${(100 - (summary?.compliance_rate || 0)).toFixed(1)}% Issues`}
              icon={<XCircle className="w-6 h-6" />}
              trend={-(100 - (summary?.compliance_rate || 0)).toFixed(1)}
              bgColor="bg-gradient-to-br from-red-500 to-red-600"
            />
            <MetricCard
              title="Total Violations"
              value={summary?.total_violations || 0}
              subtitle="Requires Attention"
              icon={<AlertCircle className="w-6 h-6" />}
              trend={-1.2}
              bgColor="bg-gradient-to-br from-amber-500 to-amber-600"
            />
          </div>

          {/* Charts Row 1 - Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Compliance Grade Distribution */}
            <div className="bg-black/60 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
              <div className="bg-gradient-to-r from-purple-600/30 to-purple-700/30 rounded-t-xl p-4 mb-6 border border-purple-500/40">
                <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  Compliance Grade Distribution
                </h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie
                      data={gradeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {gradeData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        fontFamily: 'Poppins, sans-serif',
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {gradeData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {entry.name}: {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compliance Score Trend */}
            <div className="bg-black/60 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
              <div className="bg-gradient-to-r from-cyan-600/30 to-cyan-700/30 rounded-t-xl p-4 mb-6 border border-cyan-500/40">
                <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Compliance Score Trend
                </h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={complianceTrend}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      stroke="#666"
                      style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', textTransform: 'uppercase' }}
                    />
                    <YAxis
                      stroke="#666"
                      domain={[0, 100]}
                      style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        fontFamily: 'Poppins, sans-serif',
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#06b6d4"
                      fillOpacity={1}
                      fill="url(#colorScore)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 - Marketplace & Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Products by Marketplace */}
            <div className="bg-black/60 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
              <div className="bg-gradient-to-r from-purple-600/30 to-purple-700/30 rounded-t-xl p-4 mb-6 border border-purple-500/40">
                <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-purple-400" />
                  Products by Marketplace
                </h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marketplaceData}>
                    <XAxis
                      dataKey="name"
                      stroke="#666"
                      style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', textTransform: 'uppercase' }}
                    />
                    <YAxis stroke="#666" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        fontFamily: 'Poppins, sans-serif',
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                      }}
                    />
                    <Bar dataKey="total" fill="#a855f7" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Products by Category */}
            <div className="bg-black/60 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
              <div className="bg-gradient-to-r from-green-600/30 to-green-700/30 rounded-t-xl p-4 mb-6 border border-green-500/40">
                <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  Products by Category
                </h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="products"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelStyle={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                      }}
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        fontFamily: 'Poppins, sans-serif',
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                      }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Violations Table */}
          <div className="bg-black/60 border border-purple-500/30 rounded-2xl backdrop-blur-sm mb-8">
            <div className="bg-gradient-to-r from-red-600/30 to-red-700/30 rounded-t-xl p-4 mb-6 border border-red-500/40">
              <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Recent Violations
              </h3>
            </div>
            <div className="p-6 overflow-x-auto border border-purple-500/30 rounded-2xl">
              <table className="w-full text-xs">
                <thead className="bg-purple-600/30 border-b border-purple-500/30">
                  <tr>
                    <th className="px-4 py-3 text-left uppercase tracking-wider font-bold">Product ID</th>
                    <th className="px-4 py-3 text-left uppercase tracking-wider font-bold">Rule</th>
                    <th className="px-4 py-3 text-left uppercase tracking-wider font-bold">Severity</th>
                    <th className="px-4 py-3 text-left uppercase tracking-wider font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10">
                  {summary?.recent_violations?.slice(0, 5).map((violation, index) => (
                    <tr key={index} className="hover:bg-purple-600/10">
                      <td className="px-4 py-3 font-mono text-cyan-400 uppercase tracking-wider">
                        {violation.product_id}
                      </td>
                      <td className="px-4 py-3 uppercase tracking-wider">
                        {violation.rule_desc || violation.violation_type}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wider ${
                            violation.severity?.toLowerCase() === 'critical'
                              ? 'bg-red-600/30 text-red-400 border border-red-500/50'
                              : violation.severity?.toLowerCase() === 'major'
                              ? 'bg-amber-600/30 text-amber-400 border border-amber-500/50'
                              : 'bg-blue-600/30 text-blue-400 border border-blue-500/50'
                          }`}
                        >
                          {violation.severity || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 uppercase tracking-wider">
                        {violation.checked_at
                          ? new Date(violation.checked_at).toLocaleString()
                          : violation.date || 'N/A'}
                      </td>
                    </tr>
                  ))}
                  {(!summary?.recent_violations || summary.recent_violations.length === 0) && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-8 text-center text-gray-400 uppercase tracking-wider font-bold"
                      >
                        No recent violations
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-black/60 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-purple-600/30 to-purple-700/30 rounded-t-xl p-4 border border-purple-500/40">
              <h3 className="text-base font-bold uppercase tracking-wider flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                All Products
              </h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="SEARCH PRODUCTS..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 pr-4 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-xs uppercase tracking-wider focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-xs uppercase tracking-wider focus:outline-none focus:border-cyan-400/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-6 overflow-x-auto border-b border-l border-r rounded-2xl border-purple-500/30">
              <table className="w-full text-xs border-separate border-spacing-y-1" style={{ borderCollapse: 'separate' }}>
                <thead className="bg-purple-600/30 rounded-t-2xl text-white tracking-wider uppercase font-bold">
                  <tr>
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">ASIN</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Compliance Score</th>
                    <th className="px-4 py-3 text-left">Remarks</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.productid} className="hover:bg-purple-600/10 transition-colors">
                      <td className="px-4 py-3 font-semibold uppercase tracking-wider">{product.title}</td>
                      <td className="px-4 py-3 uppercase tracking-wider font-mono">{product.asin}</td>
                      <td className="px-4 py-3 font-bold uppercase tracking-wider">
                        {product.price?.toFixed(2) ?? 'N/A'} {product.currency}
                      </td>
                      <td className="px-4 py-3 font-bold uppercase tracking-wider">
                        {product.rating !== null && product.rating !== undefined ? product.rating.toFixed(1) : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm tracking-wider">{product.remarks || '-'}</td>
                      <td className="px-4 py-3 text-center">
                        {product.rating !== null && product.rating >= 80 ? (
                          <span className="bg-green-600/30 text-green-400 py-1 px-3 rounded-full uppercase text-xs font-bold tracking-wider border border-green-500/50">
                            Compliant
                          </span>
                        ) : (
                          <span className="bg-red-600/30 text-red-400 py-1 px-3 rounded-full uppercase text-xs font-bold tracking-wider border border-red-500/50">
                            Non-Compliant
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedProductId(product.productid)}
                          className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition border border-purple-500/50"
                          aria-label={`View details for ${product.title}`}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {currentProducts.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-400 uppercase tracking-wider">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-purple-700 rounded-lg text-white disabled:opacity-50 hover:bg-purple-600 transition uppercase tracking-wider text-xs font-bold border border-purple-500/50"
              >
                <ArrowLeft className="w-5 h-5 inline-block" />
              </button>
              <span className="inline-flex items-center text-xs text-gray-300 font-bold tracking-wider uppercase">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-purple-700 rounded-lg text-white disabled:opacity-50 hover:bg-purple-600 transition uppercase tracking-wider text-xs font-bold border border-purple-500/50"
              >
                <ArrowRight className="w-5 h-5 inline-block" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProductId && (
        <ProductDetailsModal productId={selectedProductId} onClose={() => setSelectedProductId(null)} />
      )}
    </>
  );
}
