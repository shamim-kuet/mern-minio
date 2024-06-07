const Minio = require('minio');

// Initialize the Minio client
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT, // Replace with your Minio server endpoint
  port: parseInt(process.env.MINIO_PORT, 10), // Convert port to an integer
  useSSL: process.env.USE_SSL === 'true', // Convert useSSL to boolean
  accessKey: process.env.MINIO_ACCESS_KEY, // Replace with your Minio access key
  secretKey: process.env.MINIO_SECRET_KEY // Replace with your Minio secret key
});

module.exports = minioClient;
