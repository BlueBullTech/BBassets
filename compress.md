## compress.js
This Node.js script allows you to compress one or more images using the TinyPNG API and optionally convert them to a different format (webp, png, jpg). It also generates a link.txt file with ready-to-use CDN and HTML blocks for each processed image.
### Features
- Compress images using TinyPNG.
- Convert images to webp, png, jpg
- Process multiple images at once.
- Automatically generates a link.txt file in the output folder:
<!-- Image name -->
https:                                                                                                                                                                                                                                                                                                                               //cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/[output_folder]/[filename].[ext]

<img src="https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/[output_folder]/[filename].[ext]" alt="filename">

### Usage 
Go to the folder: cd BBassets
Add the image in the project
In terminal node compress.js <image1-path>, <image2/path> <[optional_output_ext]> <outputFolder>
If the extention is not provided, the script compress and convert images to default WebP:
**The last argument is the outputfolder**
Example: node compress.js input/logo-live-bet.jpg png output