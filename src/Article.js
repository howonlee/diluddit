import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useParams } from "react-router-dom";

function Post(props) {
}

function Comment(props) {
}

function Comments(props) {
}

function Article() {
  let params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState({});
  const [comments, setComments] = useState({});
  const subname = params.subredditName;
  const id36 = params.id36;
  const redditUrl = `https://www.reddit.com/r/${subname}/comments/${id36}.json`

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {data: newData} = await axios.get(redditUrl);
        const [post, comments] = newData;
        setPost(post);
        setComments(comments);
      } catch (currError) {
        setError(currError.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  ///////////
  ///////////
  ///////////

  return (<div>
    
    <Post />
    <Comments />
    </div>)

  console.log(post);
  console.log(comments);
  return <p>"lol lol" {params.subredditName}</p>;
}

export default Article;
