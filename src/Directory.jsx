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

function DirectoryMember({ member, dirData, setDirData }) {
  /// take setDirData and mutate here..?
  const url = `/r/${member}`;

  const deleteButton = function () {
    const { listing } = dirData;
    const idx = listing.indexOf(member);
    listing.splice(idx, 1);
    const newDirData = { listing };
    setDirData(newDirData);
    window.localStorage.setItem('dirData', JSON.stringify(newDirData));
  };
  return (
    <div className="Directory-member">
      <DelayedLink to={url}>
        r/
        {member}
      </DelayedLink>
      <button type="button" onClick={deleteButton}>X</button>
    </div>
  );
}

DirectoryMember.propTypes = {
  member: PropTypes.string.isRequired,
  dirData: PropTypes.object.isRequired,
  setDirData: PropTypes.func.isRequired,
};

function ListingAddForm({ dirData, setDirData }) {
  const [name, setName] = useState('');
  return (
    <form
      className="Listing-add-form"
      onSubmit={(e) => {
        dirData.listing.push(e.target[0].value.toLowerCase());
        setDirData(dirData);
        window.localStorage.setItem('dirData', JSON.stringify(dirData));
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Subreddit name"
        aria-label="subname"
      />
      <input
        type="submit"
        value="Add"
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
  const dedupListing = new Set(dirData.listing);
  const listingDiv = [...dedupListing].sort().map(
    (member) => (
      <div key={member}>
        {' '}
        <DirectoryMember member={member} dirData={dirData} setDirData={setDirData} />
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
