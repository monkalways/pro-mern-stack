import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import queryString from 'query-string';

import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };

    this.loadData = this.loadData.bind(this);
    this.createIssue = this.createIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = queryString.parse(prevProps.location.search);
    const newQuery = queryString.parse(this.props.location.search);
    if (
      oldQuery.status === newQuery.status &&
      oldQuery.effortGte === newQuery.effortGte &&
      oldQuery.effortLte === newQuery.effortLte
    ) {
      return;
    }
    this.loadData();
  }

  getInitFilter() {
    const parsed = queryString.parse(this.props.location.search);
    return parsed;
  }

  loadData() {
    axios.get(`/api/issues${this.props.location.search}`).then(response => {
      const issues = response.data;
      issues.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) {
          issue.completionDate = new Date(issue.completionDate);
        }
      });
      this.setState({ issues });
    });
  }

  createIssue(newIssue) {
    axios.post('/api/issues', newIssue).then(response => {
      const issue = response.data;
      issue.created = new Date(issue.created);
      if (issue.completionDate) {
        issue.completionDate = new Date(issue.completionDate);
      }
      this.setState({ issues: this.state.issues.concat(issue) });
    });
  }

  deleteIssue(issue) {
    axios.delete(`/api/issues/${issue._id}`).then(response => {
      const { status } = response.data;
      if (status === 'OK') {
        this.loadData();
      } else {
        alert('Issue deletion failed');
      }
    });
  }

  render() {
    return (
      <div>
        <IssueFilter initFilter={this.getInitFilter()} />
        <hr />
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

IssueList.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default IssueList;
