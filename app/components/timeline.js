"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react"; // 👈 spinner icon

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState(null); // 👈 kis post ka delete chal raha hai
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    image: null,
  });

  // -------------------- Backend se posts fetch karo --------------------
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setFetching(true);
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (data.success) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.error("❌ Error fetching posts:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchPosts();
  }, []);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // -------------------- Handle Form Change --------------------
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const base64 = await getBase64(files[0]);
      setForm({ ...form, [name]: base64 });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // -------------------- Handle Submit --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) return;

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setPosts([data.post, ...posts]);
        setForm({ title: "", date: "", description: "", image: null });
        setShowForm(false);
      }
    } catch (err) {
      console.error("❌ Error submitting post:", err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Delete (frontend + backend) --------------------
  const deletePost = async (id) => {
    setDeleting(id); // 👈 show indicator for this post
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setPosts(posts.filter((post) => post._id !== id));
      } else {
        console.error("❌ Delete failed:", data.error);
      }
    } catch (err) {
      console.error("❌ Error deleting post:", err);
    } finally {
      setDeleting(null); // 👈 reset after delete
    }
  };

  // -------------------- UI --------------------
  return (
    <div className="max-w-4xl overflow-auto max-h-[80vh] mx-auto p-6 space-y-8">
      {/* Add Post Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full white-border text-white py-2 px-4 rounded-lg transition"
      >
        {showForm ? "Close Form" : "Add Post"}
      </button>

      {/* Post Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-semibold text-white">Create a Post</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white/20 text-white"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white/20 text-white"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-white/20 text-white"
          />
          <div className="space-y-2">
            <label className="block text-white">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {loading ? "Saving..." : "Save Post"}
          </button>
        </form>
      )}

      {/* Timeline */}
      {fetching ? (
        <p className="text-center text-white">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-300">No posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative overflow-hidden rounded-2xl shadow-md bg-white/10 backdrop-blur-md border border-white/20"
            >
              <button
                onClick={() => deletePost(post._id)}
                disabled={deleting === post._id}
                className={`absolute top-2 right-2 p-1 rounded-full ${
                  deleting === post._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "white-border text-white"
                }`}
              >
                {deleting === post._id ? (
                  <Loader2 className="animate-spin text-white" size={16} />
                ) : (
                  <X size={16} />
                )}
              </button>
              <div className="p-4 space-y-3 text-white">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-sm opacity-80">{post.date}</p>
                <p>{post.description}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="uploaded"
                    className="rounded-lg w-full"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
