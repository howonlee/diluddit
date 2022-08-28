import './Article.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { isImage } from './Utils';

function LinearizeCommentTree(roots) {
  /* eslint-disable no-loop-func */
  // They're always true trees, so no need for even a toposort, this is a parent-keeping search
  const res = [...roots];
  const stack = [...roots];
  let currNode = null;
  // Cardinality of what you actually get from the reddit API is like, hundreds tops, looks like
  // More gets loaded from a separate endpoint
  // So, no popping stack fears
  while (stack.length > 0) {
    currNode = stack.pop();

    // reply case
    const replyChildren = currNode?.data?.replies?.data?.children;
    if (replyChildren) {
      replyChildren.forEach((child) => {
        const parentedChild = { ...child };
        parentedChild.currParent = currNode;
        stack.push(parentedChild);
        res.push(parentedChild);
      });
    }
  }
  return res;
  /* eslint-enable no-loop-func */
}

function maybeTruncateParent(parentBody, len = 250) {
  if (parentBody.length > len) {
    return `${parentBody.substring(0, len)}...`;
  }
  return parentBody;
}

function PostImage({ url }) {
  return <img className="Post-image" alt="" src={url} />;
}

PostImage.propTypes = {
  url: PropTypes.string.isRequired,
};

// TODO: Make this less abominably jank,
// probably by reconstructing the iframe thing
// instead of just using the literal html of the one reddit gives us
function PostMedia({ media }) {
  return <div dangerouslySetInnerHTML={{ __html: media?.oembed?.html }} />;
}

PostMedia.propTypes = {
  media: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

function PostLink({ postUrl, domain, media }) {
  const linkIsImage = isImage(postUrl);
  const linkIsSelf = domain.startsWith('self');
  const linkIsMedia = media;

  return (
    <div>
      {linkIsImage && <PostImage url={postUrl} />}
      {linkIsMedia && <PostMedia media={media} />}
      {!linkIsImage && !linkIsSelf && !linkIsMedia && <a href={postUrl}>Link</a>}
    </div>
  );
}

PostLink.propTypes = {
  postUrl: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  media: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

PostLink.defaultProps = {
  media: '',
};

function Post({ post }) {
  const postData = post?.data?.children[0]?.data;
  const postUrl = postData?.url;
  return (
    <div className="Post">
      <div className="Post-title">{postData?.title}</div>
      <div className="Post-author">{postData?.author}</div>
      <ReactMarkdown className="SelfText">{postData?.selftext}</ReactMarkdown>
      <PostLink postUrl={postUrl} domain={postData?.domain} media={postData?.media} />
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

function Comment({ member, currParent }) {
  const body = member?.body;
  const date = new Date(member.created_utc * 1000);
  return (
    <div className="Comment">
      <span className="Comment-author">{member.author}</span>
      <span className="Comment-date">{date.toISOString()}</span>
      {currParent && (
        <ReactMarkdown className="CommentParentQuote">
          {maybeTruncateParent(currParent?.data?.body)}
        </ReactMarkdown>
      )}
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
}

Comment.propTypes = {
  member: PropTypes.object.isRequired,
  currParent: PropTypes.object.isRequired,
};

function Comments({ comments }) {
  const commentList = comments?.map(
    (member) => (
      <Comment
        key={member?.data?.id}
        member={member?.data}
        currParent={member?.currParent}
      />
    ),
  );
  return <div className="Comment-list">{commentList}</div>;
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

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
        const [newPost, newComments] = newData;
        setPost(newPost);
        const linearizedComments = LinearizeCommentTree(newComments?.data?.children)
          .sort((fst, snd) => (fst.data.created_utc - snd.data.created_utc) || 0);
        const filteredComments = linearizedComments.filter((member) => {
          const res0 = typeof member === 'object';
          const res1 = res0 && !Array.isArray(member);
          const res2 = res1 && member !== null;
          const res3 = res2 && typeof member?.data?.body === 'string';
          return res3;
        });
        setComments(filteredComments);
      } catch (currError) {
        setError(currError);
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
        <div>{error.code}</div>
        <div>{error.message}</div>
        <div>{error.name}</div>
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
