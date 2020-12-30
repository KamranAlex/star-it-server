const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;
// const ObjectID = require('mongodb').ObjectID;

app.get('/', (req, res) => {
  res.send('Welcome! Star Library');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lkrgo.mongodb.net/starLibrary?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const bookCollection = client.db('starLibrary').collection('books');
  const studentCollection = client.db('starLibrary').collection('students');
  const librarianCollection = client.db('starLibrary').collection('librarian');

  //Add new Book
  app.post('/addBook', (req, res) => {
    const newBook = req.body;
    bookCollection.insertOne(newBook).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  //Get All Books
  app.get('/getBooks', (req, res) => {
    bookCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //Add new Book
  app.post('/addStudent', (req, res) => {
    const newStudent = req.body;
    studentCollection.insertOne(newStudent).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  //Add new Librarian
  app.post('/addLibrarian', (req, res) => {
    const newLibrarian = req.body;
    librarianCollection.insertOne(newLibrarian).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
});

app.listen(process.env.PORT || port, () => {
  console.log('Server is Running Perfectly');
});
