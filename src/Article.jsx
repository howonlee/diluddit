import './Article.css';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { isImage } from './Utils';

function LinearizeCommentTree(root) {
  // They're always true trees, so no need for even a toposort, this is a parent-keeping search
  const res = [];
  const stack = [root];
  let prevNode = null;
  let currNode = null;
  // Cardinality of what you actually get from the reddit API is like, hundreds tops, looks like
  // More gets loaded from a separate endpoint
  // So, no popping stack fears
  while (stack.length > 0) {
    prevNode = currNode;
    currNode = stack.pop();
    // toplevel case
    if (currNode?.data?.children) {
      for (const child of currNode?.data?.children) {
        stack.push(child);
        res.push(child);
      }
    }

    // reply case
    const replyChildren = currNode?.data?.replies?.data?.children;
    if (replyChildren) {
      for (const child of replyChildren) {
        const parentedChild = child;
        parentedChild.currParent = prevNode;
        stack.push(parentedChild);
        res.push(parentedChild);
      }
    }
  }
  return res;
}

function PostImage(props) {
  return <img className="Post-image" alt="" src={props.url} />;
}

// TODO: Make this less abominably jank, probably by reconstructing the iframe thing instead of just using the literal html of the one reddit gives us
function PostMedia(props) {
  const { media } = props;
  return <div dangerouslySetInnerHTML={{ __html: media?.oembed?.html }} />;
}

function PostLink(props) {
  const linkIsImage = isImage(props.postUrl);
  const linkIsSelf = props.domain.startsWith('self');
  const linkIsMedia = props.media;

  return (
    <div>
      {linkIsImage && <PostImage url={props.postUrl} />}
      {linkIsMedia && <PostMedia media={props.media} />}
      {!linkIsImage && !linkIsSelf && !linkIsMedia && <a href={props.postUrl}>Link</a>}
    </div>
  );
}

function Post(props) {
  const postData = props?.post?.data?.children[0]?.data;
  const postUrl = postData?.url;
  return (
    <div className="Post">
      <div className="Post-title">{postData?.title}</div>
      <ReactMarkdown className="SelfText">{postData?.selftext}</ReactMarkdown>
      <PostLink postUrl={postUrl} domain={postData?.domain} media={postData?.media} />
    </div>
  );
}

function Comment(props) {
  const body = props?.member?.body;
  const currParent = props?.currParent;
  return (
    <div className="Comment">
      {currParent && <ReactMarkdown className="CommentParentQuote">{currParent?.data?.body}</ReactMarkdown>}
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
}

function Comments(props) {
  const commentData = props?.comments;
  const commentList = commentData?.map((member) => <Comment key={member?.data?.id} member={member?.data} currParent={member?.currParent} />);
  return <div className="Comment-list">{commentList}</div>;
}

function Article() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
  const [comments, setComments] = useState({});
  const subname = params.subredditName;
  const { id36 } = params;
  const redditUrl = `https://www.reddit.com/r/${subname}/comments/${id36}.json?raw_json=1`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: newData } = await axios.get(redditUrl);
        const [post, comments] = newData;
        setPost(post);
        const linearizedComments = LinearizeCommentTree(comments).sort((fst, snd) => fst?.data?.created_utc < snd?.data?.created_utc);
        setComments(linearizedComments);
      } catch (currError) {
        setError(currError.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <Post post={post} />
        <Comments comments={comments} />
      </div>
      )}
    </div>
  );
}

export default Article;
