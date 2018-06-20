import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import NumInput from './NumInput';
import DateInput from './DateInput';

const statusOptions = [
  '',
  'New',
  'Open',
  'Assigned',
  'Fixed',
  'Verified',
  'Closed',
];

class IssueEdit extends React.Component {
  constructor(props) {
    super(props);

    const _id = props.match.params.id;

    this.state = {
      issue: {
        _id,
        owner: '',
        status: '',
        created: '',
        effort: null,
        completionDate: null,
        title: '',
      },
    };

    this.loadData = this.loadData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadData();
    }
  }

  loadData() {
    axios.get(`/api/issues/${this.props.match.params.id}`).then(response => {
      const issue = response.data;
      issue.created = new Date(issue.created).toDateString();
      issue.completionDate = issue.completionDate
        ? new Date(issue.completionDate)
        : null;
      issue.effort = !Number.isNaN(issue.effort)
        ? parseInt(issue.effort, 10)
        : null;
      this.setState({ issue });
    });
  }

  handleChange(e, convertedValue) {
    const issue = { ...this.state.issue };
    const value =
      convertedValue !== undefined ? convertedValue : e.target.value;
    issue[e.target.name] = value;
    this.setState({ issue });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios
      .put(`/api/issues/${this.props.match.params.id}`, this.state.issue)
      .then(response => {
        const updatedIssue = response.data;
        updatedIssue.created = new Date(updatedIssue.created).toDateString();
        updatedIssue.completionDate = updatedIssue.completionDate
          ? new Date(updatedIssue.completionDate)
          : null;
        this.setState({ issue: updatedIssue });
        alert('Update issue successfully!');
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Id</label>
          <input
            type="text"
            readOnly
            id="id"
            name="id"
            className="form-control"
            value={this.state.issue._id}
          />
        </div>
        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            id="owner"
            name="owner"
            className="form-control"
            value={this.state.issue.owner}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={this.state.issue.status}
            onChange={this.handleChange}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="created">Create Date</label>
          <input
            type="text"
            id="created"
            name="created"
            className="form-control"
            value={this.state.issue.created}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="created">Effort</label>
          <NumInput
            id="effort"
            name="effort"
            className="form-control"
            value={this.state.issue.effort}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="completionDate">Completion Date</label>
          <DateInput
            id="completionDate"
            name="completionDate"
            className="form-control"
            value={this.state.issue.completionDate}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={this.state.issue.title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>{' '}
        &nbsp;&nbsp;
        <Link to="/issues" className="btn btn-link">
          Back
        </Link>
      </form>
    );
  }
}

IssueEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withRouter(IssueEdit);
