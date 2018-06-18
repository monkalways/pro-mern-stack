import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const IssueFilter = ({ history }) => {
  const Separator = () => <span> | </span>;
  const setAssignedFilter = () => {
    history.push('/issues?status=Assigned');
  };
  return (
    <div>
      <Link className="btn btn-link" to="/issues">
        All Issues
      </Link>
      <Separator />
      <Link className="btn btn-link" to="/issues?status=New">
        New Issues
      </Link>
      <Separator />
      <button className="btn btn-link" onClick={setAssignedFilter}>
        Assigned Issues
      </button>
    </div>
  );
};

IssueFilter.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(IssueFilter);
