import './Article.css';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { isImage } from './Utils';
import { useParams } from "react-router-dom";

function PostImage(props) {
  return <img className="Post-image" alt={""} src={props.url} />;
}

function Post(props) {
  let postData = props?.post?.data?.children[0]?.data;
  let postUrl = postData?.url;
  let postLink = '';
  if (isImage(postUrl)) {
    postLink = <PostImage url={postUrl} />;
  } else if (postData?.domain.startsWith("self")) {
    postLink = <div />;
  } else {
    postLink = <a href={postUrl}>{"Link"}</a>;
  }
  return (<div className="Post">
    <div className="Post-title">{postData?.title}</div>
    <ReactMarkdown className="SelfText">{postData?.selftext}</ReactMarkdown>
    <div>{postData?.media}</div>
    <div>{postLink}</div>
    </div>);
}

function Comment(props) {
  let body = props?.member?.body;
  return (<ReactMarkdown className="Comment">{body}</ReactMarkdown>);
}

function Comments(props) {
  let commentData = props?.comments?.data?.children;
  let commentList = commentData?.map((member) => <Comment key={member?.data?.id} member={member?.data} />);
  return <div className="Comment-list">{commentList}</div>;
}

function Article() {
  let params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState({});
  const [comments, setComments] = useState({});
  const subname = params.subredditName;
  const id36 = params.id36;
  const redditUrl = `https://www.reddit.com/r/${subname}/comments/${id36}.json?raw_json=1`

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

  return (<div>
    {loading && <div>Loading...</div>}
    {!loading && error && <div>Error: <span>{error}</span></div>}
    {!loading && !error && (<div>
      <Post post={post}/>
      <Comments comments={comments}/></div>)}
    </div>);
}

export default Article;
