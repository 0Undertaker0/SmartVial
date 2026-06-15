// Predictor service (prototype)
// Provides a simple risk scoring and a stub for Gemini integration.

module.exports = {
  scoreIncident: async (incident) => {
    // Simple heuristic: severity + proximity to known hotspots (not implemented)
    const base = incident.severity || 1;
    const score = Math.min(1, base / 5);
    return { risk_score: score, meta: { heuristic: true } };
  },

  callGemini: async (prompt) => {
    // Stub: in production implement Gemini client and secure API keys.
    // Return a mock response for demo.
    return { suggestion: 'Areas with frequent collisions during 18:00-20:00', source: 'gemini-prototype' };
  }
};
