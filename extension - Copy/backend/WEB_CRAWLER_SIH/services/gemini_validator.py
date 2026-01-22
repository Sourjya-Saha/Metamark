import google.generativeai as genai
from config import Config
import json
import re

class GeminiValidator:
    def __init__(self):
        genai.configure(api_key=Config.GOOGLE_GEMINI_API_KEY)

        # FIX: Use model supported by your installed Gemini SDK (v1beta)
        self.client = genai.GenerativeModel("models/gemini-1.0-pro")

    def validate_product_text(self, product_data, ocr_data):
        description = product_data.get('description', 'N/A')
        description_snippet = description[:500] if isinstance(description, str) else 'N/A'

        ocr_text = ocr_data.get('full_text', 'No text extracted')
        ocr_snippet = ocr_text[:2000] if isinstance(ocr_text, str) else 'No text extracted'

        prompt = f"""... your full same prompt ..."""

        try:
            response = self.client.generate_content(prompt)
            text = response.text.strip()

            text = re.sub(
                r'^\s*```(?:json)?\s*|\s*```\s*$',
                '',
                text,
                flags=re.DOTALL | re.IGNORECASE
            ).strip()

            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            else:
                return json.loads(text)

        except json.JSONDecodeError as e:
            return {
                'compliance_score': 70,
                'status': 'PARTIAL',
                'violations': [{
                    'rule': 'JSON Parse Error',
                    'severity': 'medium',
                    'description': f'AI response could not be parsed as JSON: {e}',
                    'recommendation': 'Manual review required'
                }],
                'passed_checks': [],
                'extracted_from_ocr': {},
                'overall_assessment': 'Unable to parse AI response',
                'final_grade': 'C',
                'grade_explanation': 'Analysis completed with errors'
            }

        except Exception as e:
            return {
                'compliance_score': 0,
                'status': 'ERROR',
                'violations': [{
                    'rule': 'API Error',
                    'severity': 'high',
                    'description': str(e),
                    'recommendation': 'Check API'
                }],
                'passed_checks': [],
                'extracted_from_ocr': {},
                'overall_assessment': f'Error: {str(e)}',
                'final_grade': 'F',
                'grade_explanation': 'System error during analysis'
            }
