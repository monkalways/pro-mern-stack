import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const IssueEdit = ({ match }) => (
  <div>
    <p>Placeholder for IssueEdit {match.params.id}</p>
    <Link to="/issues">Back to issue list</Link>
  </div>
);

IssueEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default IssueEdit;
