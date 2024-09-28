// components/CommentSection.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment, deleteComment, updateComment } from '../redux/commentSlice';

function CommentSection({ postId }) {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleAddComment = () => {
    dispatch(addComment({ postId, content: newComment }));
    setNewComment('');
  };

  const handleEditComment = (comment) => {
    setEditCommentId(comment._id);
    setEditCommentContent(comment.content);
  };

  const handleUpdateComment = () => {
    dispatch(updateComment({ id: editCommentId, content: editCommentContent }));
    setEditCommentId(null);
    setEditCommentContent('');
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." />
        <button onClick={handleAddComment}>Submit</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <button onClick={() => handleEditComment(comment)}>Edit</button>
            <button onClick={() => dispatch(deleteComment(comment._id))}>Delete</button>
          </li>
        ))}
      </ul>
      {editCommentId && (
        <div>
          <textarea value={editCommentContent} onChange={(e) => setEditCommentContent(e.target.value)} />
          <button onClick={handleUpdateComment}>Update</button>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
