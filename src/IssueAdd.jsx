import React from 'react';

const IssueAdd = ({createIssue}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.addIssue;
    const title = form.title.value;
    const owner = form.owner.value;
    createIssue({title, owner});
    form.title.value = '';
    form.owner.value = '';
  };

  return (
    <form name="addIssue" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="owner">Owner</label>
        <input type="text" id="owner" name="owner" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default IssueAdd;