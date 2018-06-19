import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

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
        effort: '',
        completionDate: '',
        title: '',
      },
    };

    this.loadData = this.loadData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.match.params.id !== this.props.match.params.id) {
  //     this.loadData();
  //   }
  // }

  loadData() {
    axios.get(`/api/issues/${this.props.match.params.id}`).then(response => {
      const issue = response.data;
      issue.created = new Date(issue.created).toDateString();
      issue.completionDate = issue.completionDate
        ? new Date(issue.completionDate).toDateString()
        : '';
      issue.effort = issue.effort ? issue.effort.toString() : '';
      this.setState({ issue });
    });
  }

  handleChange(e) {
    const issue = { ...this.state.issue };
    issue[e.target.name] = e.target.value;
    this.setState({ issue });
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
          <input
            type="text"
            id="effort"
            name="effort"
            className="form-control"
            value={this.state.issue.effort}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="completionDate">Completion Date</label>
          <input
            type="text"
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
