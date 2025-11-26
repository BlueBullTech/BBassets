const fs = require("fs");
const path = require("path");
const tinify = require("tinify");
const dotenv = require("dotenv");

// Load .env
dotenv.config();
if (!process.env.TINIFY_API_KEY) {
  console.error("❌ Missing TINIFY_API_KEY in .env file");
  process.exit(1);
}
tinify.key = process.env.TINIFY_API_KEY;
console.log("TinyPNG API key loaded.");

// --------------------
// Process arguments
// --------------------
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log("Usage: node compress.js <image1> <image2> ... <output_folder> [output_ext]");
  process.exit(0);
}

// Last argument = output folder
const outputDir = args.pop();

// Optional last argument = output extension
let outputExt = "webp";
if (args.length > 0 && ["webp", "png", "jpg"].includes(args[args.length-1].toLowerCase())) {
  outputExt = args.pop().toLowerCase();
}

// Remaining args = image files
const files = args;

// Ensure output folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Path to link.txt
const linkFilePath = path.join(outputDir, "link.txt");

// Create link.txt if missing
if (!fs.existsSync(linkFilePath)) {
  fs.writeFileSync(linkFilePath, "", "utf8");
  console.log(`📄 Created link.txt in: ${outputDir}`);
}

// --------------------
// Generate CDN + HTML block
// --------------------
function generateLinkBlock(relativePath, filenameOnly) {
  return `
<!-- ${filenameOnly} -->
https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/${relativePath}

<img src="https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/${relativePath}" alt="${filenameOnly}">
`;
}

// --------------------
// Process a single image
// --------------------
async function processImage(file, outputExt) {
  const ext = path.extname(file).toLowerCase();
  console.log(ext);
  const name = path.basename(file, ext);
  console.log(name);
  const outputFile = path.join(outputDir, `${name}.${outputExt}`);
  console.log(outputFile);

  try {
    const source = tinify.fromFile(file);

    if (ext === `.${outputExt}`) {
      // File already has the desired extension, just compress
      await source.toFile(outputFile);
      console.log(`✔ Compressed (no conversion): ${outputFile}`);
    } else {
      // Normalize extension for TinyPNG
      let tinifyType = outputExt.toLowerCase();
      if (tinifyType === "jpg") tinifyType = "jpeg"; // TinyPNG prefers "jpeg"
      tinifyType = `image/${tinifyType}`;

      // Convert + compress
      const converted = source.convert({ type: tinifyType });
      await converted.toFile(outputFile);
      console.log(`✔ Converted + Compressed → ${outputFile}`);
    }

    // Append link block to link.txt
    const filenameOnly = `${name}.${outputExt}`;
    // Build a relative path from the current working directory to the output file
    let relativePath = path.relative(process.cwd(), path.join(outputDir, filenameOnly)).replace(/\\/g, "/");
    // If the relative path climbs out of the project (starts with '..') or is empty,
    // fall back to using the outputDir + filename (still normalized for CDN).
    if (!relativePath || relativePath.startsWith("..")) {
      relativePath = path.join(outputDir, filenameOnly).replace(/\\/g, "/");
    }
    
    const block = generateLinkBlock(relativePath, filenameOnly);
    fs.appendFileSync(linkFilePath, block, "utf8");
    console.log(`🔗 Added link block for ${filenameOnly}`);

  } catch (err) {
    console.error(`❌ Error processing ${file}: ${err.message}`);
  }
}

// --------------------
// Run processing
// --------------------
async function run() {
  for (const file of files) {
    // Skip directories
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      await processImage(file, outputExt);
    } else {
      console.warn(`⚠ Skipping non-file: ${file}`);
    }
  }
}

run();
