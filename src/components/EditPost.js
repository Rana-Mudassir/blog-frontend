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
    .then((response) => {
        if([401,500].includes(response?.payload?.status ?? '000')){
            alert(response?.payload?.message)
        }
    });
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

    <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md space-y-4">
    <h2 className="text-2xl font-bold text-center mb-6">Update Post</h2>
    
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      required
      className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <input
      type="text"
      placeholder="Categories (comma separated)"
      value={categories}
      onChange={(e) => setCategories(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <button
      type="submit"
      className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
    >
      Update Post
    </button>
  </form>
  </div>
  );
}

export default EditPost;
