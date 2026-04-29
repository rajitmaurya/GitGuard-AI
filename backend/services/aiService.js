const axios = require('axios');

/**
 * Sends code diff to Gemini AI for analysis
 */
const analyzeCode = async (diff) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    // Using Gemini 1.5 Flash for fast analysis
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
Analyze this code diff. Find bugs, security issues, performance problems. Suggest fixes.

IMPORTANT: Return ONLY a valid JSON object in the following format. Do not include markdown code block syntax (like \`\`\`json) around the JSON output.

{
  "issues": [
    {
      "type": "Bug",
      "severity": "High",
      "description": "Short description of the problem",
      "fix": "corrected code snippet"
    }
  ]
}

Code Diff:
${diff}
`;

    const response = await axios.post(url, {
      contents: [{
        parts: [{ text: prompt }]
      }],
      // Force the model to return JSON
      generationConfig: {
        response_mime_type: "application/json",
      }
    });

    const resultText = response.data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    const analysis = JSON.parse(resultText);
    return analysis;

  } catch (error) {
    console.error('Error analyzing code with AI:', error?.response?.data || error.message);
    return null;
  }
};

module.exports = {
  analyzeCode
};
