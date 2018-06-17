const MongoClient = require('mongodb').MongoClient;

const issues = [
  {
    status: 'Open',
    owner: 'Ravan',
    created: new Date('2016-08-15'),
    effort: 5,
    completionDate: undefined,
    title: 'Error in console when clicking Add'
  },
  {
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel'
  }
];

MongoClient.connect('mongodb://localhost').then(client => {
  const db = client.db('issuetracker');
  db.collection('issues').insertMany(issues).then(doc => {
    console.log(JSON.stringify(doc, null, 4));
    client.close();
  });
});