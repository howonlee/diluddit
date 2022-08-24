import './Subreddit.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { DelayedLink } from './Utils';

function ArticleEntry(props) {
  const params = useParams();
  const ourUrl = `/r/${params.subredditName}/comments/${props.id}`;
  return (
    <div className="Article-member">
      <DelayedLink to={ourUrl}>
        {props.title}
      </DelayedLink>
    </div>
  );
}

function prepRedditParams(searchParams) {
  const res = {
    raw_json: 1,
  };
  if (searchParams.get('after')) {
    res.after = searchParams.get('after');
  }
  return res;
}

function NextButton(props) {
  const params = useParams();
  const after = props?.after;
  const nextUrl = `/r/${params.subredditName}/?after=${after}`;
  return (
    <div className="Article-member">
      <DelayedLink to={nextUrl}>More...</DelayedLink>
    </div>
  );
}

// whole sub listing component, dealing with reddit's pagination too
function Subreddit() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [after, setAfter] = useState('');
  const params = useParams();
  const [searchParams, _] = useSearchParams();

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
