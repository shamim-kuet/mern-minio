const express = require('express');
const cors = require('cors');
const multer = require('multer');
const minioClient = require('./minioClient'); // Import Minio client
const fs = require('fs');
const connectToMongoDB = require('./mongoClient'); // Import MongoDB client

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  console.log(req.body); // Contains any form fields sent along with the file
  console.log(req.file); // Contains information about the uploaded file

  const filePath = req.file.path;
  const fileName = req.file.filename;
  
  try {
    // Upload file to Minio
    await minioClient.fPutObject('test56', fileName, filePath);
    console.log('File uploaded successfully to Minio');

    // Remove the file from local storage after upload
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting local file:', err);
      }
    });

    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Insert file metadata into MongoDB
    const collection = db.collection('uploads');
    await collection.insertOne({
      originalName: req.file.originalname,
      fileName: fileName,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadDate: new Date()
    });

    res.status(200).send('File uploaded and metadata saved to MongoDB successfully');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error uploading file and saving metadata');
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


