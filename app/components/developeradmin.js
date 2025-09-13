"use client";
import React, { useEffect, useState } from "react";

const DevelopersAdmin = () => {
  const [developers, setDevelopers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDev, setNewDev] = useState({
    name: "",
    profession: "",
    description: "",
    image: "",
    whatsapp: "",
  });

  const [loading, setLoading] = useState(false); // global loading for fetch
  const [adding, setAdding] = useState(false); // add button loading
  const [deleting, setDeleting] = useState(null); // delete loading (id-based)

  // Fetch developers from backend
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

  // Convert image to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const base64 = await toBase64(files[0]);
      setNewDev({ ...newDev, image: base64 });
    } else {
      setNewDev({ ...newDev, [name]: value });
    }
  };

  // Add Developer (API call)
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
      setNewDev({ name: "", profession: "", description: "", image: "", whatsapp: "" });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Add error:", err);
    } finally {
      setAdding(false);
    }
  };

  // Delete Developer (API call)
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 white-border text-white rounded-lg  transition"
        >
          + Add Developer
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-300">Loading developers...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev) => (
            <div
              key={dev._id}
              className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg p-6 flex flex-col items-center relative"
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-white/80"
              />
              <h2 className="mt-4 text-xl font-semibold text-white">{dev.name}</h2>
              <p className="text-gray-300 text-sm">{dev.profession}</p>
              <p className="mt-2 text-gray-400 text-center text-sm">{dev.description}</p>
              <p className="mt-3 text-green-400 text-sm font-mono">📱 {dev.whatsapp}</p>

              <button
                onClick={() => handleDelete(dev._id)}
                disabled={deleting === dev._id}
                className={`absolute top-3 right-3 px-2 py-1 text-white text-xs rounded ${
                  deleting === dev._id
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {deleting === dev._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl w-full max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Add Developer</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newDev.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
              />
              <input
                type="text"
                name="profession"
                value={newDev.profession}
                onChange={handleChange}
                placeholder="Profession"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
              />
              <textarea
                name="description"
                value={newDev.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
              />
              <input
                type="text"
                name="whatsapp"
                value={newDev.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp Number (e.g. 920123456789)"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-white"
              />

              {newDev.image && (
                <img
                  src={newDev.image}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white/50 mt-2"
                />
              )}

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={adding}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  disabled={adding}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {adding ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevelopersAdmin;
