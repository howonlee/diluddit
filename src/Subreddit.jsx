import './Subreddit.css';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { DelayedLink } from './Utils';

function ArticleEntry({
  id,
  title,
  author,
  timestamp,
}) {
  const params = useParams();
  const ourUrl = `/r/${params.subredditName}/comments/${id}`;
  const date = new Date(timestamp * 1000);
  return (
    <div className="Article-member">
      <span className="Article-author">{author}</span>
      <span className="Article-date">{date.toISOString()}</span>
      <DelayedLink to={ourUrl}>
        {title}
      </DelayedLink>
    </div>
  );
}

ArticleEntry.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

function prepRedditParams(searchParams) {
  const res = {
    raw_json: 1,
    sort: 'top',
    t: 'day',
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

  const url = `https://www.reddit.com/r/${params.subredditName}/top.json`;

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
        setError(currError);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
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
        <div>{error.code}</div>
        <div>{error.message}</div>
        <div>{error.name}</div>
      </div>
      )}
      {!loading && !error && (
      <div>
        <h2 className="Subreddit-name">{params.subredditName}</h2>
        {data.map((member) => (
          <ArticleEntry
            key={member.id}
            title={member.title}
            id={member.id}
            author={member.author}
            timestamp={member.created_utc}
          />
        ))}
        <NextButton after={after} />
      </div>
      )}
    </div>
  );
}

export default Subreddit;
