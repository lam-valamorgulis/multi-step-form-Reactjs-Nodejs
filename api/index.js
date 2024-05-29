const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const cors = require("cors");
const morgan = require("morgan");
const sharp = require("sharp");

const app = express();
const port = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan("combined"));

// Set static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// Route to handle form submission
app.post("/upload", upload.single("profile[img_upload]"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const profile = req.body.profile;
  const information = req.body.information;

  // Path to the uploaded image
  const inputPath = req.file.path;
  // Path to save the resized image
  const outputPath = path.join(
    "public/uploads",
    `resized-${req.file.filename}`
  );

  // Resize the image using sharp
  try {
    await sharp(inputPath)
      .rotate() // Ensure the image is not rotated based on EXIF orientation
      .resize({ width: 300, height: 300, fit: sharp.fit.cover }) // Adjust the width and height as needed
      .toFile(outputPath);

    // Delete the original uploaded image
    fs.unlink(inputPath, (err) => {
      if (err) {
        console.error("Error deleting original image:", err);
      }
    });

    const imageSrc = `http://localhost:${port}/${outputPath}`;

    // Render EJS template with user data
    const html = await ejs.renderFile(
      path.join(__dirname, "views", "template.ejs"),
      {
        imageSrc,
        profile,
        information,
      }
    );

    // Generate PDF
    const generatePdf = async (html, pdfPath) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      await page.pdf({
        path: pdfPath,
        format: "A4",
        margin: {
          top: "1in",
          right: "0.5in",
          bottom: "1in",
          left: "0.5in",
        },
        printBackground: true,
      });
      await browser.close();
    };

    const pdfOutputPath = path.join(__dirname, "output", "output.pdf");
    await generatePdf(html, pdfOutputPath);

    res.sendFile(pdfOutputPath, (err) => {
      if (err) {
        res.status(500).send("Error generating PDF");
      }
      // Clean up resized image file
      fs.unlink(outputPath, () => {});
    });
  } catch (err) {
    console.error("Error processing image:", err);
    res.status(500).send("Error processing image");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
