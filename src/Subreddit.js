
import './Subreddit.css';

import { DelayedLink } from "./Utils";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


function ArticleEntry(props) {
  const params = useParams();
  const ourUrl = `/r/${params.subredditName}/comments/${props.id}`;
  return <div className="Article-member">
    <DelayedLink to={ourUrl}>
      {props.title}
    </DelayedLink>
  </div>
}

function prepRedditParams(ourParams) {
  let res = {
    raw_json: 1,
  };
  if (ourParams.after) {
    res["after"] = ourParams.after;
  }
  return res;
}

// whole sub listing component, dealing with reddit's pagination too
function Subreddit() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const params = useParams();

  const url = `https://www.reddit.com/r/${params.subredditName}/new.json`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let redditParams = prepRedditParams(params);
        const {data: newData} = await axios.get(url, redditParams);
        let children = newData?.data?.children;
        let res = children.map((member) => member?.data);
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
    {!loading && error && <div>Error: <span>{error}</span></div>}
    {!loading && !error && (<div>
      {data.map((member) => {
        return <ArticleEntry title={member.title} id={member.id} />})}
      </div>)}
    </div>
  );
}

export default Subreddit;
