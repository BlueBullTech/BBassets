const fs = require("fs");
const path = require("path");
// Load environment variables from .env
const dotenv = require("dotenv");
const tinify = require("tinify");

// dotenv.config();
const result = dotenv.config();

/* Show what was loaded
console.log("Loaded .env variables:", result.parsed);

if (result.error) {
    console.error("❌ Error loading .env:", result.error);
} else {
    console.log("✅ Loaded .env variables:", result.parsed);
}
*/
// Set TinyPNG key explicitly from parsed result
const apiKey = result.parsed.TINIFY_API_KEY;

if (!apiKey) {
  console.error("❌ Missing TinyPNG API Key. Set TINIFY_API_KEY environment variable.");
  process.exit(1);
}

tinify.key = apiKey;

// console.log("TinyPNG API Key is set:", tinify.key);

const files = process.argv.slice(2);

if (files.length === 0) {
  console.log("Usage: node compress.js file1.png file2.jpg ...");
  process.exit(0);
}

const outputDir = "./output";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
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
