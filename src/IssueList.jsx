import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';

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

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.search;
    const newQuery = this.props.location.search;
    if (oldQuery === newQuery) {
      return;
    }
    this.loadData();
  }

  loadData() {
    axios.get(`/api/issues${this.props.location.search}`).then((response) => {
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
      <div>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
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
