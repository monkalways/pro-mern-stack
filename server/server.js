const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const convertIssue = require('./issues');

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

app.get('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(400).json({ message: `Invalid issue ID format: ${error}` });
  }

  db.collection('issues')
    .find({ _id: issueId })
    .limit(1)
    .next()
    .then(issue => {
      if (!issue) {
        res.status(404).json({ message: `No such issue: ${issueId}` });
      } else {
        res.json(issue);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.put('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(400).json({ message: `Invalid issue ID format: ${error}` });
  }

  const issue = req.body;
  delete issue._id;

  db.collection('issues')
    .update({ _id: issueId }, convertIssue(issue))
    .then(() =>
      db
        .collection('issues')
        .find({ _id: issueId })
        .limit(1)
        .next(),
    )
    .then(savedIssue => {
      res.json(savedIssue);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.delete('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(400).json({ message: `Invalid issue ID format: ${error}` });
  }

  db.collection('issues')
    .deleteOne({ _id: issueId })
    .then(doc => {
      if (doc.deletedCount === 1) {
        res.json({ status: 'OK' });
      } else {
        res.json({ status: 'Object not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
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
