const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL; // Correct interpolation
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(); // Return the database object for further use
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    throw err;
  }
}

module.exports = connect;