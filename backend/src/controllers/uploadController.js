const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Image = require('../models/upload');  // Your Image schema model

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');  // Folder where files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);  // Example: file-1234567890.jpg
    }
});

// Initialize multer to accept any file
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }  // 1MB file size limit
}).any();  // Use .any() to accept any file without field name restrictions

/**
 * API to handle binary file upload
 */
exports.uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Multer error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ message: 'Server error: ' + err.message });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
            // Process the uploaded binary file
            const file = req.files[0];  // Since .any() was used, we need to access the first file
            const img = fs.readFileSync(file.path);
            const encodedImage = img.toString('base64');

            // Create an image document for MongoDB
            const image = new Image({
                filename: file.filename,
                contentType: file.mimetype,
                imageBase64: encodedImage
            });

            // Save the image document to MongoDB
            await image.save();

            // Optionally remove the file from the filesystem
            fs.unlinkSync(file.path);  // Clean up the file from the local filesystem

            res.status(201).json({ message: 'Image uploaded and saved to MongoDB!' });

        } catch (error) {
            res.status(500).json({ message: 'File processing error: ' + error.message });
        }
    });
};
