import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/postSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      categories,
      image,
    };

    dispatch(createPost(postData)).then(() => {
      toast.success("Post Added successful!");
      navigate("/");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Post</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
          required
          rows="5"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="Categories (comma-separated)"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-auto object-cover rounded-md border border-gray-300"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white rounded-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
