import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, updatePost } from '../redux/postSlice';

function EditPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');

 useEffect(() => {
  if (!post || post._id !== id) {
    dispatch(fetchPostById(id));
  } else {
    setTitle(post.title);
    setContent(post.content);
    setCategories(post.categories.join(','));
  }
}, [dispatch, id, post]);

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(updatePost({ id, updatedPost: { title, content, categories: categories.split(',') } }))
    .then(() => {
      // Navigate back to the post details page after update
      navigate(`/posts/${id}`); // Assuming you want to go back to post details
    });
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Categories (comma separated)"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
      />
      <button type="submit">Update Post</button>
    </form>
  );
}

export default EditPost;
