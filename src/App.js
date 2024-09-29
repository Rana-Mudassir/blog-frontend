import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <ToastContainer />
        <main className="flex-grow container mx-auto bg-gray-100 px-4 py-8">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
