import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, deletePost } from "../redux/postSlice";
import CommentSection from "./CommentSection";
import { toast } from "react-toastify";

function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id)).then((response) => {
        if ([401, 500].includes(response?.payload?.status ?? "000")) {
          toast.error(
            "Deletion not successful! You might be not author of this post"
          );
        } else {
          toast.success("Deleted successfully!");
          navigate("/");
        }
      });
    }
  };

  const handleUpdate = () => {
    navigate(`/edit-post/${id}`);
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post found</p>;

  return (
    <div className="max-w-4xl min-h-screen mx-auto my-8 p-6 bg-white rounded-lg ">
      {post.image && (
        <img
          src={`https://blog-backend-y38r.onrender.com${post.image}`}
          alt={post.title}
          className="w-full h-auto object-cover mb-6 rounded-lg"
        />
      )}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        {post.content}
      </p>
      <div className="flex flex-col space-y-2 p-4 bg-gray-100 text-sm text-gray-600 rounded-lg mb-6">
        <span>Author: {post.author ? post.author.name : "Unknown"}</span>
        <span>
          Categories:{" "}
          {post.categories ? post.categories.join(", ") : "No categories"}
        </span>
        <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
        <span>Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
          onClick={handleUpdate}
        >
          Update Post
        </button>
        <button
          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
          onClick={handleDelete}
        >
          Delete Post
        </button>
      </div>
      <div className="mt-8">
        <CommentSection postId={post._id} />
      </div>
    </div>
  );
}

export default PostDetails;
