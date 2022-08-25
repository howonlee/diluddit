// Directory of Subreddits.
// There is no mixing of reddits.
// The overall goal is to pretend it's 1999 and you're on a damn forum.
//
// TODO: un-hardcode listing.
// Maybe also don't shove like 70% of my sub preferences onto open internet

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Directory.css';
import { DelayedLink } from './Utils';

function DirectoryMember({ member }) {
  const url = `/r/${member}`;
  return (
    <DelayedLink to={url}>
      r/
      {member}
    </DelayedLink>
  );
}

DirectoryMember.propTypes = {
  member: PropTypes.string.isRequired,
};

function ListingAddForm({ dirData, setDirData }) {
  const [name, setName] = useState('');
  return (
    <form
      className="Listing-add-form"
      onSubmit={(e) => {
        dirData.listing.push(e.target[0].value);
        setDirData(dirData);
        window.localStorage.setItem('dirData', JSON.stringify(dirData));
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add sub name"
        aria-label="subname"
      />
      <input
        type="submit"
        value="Submit"
      />
    </form>
  );
}

ListingAddForm.propTypes = {
  dirData: PropTypes.object.isRequired,
  setDirData: PropTypes.func.isRequired,
};

function Directory() {
  const [dirData, setDirData] = useState(() => {
    const saved = window.localStorage.getItem('dirData');
    const init = JSON.parse(saved);
    return init || { listing: [] };
  });
  const listingDiv = dirData.listing.map(
    (member) => (
      <div key={member} className="Directory-member">
        {' '}
        <DirectoryMember member={member} />
      </div>
    ),
  );
  return (
    <div className="Directory">
      <ListingAddForm dirData={dirData} setDirData={setDirData} />
      {listingDiv}
    </div>
  );
}

export default Directory;
