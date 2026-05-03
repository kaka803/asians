"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Plus } from "lucide-react";

const fontSans =
  "font-[family-name:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]";
const fontDisplay =
  "font-[family-name:var(--font-jersey-25),ui-sans-serif,sans-serif]";

const inputClass =
  "w-full rounded-xl bg-white/5 white-border px-3 py-2.5 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20";

const initialDev = {
  name: "",
  profession: "",
  description: "",
  image: "",
  whatsapp: "",
};

const DevelopersAdmin = () => {
  const [developers, setDevelopers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDev, setNewDev] = useState(initialDev);

  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchDevelopers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/developers");
        const data = await res.json();
        setDevelopers(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.[0]) {
      const base64 = await toBase64(files[0]);
      setNewDev({ ...newDev, image: base64 });
    } else {
      setNewDev({ ...newDev, [name]: value });
    }
  };

  const handleAdd = async () => {
    if (
      !newDev.name ||
      !newDev.profession ||
      !newDev.description ||
      !newDev.image ||
      !newDev.whatsapp
    ) {
      alert("Please fill all fields");
      return;
    }

    setAdding(true);
    try {
      const res = await fetch("/api/developers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDev),
      });

      const data = await res.json();
      setDevelopers([...developers, data]);
      setNewDev(initialDev);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Add error:", err);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await fetch("/api/developers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        setDevelopers(developers.filter((dev) => dev._id !== id));
      } else {
        alert("Failed to delete: " + data.error);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleting(null);
    }
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setNewDev(initialDev);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  return (
    <div
      className={`mx-auto max-w-6xl p-6 ${fontSans} text-[15px] antialiased`}
    >
      <div className="mb-8 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/35 bg-cyan-500/15 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/25"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Add developer
        </button>
      </div>

      {loading ? (
        <p className="text-center text-white/60">Loading developers…</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((dev) => (
            <div
              key={dev._id}
              className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-lg"
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="h-24 w-24 rounded-full border-2 border-white/80 object-cover"
              />
              <h2 className="mt-4 text-xl font-semibold text-white">{dev.name}</h2>
              <p className="text-sm text-white/65">{dev.profession}</p>
              <p className="mt-2 text-center text-sm text-white/50">{dev.description}</p>
              <p className="mt-3 font-mono text-sm text-emerald-300/90">{dev.whatsapp}</p>

              <button
                type="button"
                onClick={() => handleDelete(dev._id)}
                disabled={deleting === dev._id}
                className={`absolute right-3 top-3 rounded-lg px-2 py-1 text-xs text-white transition ${
                  deleting === dev._id
                    ? "cursor-not-allowed bg-red-400/50"
                    : "bg-red-500/90 hover:bg-red-600"
                }`}
              >
                {deleting === dev._id ? "Deleting…" : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={`dashboard-modal-overlay fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#040d1a]/85 backdrop-blur-[12px] ${fontSans}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="developer-form-title"
            onClick={closeModal}
          >
            <div className="flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-6">
              <div
                className="dashboard-modal-panel relative flex w-full max-w-[min(100%,28rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070f18]/98 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_28px_80px_-20px_rgba(0,0,0,0.85),0_0_60px_-25px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/20 backdrop-blur-2xl max-h-[min(90dvh,44rem)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] bg-gradient-to-r from-cyan-500/10 via-transparent to-[#177ba1]/10 px-5 py-4 sm:px-7 sm:py-5">
                  <div className="min-w-0 pr-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/70">
                      Team
                    </p>
                    <h2
                      id="developer-form-title"
                      className={`${fontDisplay} mt-1 text-2xl font-normal capitalize tracking-wide text-white sm:text-3xl`}
                    >
                      New developer
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

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm text-white/65">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newDev.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-white/65">Profession</label>
                      <input
                        type="text"
                        name="profession"
                        value={newDev.profession}
                        onChange={handleChange}
                        placeholder="Profession"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-white/65">Description</label>
                      <textarea
                        name="description"
                        value={newDev.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={3}
                        className={`${inputClass} min-h-[88px] resize-y`}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-white/65">WhatsApp</label>
                      <input
                        type="text"
                        name="whatsapp"
                        value={newDev.whatsapp}
                        onChange={handleChange}
                        placeholder="e.g. 923001234567"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-white/65">Photo</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="mt-1 w-full text-sm text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-3 file:py-2 file:text-sm file:text-cyan-100"
                      />
                      {newDev.image && (
                        <img
                          src={newDev.image}
                          alt="Preview"
                          className="mx-auto mt-3 h-20 w-20 rounded-full border-2 border-white/30 object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/[0.08] bg-[#070f18]/95 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={adding}
                    className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-medium transition hover:bg-white/10 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={adding}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-[#177ba1] px-5 py-2.5 text-sm font-semibold text-[#040d1a] shadow-lg shadow-cyan-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {adding ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                        Adding…
                      </>
                    ) : (
                      "Add developer"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DevelopersAdmin;
