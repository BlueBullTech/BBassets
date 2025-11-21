const fs = require("fs");
const path = require("path");
// Load environment variables from .env
const dotenv = require("dotenv");
const tinify = require("tinify");

// dotenv.config();
const result = dotenv.config();

// Set TinyPNG key explicitly from parsed result
const apiKey = result.parsed.TINIFY_API_KEY;

if (!apiKey) {
  console.error("❌ Missing TinyPNG API Key. Set TINIFY_API_KEY environment variable.");
  process.exit(1);
}

tinify.key = apiKey;

// console.log("TinyPNG API Key is set:", tinify.key);

// Check minimum arguments
if (process.argv.length < 4) {
  console.log("Usage: node compress.js <image1> <image2> ... <output_folder>");
  process.exit(0);
}

// Last argument is the output folder
const args = process.argv.slice(2);
const outputDir = args.pop(); 
const files = args;

// Ensure output folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function getExt(file) {
  return path.extname(file).toLowerCase();
}

async function processImage(file) {
  const ext = getExt(file);
  const isWebp = ext === ".webp";
  const name = path.basename(file, ext);
  const outputFile = path.join(outputDir, `${name}.webp`);

  try {
    const source = tinify.fromFile(file);

    if (isWebp) {
      await source.toFile(outputFile);
      console.log(`✔ Compressed (WebP unchanged): ${outputFile}`);
    } else {
      const converted = source.convert({ type: ["image/webp"] });
      await converted.toFile(outputFile);
      console.log(`✔ Converted + Compressed → ${outputFile}`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${file}: ${err.message}`);
  }
}

async function run() {
  for (const file of files) {
    await processImage(file);
  }
}

run();
