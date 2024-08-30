const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Image = require('../models/upload');




// exports.uploadFile = async (req, res) =>{
//     res.send('Uploaded seccessfully');
// }


// Set up multer storage (optional for storing locally)
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {

    console.log("fileeeee", file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
}).single('image');

/*
* API
* Create a new user
*/
exports.uploadFile = (req, res) => {
    console.log("4444444444444444444444444", req, res)
    // upload(req, res, (err) => {
    //     if (err) {
    //         return res.status(400).json({ message: err });
    //     }

    //     if (!req.file) {
    //         return res.status(400).json({ message: 'No file uploaded' });
    //     }

    //     // Convert image to base64 and save to MongoDB
    //     const img = fs.readFileSync(req.file.path);
    //     const encodedImage = img.toString('base64');

    //     const image = new Image({
    //         filename: req.file.filename,
    //         contentType: req.file.mimetype,
    //         imageBase64: encodedImage,
    //     });

    //     image.save()
    //         .then(() => res.json({ message: 'Image uploaded and saved to MongoDB!' }))
    //         .catch(err => res.status(500).json({ error: err.message }));
    // })
};
