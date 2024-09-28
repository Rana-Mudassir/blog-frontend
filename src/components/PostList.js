import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postSlice';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
function PostList() {
  const dispatch = useDispatch();
  const { posts ,loading, error } = useSelector((state) => state.posts);

  const navigate = useNavigate();
  const location = useLocation();

  
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get('page')) || 1;

  const {  totalPages } = useSelector((state) => ({
    totalPages: state?.posts?.totalPages ?? 10,
  }));

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [dispatch, currentPage]);

  const onPageChange = (page) => {
    navigate(`?page=${page}`); 
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <Link to={`/posts/${post._id}`}>
              <img
                src={`http://localhost:5000${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && 
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 border rounded-md transition ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      }
    </div>
  );
}

export default PostList;
