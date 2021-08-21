const ocrSpace = require("ocr-space-api-wrapper");

async function main() {
  try {
    // Using the OCR.space default free token + remote file
    const res1 = await ocrSpace("http://dl.a9t9.com/ocrbenchmark/eng.png");

    // Using your personal token + local file
    const res2 = await ocrSpace("/path/to/file.pdf", {
      apiKey: "<API_KEY_HERE>",
    });

    // Using your personal token + base64 image + custom language
    const res3 = await ocrSpace("data:image/png;base64...", {
      apiKey: "<API_KEY_HERE>",
      language: "ita",
    });
  } catch (error) {
    console.log(error);
  }
}
