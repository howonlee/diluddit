import { Outlet, useParams } from "react-router-dom";

function SubredditParent() {
  return <Outlet />;
}

// whole sub listing component, dealing with reddit's pagination too
function Subreddit() {
  let params = useParams();
  return <p>"lol lol" {params.subredditName}</p>;
}

export { SubredditParent, Subreddit };
