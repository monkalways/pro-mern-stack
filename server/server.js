const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

let db;
MongoClient.connect('mongodb://localhost').then(client => {
  db = client.db('issuetracker');
});

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/api/issues', (req, res) => {
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.effortLte || req.query.effortGte) filter.effort = {};
  if (req.query.effortLte) {
    filter.effort.$lte = parseInt(req.query.effortLte, 10);
  }
  if (req.query.effortGte) {
    filter.effort.$gte = parseInt(req.query.effortGte, 10);
  }
  db.collection('issues')
    .find(filter)
    .toArray()
    .then(issues => {
      res.json(issues);
    });
});

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.status = 'New';
  newIssue.created = new Date();
  db.collection('issues')
    .insertOne(newIssue)
    .then(doc => {
      db.collection('issues')
        .findOne({ _id: doc.insertedId })
        .then(issue => {
          res.json(issue);
        });
    });
});

app.listen(3000, () => {
  console.log('App started port 3000');
});
