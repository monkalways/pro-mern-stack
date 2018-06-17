import React from 'react';
import axios from 'axios';

import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };

    this.loadData = this.loadData.bind(this);
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios.get('/api/issues').then((response) => {
      const issues = response.data;
      issues.forEach((issue) => {
        issue.created = new Date(issue.created); // eslint-disable-line no-param-reassign
        if (issue.completionDate) {
          issue.completionDate = // eslint-disable-line no-param-reassign
            new Date(issue.completionDate);
        }
      });
      this.setState({ issues });
    });
  }

  createIssue(newIssue) {
    axios.post('/api/issues', newIssue).then((response) => {
      const issue = response.data;
      issue.created = new Date(issue.created);
      if (issue.completionDate) {
        issue.completionDate = new Date(issue.completionDate);
      }
      this.setState({ issues: this.state.issues.concat(issue) });
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Issue Tracker</h1>
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

export default IssueList;
