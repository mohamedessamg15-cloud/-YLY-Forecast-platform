const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // There is no explicit list models in the JS SDK? Let's try fetching directly using fetch.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    console.log("AVAILABLE MODELS:");
    if (data.models) {
      data.models.forEach(m => console.log(m.name, "->", m.supportedGenerationMethods?.join(',')));
    } else {
      console.log(data);
    }
  } catch(e) {
    console.error(e);
  }
}
run();
