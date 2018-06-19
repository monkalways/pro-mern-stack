import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class IssueFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.initFilter.status || '',
      effortGte: props.initFilter.effortGte || '',
      effortLte: props.initFilter.effortLte || '',
      changed: false,
    };

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.initFilter.status || '',
      effortGte: newProps.initFilter.effortGte || '',
      effortLte: newProps.initFilter.effortLte || '',
      changed: false,
    });
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  onChangeEffortGte(e) {
    const effortGteString = e.target.value;
    if (effortGteString.match(/^\d*$/)) {
      this.setState({ effortGte: effortGteString, changed: true });
    }
  }

  onChangeEffortLte(e) {
    const effortLteString = e.target.value;
    if (effortLteString.match(/^\d*$/)) {
      this.setState({ effortLte: effortLteString, changed: true });
    }
  }

  applyFilter(e) {
    e.preventDefault();

    const newFilter = {};
    if (this.state.status) {
      newFilter.status = this.state.status;
    }
    if (this.state.effortGte) {
      newFilter.effortGte = this.state.effortGte;
    }
    if (this.state.effortLte) {
      newFilter.effortLte = this.state.effortLte;
    }
    this.props.history.push(`/issues?${queryString.stringify(newFilter)}`);
  }

  clearFilter() {
    this.props.history.push('/issues');
  }

  resetFilter() {
    this.setState({
      status: this.props.initFilter.status || '',
      effortGte: this.props.initFilter.effortGte || '',
      effortLte: this.props.initFilter.effortLte || '',
      changed: false,
    });
  }

  render() {
    return (
      <form onSubmit={this.applyFilter}>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={this.state.status}
            onChange={this.onChangeStatus}
            className="form-control"
          >
            <option value="">(Any)</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="effort_gte">Effort Between</label>
          <input
            type="number"
            id="effort_gte"
            className="form-control"
            value={this.state.effortGte}
            onChange={this.onChangeEffortGte}
          />
        </div>
        <div className="form-group">
          <label htmlFor="effort_lte">And</label>
          <input
            type="number"
            id="effort_lte"
            className="form-control"
            value={this.state.effortLte}
            onChange={this.onChangeEffortLte}
          />
        </div>
        <div className="btn-toolbar mb-3">
          <div className="btn-group mr-2">
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </div>

          <div className="btn-group mr-2">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={!this.state.changed}
              onClick={this.resetFilter}
            >
              Reset
            </button>
          </div>
          <div className="btn-group mr-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.clearFilter}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    );
  }
}

IssueFilter.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  initFilter: PropTypes.shape({
    status: PropTypes.string,
    effortGte: PropTypes.string,
    effortLte: PropTypes.string,
  }).isRequired,
};

export default withRouter(IssueFilter);
