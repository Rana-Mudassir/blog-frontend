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
  <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
  {/* Comments Header */}
  <h3 className="text-xl font-semibold mb-4 text-gray-800">Comments</h3>
  
  {/* Add New Comment */}
  <div className="flex flex-col space-y-2 mb-6">
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Add a comment..."
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={handleAddComment}
      className="self-end px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      Submit
    </button>
  </div>

  {/* Display Comments */}
  <ul className="space-y-4">
    {comments.map((comment) => (
      <li key={comment._id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-700 mb-2">{comment.content}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleEditComment(comment)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteComment(comment._id))}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>

  {/* Edit Comment Section */}
  {editCommentId && (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <textarea
        value={editCommentContent}
        onChange={(e) => setEditCommentContent(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleUpdateComment}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Update
      </button>
    </div>
  )}
</div>

  );
}

export default CommentSection;
