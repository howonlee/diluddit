import './Article.css';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { isImage } from './Utils';
import { useParams } from "react-router-dom";

function LinearizeCommentTree (root) {
  let res = []
  let stack = [root]
  let prevNode = null;
  let currNode = null;
  while (stack.length > 0) {
    prevNode = currNode;
    currNode = stack.pop()
    for (const children in currNode?.children) {
      // add the parent as prevNode...
      // add to the stack
      // add to the res
    }
  }
  return res;
}

// Linearize by executing the parent-quoting linearization and then sorting by time
function LinearizeCommentList(commentList) {
}

function PostImage(props) {
  return <img className="Post-image" alt={""} src={props.url} />;
}

// TODO: Make this less abominably jank, probably by reconstructing the iframe thing instead of just using the literal html of the one reddit gives us
function PostMedia(props) {
  const media = props.media;
  return <div dangerouslySetInnerHTML={{__html: media?.oembed?.html}} />;
}

function PostLink(props) {
  const linkIsImage = isImage(props.postUrl);
  const linkIsSelf = props.domain.startsWith("self");
  const linkIsMedia = props.media;
  
  return (<div>
    {linkIsImage && <PostImage url={props.postUrl} />}
    {linkIsMedia && <PostMedia media={props.media} />}
    {!linkIsImage && !linkIsSelf && !linkIsMedia && <a href={props.postUrl}>Link</a>}
    </div>);
}

function Post(props) {
  let postData = props?.post?.data?.children[0]?.data;
  let postUrl = postData?.url;
  return (<div className="Post">
    <div className="Post-title">{postData?.title}</div>
    <ReactMarkdown className="SelfText">{postData?.selftext}</ReactMarkdown>
    <PostLink postUrl={postUrl} domain={postData?.domain} media={postData?.media} />
    </div>);
}

function CommentParentQuote(props) {
  /////
  /////
  /////
  /////
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
