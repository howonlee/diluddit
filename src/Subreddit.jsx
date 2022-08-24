import './Subreddit.css';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { DelayedLink } from './Utils';

function ArticleEntry({ id, title }) {
  const params = useParams();
  const ourUrl = `/r/${params.subredditName}/comments/${id}`;
  return (
    <div className="Article-member">
      <DelayedLink to={ourUrl}>
        {title}
      </DelayedLink>
    </div>
  );
}

ArticleEntry.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function prepRedditParams(searchParams) {
  const res = {
    raw_json: 1,
  };
  if (searchParams.get('after')) {
    res.after = searchParams.get('after');
  }
  return res;
}

function NextButton({ after }) {
  const params = useParams();
  const nextUrl = `/r/${params.subredditName}/?after=${after}`;
  return (
    <div className="Article-member">
      <DelayedLink to={nextUrl}>More...</DelayedLink>
    </div>
  );
}

NextButton.propTypes = {
  after: PropTypes.string.isRequired,
};

// whole sub listing component, dealing with reddit's pagination too
function Subreddit() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [after, setAfter] = useState('');
  const params = useParams();
  const [searchParams] = useSearchParams();

  const url = `https://www.reddit.com/r/${params.subredditName}/new.json`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const redditParams = prepRedditParams(searchParams);
        const { data: newData } = await axios.get(url, { params: redditParams });
        setAfter(newData?.data?.after);
        const children = newData?.data?.children;
        const res = children.map((member) => member?.data);
        setData(res);
      } catch (currError) {
        setError(currError.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, params]);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && error && (
      <div>
        Error:
        <span>{error}</span>
      </div>
      )}
      {!loading && !error && (
      <div>
        <h2 className="Subreddit-name">{params.subredditName}</h2>
        {data.map((member) => <ArticleEntry title={member.title} id={member.id} />)}
        <NextButton after={after} />
      </div>
      )}
    </div>
  );
}

export default Subreddit;
