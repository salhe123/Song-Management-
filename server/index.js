// const express = require('express');
// const multer = require('multer');
// const { Pool } = require('pg');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();

// // Initialize Express
// const app = express();
// const port = 3000;

// // Configure multer for file uploads
// const upload = multer({ dest: process.env.UPLOAD_DIR });

// // PostgreSQL client setup
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: parseInt(process.env.DB_PORT, 10),
// });

// // Endpoint to handle image uploads
// app.post('/upload', upload.single('image'), async (req, res) => {
//     const { title, album, artist, year, audio_file } = req.body;
//     const imagePath = req.file.path;

//     try {
//         // Read the image file
//         const image = fs.readFileSync(imagePath);
//         const imageBase64 = image.toString('base64');

//         // Insert song data into the database
//         const result = await pool.query(
//             'INSERT INTO songs (title, album, artist, year, audio_file, image_file) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
//             [title, album, artist, parseInt(year, 10), audio_file, imageBase64]
//         );

//         // Delete the uploaded file from the server
//         fs.unlinkSync(imagePath);

//         res.status(201).json({ id: result.rows[0].id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while uploading the image.' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
