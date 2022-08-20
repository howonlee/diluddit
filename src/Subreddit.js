import React, { useState } from 'react';
import axios from 'axios';
import { Outlet, useParams } from "react-router-dom";


function SubredditParent() {
  return <Outlet />;
}

// whole sub listing component, dealing with reddit's pagination too
function Subreddit() {
  let params = useParams();
  let url = `https://www.reddit.com/r/${params.subredditName}.json`;
  return <p>{url}</p>
}

export { SubredditParent, Subreddit };
