import { Outlet, useParams } from "react-router-dom";

function Article() {
  let params = useParams();
  return <p>"lol lol" {params.subredditName}</p>;
  return <p>"lol lol" {params.id36}</p>;
}

export default Article;
