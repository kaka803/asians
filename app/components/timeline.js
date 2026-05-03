"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Plus } from "lucide-react";

const fontSans =
  "font-[family-name:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]";
const fontDisplay =
  "font-[family-name:var(--font-jersey-25),ui-sans-serif,sans-serif]";

const inputClass =
  "w-full rounded-xl bg-white/5 white-border px-3 py-2.5 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20";

const initialForm = { title: "", date: "", description: "", image: null };

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(initialForm);

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
        console.error("Error fetching posts:", err);
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

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files?.[0]) {
      const base64 = await getBase64(files[0]);
      setForm({ ...form, [name]: base64 });
    } else if (!files) {
      setForm({ ...form, [name]: value });
    }
  };

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
        setForm(initialForm);
        setShowForm(false);
      }
    } catch (err) {
      console.error("Error submitting post:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setPosts(posts.filter((post) => post._id !== id));
      } else {
        console.error("Delete failed:", data.error);
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    } finally {
      setDeleting(null);
    }
  };

  const closeModal = useCallback(() => {
    setShowForm(false);
    setForm(initialForm);
  }, []);

  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm, closeModal]);

  useEffect(() => {
    if (!showForm) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showForm]);

  return (
    <div
      className={`mx-auto max-h-[80vh] max-w-4xl space-y-8 overflow-auto p-6 ${fontSans} text-[15px] antialiased`}
    >
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/35 bg-cyan-500/15 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/25 sm:w-auto sm:px-5"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        Add post
      </button>

      {showForm &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={`dashboard-modal-overlay fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#040d1a]/85 backdrop-blur-[12px] ${fontSans}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="timeline-form-title"
            onClick={closeModal}
          >
            <div className="flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-6">
              <div
                className="dashboard-modal-panel relative flex w-full max-w-[min(100%,28rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070f18]/98 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_28px_80px_-20px_rgba(0,0,0,0.85),0_0_60px_-25px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/20 backdrop-blur-2xl max-h-[min(90dvh,40rem)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] bg-gradient-to-r from-cyan-500/10 via-transparent to-[#177ba1]/10 px-5 py-4 sm:px-7 sm:py-5">
                  <div className="min-w-0 pr-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/70">
                      Timeline
                    </p>
                    <h2
                      id="timeline-form-title"
                      className={`${fontDisplay} mt-1 text-2xl font-normal capitalize tracking-wide text-white sm:text-3xl`}
                    >
                      New post
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 transition hover:border-cyan-400/40 hover:bg-cyan-500/15 hover:text-white"
                    aria-label="Close dialog"
                  >
                    <X className="h-5 w-5" strokeWidth={2} />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex min-h-0 flex-1 flex-col overflow-hidden"
                >
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm text-white/65">Title</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          value={form.title}
                          onChange={handleChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-white/65">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-white/65">Description</label>
                        <textarea
                          name="description"
                          placeholder="Description"
                          value={form.description}
                          onChange={handleChange}
                          rows={4}
                          className={`${inputClass} min-h-[100px] resize-y`}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-white/65">Image</label>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleChange}
                          className="mt-1 w-full text-sm text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-3 file:py-2 file:text-sm file:text-cyan-100"
                        />
                        {form.image && (
                          <img
                            src={form.image}
                            alt="Preview"
                            className="mt-3 max-h-40 w-full rounded-xl object-cover ring-1 ring-white/10"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/[0.08] bg-[#070f18]/95 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={loading}
                      className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-medium transition hover:bg-white/10 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-[#177ba1] px-5 py-2.5 text-sm font-semibold text-[#040d1a] shadow-lg shadow-cyan-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                          Saving…
                        </>
                      ) : (
                        "Save post"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}

      {fetching ? (
        <p className="text-center text-white/60">Loading posts…</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-white/50">No posts yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-md backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => deletePost(post._id)}
                disabled={deleting === post._id}
                className={`absolute right-2 top-2 rounded-full p-1.5 transition ${
                  deleting === post._id
                    ? "cursor-not-allowed bg-white/20 text-white/50"
                    : "white-border text-white hover:bg-white/10"
                }`}
                aria-label="Delete post"
              >
                {deleting === post._id ? (
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                ) : (
                  <X className="h-4 w-4" strokeWidth={2} />
                )}
              </button>
              <div className="space-y-3 p-4 text-white">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-sm text-white/70">{post.date}</p>
                <p className="text-white/85">{post.description}</p>
                {post.image && (
                  <img src={post.image} alt="" className="w-full rounded-lg" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
