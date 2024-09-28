// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPostById } from '../redux/postSlice';
// import CommentSection from './CommentSection';

// function PostDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { post, loading, error } = useSelector((state) => state.posts); // access the correct post state

//   useEffect(() => {
//     dispatch(fetchPostById(id));
//   }, [dispatch, id]);

//   if (loading) return <p>Loading post...</p>;
//   if (error) return <p>{error}</p>;
//   if (!post) return <p>No post found</p>; // handle case when post is not found

//   return (
//     <div>
//       <h2>{post.title}</h2>
//       <p>{post.content}</p>
//       <p>Categories: {post.categories ? post.categories.join(', ') : 'No categories'}</p>
//       <CommentSection postId={post._id} />
//     </div>
//   );
// }

// export default PostDetails;

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, deletePost } from '../redux/postSlice';
import CommentSection from './CommentSection';

function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
      navigate('/'); // Redirect after deletion
    }
  };

  const handleUpdate = () => {
    // Implement update logic or navigate to update form
    navigate(`/edit-post/${id}`); // Assuming you have a route for editing a post
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      {post.image && <img src={`http://localhost:5000${post.image}`} alt={post.title} />}
      <p>{post.content}</p>
      <p>Author: {post.author ? post.author.name : 'Unknown'}</p>
      <p>Categories: {post.categories ? post.categories.join(', ') : 'No categories'}</p>
      <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(post.updatedAt).toLocaleString()}</p>
      
      <button onClick={handleUpdate}>Update Post</button>
      <button onClick={handleDelete}>Delete Post</button>

      <CommentSection postId={post._id} />
    </div>
  );
}

export default PostDetails;

