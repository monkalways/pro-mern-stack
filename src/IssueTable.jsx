import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const IssueRow = ({ issue, deleteIssue }) => (
  <tr>
    <td><Link to={`/issues/${issue._id}`}>{issue._id.substr(-4)}</Link></td>
    <td>{issue.owner}</td>
    <td>{issue.status}</td>
    <td>{issue.created.toDateString()}</td>
    <td>{issue.effort}</td>
    <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
    <td>{issue.title}</td>
    <td><button className="btn btn-link" onClick={() => deleteIssue(issue)} >Delete</button></td>
  </tr>
);

IssueRow.propTypes = {
  issue: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    effort: PropTypes.number,
    completionDate: PropTypes.instanceOf(Date),
    title: PropTypes.string.isRequired,
  }).isRequired,
  deleteIssue: PropTypes.func.isRequired,
};

const IssueTable = ({ issues, deleteIssue }) => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Id</th>
        <th>Owner</th>
        <th>Status</th>
        <th>Create Date</th>
        <th>Effort</th>
        <th>Completion Date</th>
        <th>Title</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {issues.map(issue => <IssueRow key={issue._id} issue={issue} deleteIssue={deleteIssue} />)}
    </tbody>
  </table>
);

IssueTable.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    effort: PropTypes.number,
    completionDate: PropTypes.instanceOf(Date),
    title: PropTypes.string.isRequired,
  })).isRequired,
  deleteIssue: PropTypes.func.isRequired,
};

export default IssueTable;
