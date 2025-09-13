"use client"

import React, { useEffect, useState, useRef } from "react";
import MessagesSection from "../components/messagesection";
import { useRouter } from "next/navigation";
import Timeline from "../components/timeline";
import DevelopersAdmin from "../components/developeradmin";



function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function useLocalState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {}
  }, [key, state]);

  return [state, setState];
}

export default function Dashboard() {
  const [route, setRoute] = useState("projects");
  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [addloading, setaddloading] = useState(false)


   const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth !== "true") {
      router.push("/login"); // agar login nahi to redirect
    }
  }, [router]);

  const initialProject = {
    _id: null,
    name: "",
    description: "",
    thumbnail: null,
    sections: [],
    createdAt: null,
  };

  const [form, setForm] = useState(initialProject);

  useEffect(() => {
    if (editingProject) {
      setForm(editingProject);
      setShowForm(true);
    }
  }, [editingProject]);

  // FETCH projects from backend
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/getprojects"); // backend endpoint
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data.projects);
      } catch (err) {
        console.error(err);
        alert("Error fetching projects");
      }
    }
    fetchProjects();
  }, []);

  function openAddProject() {
    setEditingProject(null);
    setForm(initialProject);
    setShowForm(true);
  }

  function onThumbnailChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setForm((s) => ({ ...s, thumbnail: reader.result }));
    reader.readAsDataURL(f);
  }

  function addSection() {
    setForm((s) => ({
      ...s,
      sections: [...s.sections, { id: uid(), title: "", description: "", image: null }],
    }));
  }

  function onSectionImageChange(e, sid) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((s) => ({
        ...s,
        sections: s.sections.map((sec) =>
          sec.id === sid ? { ...sec, image: reader.result } : sec
        ),
      }));
    reader.readAsDataURL(f);
  }

  function removeSection(sid) {
    setForm((s) => ({ ...s, sections: s.sections.filter((x) => x.id !== sid) }));
  }

  function editProject(id) {
    const p = projects.find((x) => x._id === id);
    if (p) setEditingProject(p);
  }




async function deleteProject(id) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/deleteproject/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProjects((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting project");
    }
  }

  

  // When adding a project, also log a system message into messages so backend can read later if needed
  useEffect(() => {
    console.log(projects);
    
  }, [projects]);




async function saveProject() {
    if (!form.name.trim()) return alert("Project name is required");

    setaddloading(true)

    const projectData = {
      name: form.name,
      description: form.description,
      thumbnail: form.thumbnail,
      sections: form.sections,
      createdAt: form.createdAt || new Date().toISOString(),
    };

    try {
      let res;
      if (form._id) {
        // EDIT existing project
        res = await fetch(`/api/editproject/${form._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
      } else {
        // ADD new project
        res = await fetch("/api/addproject", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
      }

      if (!res.ok) throw new Error("Failed to save project");
      const data = await res.json();

      if (form._id) {
        setProjects((p) => p.map((x) => (x._id === form._id ? data.project : x)));
      } else {
        setProjects((p) => [data.project, ...p]);
      }
      setaddloading(false)
      setShowForm(false);
      setForm(initialProject);
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Error saving project");
    }
  }

function handleLogout() {
    // Jo bhi token/email save kiya tha login ke time wo clear karo
    localStorage.removeItem("auth");
    localStorage.removeItem("token");

    // Redirect to login page
    router.push("/login");
  }


  return (
    <div className="min-h-screen mt-5 text-gray-100 font-sans">
  <div className="max-w-7xl mx-auto p-6">
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="h-full md:w-72 bg-white/10 white-border backdrop-blur rounded-2xl p-4 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg  flex items-center justify-center text-xl font-bold"><img src="/logo.svg" alt="" /></div>
          <div>
            <h1 className="text-lg font-semibold">Asians Technology</h1>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <button onClick={() => setRoute("projects")} className={`py-2 px-3 rounded-lg text-left ${route === "projects" ? "white-border" : "hover:bg-white/5"}`}>
            Projects
          </button>
          <button onClick={() => setRoute("messages")} className={`py-2 px-3 rounded-lg text-left ${route === "messages" ? "white-border" : "hover:bg-white/5"}`}>
            Messages
          </button>
          <button onClick={() => setRoute("timeline")} className={`py-2 px-3 rounded-lg text-left ${route === "timeline" ? "white-border" : "hover:bg-white/5"}`}>
            Timeline
          </button>
          <button onClick={() => setRoute("developers")} className={`py-2 px-3 rounded-lg text-left ${route === "developers" ? "white-border" : "hover:bg-white/5"}`}>
            Developers
          </button>
        </nav>

        <div className="mt-auto text-xs text-gray-400">
          <p>Logged in as: <strong>Admin</strong></p>
          <p className="mt-2">Local storage used for persistence. Ready for backend integration.</p>
          <button
              onClick={handleLogout}
              className="mt-4 px-3 py-2 rounded-lg white-border text-white  transition"
            >
              Logout
            </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3 md:gap-0">
          <h2 className="text-2xl font-semibold capitalize">{route}</h2>
          <div className="flex items-center gap-3">
            {route === "projects" && (
              <button onClick={openAddProject} className="px-4 py-2 rounded-lg white-border hover:scale-110 transition-all duration-150">
                Add Project
              </button>
            )}
            
          </div>
        </div>

        {route === "projects" && (
          <section>
            {/* Projects grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto max-h-[90vh]">
              {projects.length === 0 && (
                <div className="col-span-full p-6  rounded-lg text-center text-gray-400">No projects yet — click Add Project to create one.</div>
              )}

              {projects.map((p) => (
                <div key={p.id} className="white-border rounded-2xl overflow-hidden shadow-lg flex flex-col">
                  <div className="h-44 bg-gray-700 flex items-center justify-center">
                    {p.thumbnail ? (
                      <img src={p.thumbnail} alt={p.name} className="object-cover w-full h-full" />
                    ) : (
                      <div className="text-gray-400">No thumbnail</div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <p className="text-sm text-gray-300">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button onClick={() => editProject(p._id)} className="px-3 py-1 white-border rounded-md text-sm">Edit</button>
                      <button onClick={() => deleteProject(p._id)} className="px-3 py-1 white-border rounded-md text-sm">Delete</button>
                    </div>

                    {/* Sections quick preview */}
                    {p.sections?.length > 0 && (
                      <div className="mt-2 text-xs text-gray-400">
                        Sections: {p.sections.length}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form modal */}
            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 z-50">
                <div className="bg-white/10 backdrop-blur-md white-border rounded-2xl max-w-full sm:max-w-3xl w-full p-6 overflow-auto max-h-[90vh]">
                  {/* Form header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl">{form.id ? "Edit Project" : "Add Project"}</h3>
                    <button onClick={() => { setShowForm(false); setForm(initialProject); }} className="px-3 py-1 bg-white/5 rounded">Close</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm text-gray-300">Project Name</label>
                      <input value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} className="w-full mt-1 p-2 rounded white-border focus:border-indigo-500" />

                      <label className="text-sm text-gray-300">Description</label>
                      <textarea value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} className="w-full mt-1 p-2 rounded white-border focus:border-indigo-500" rows={4}></textarea>

                      <label className="text-sm text-gray-300">Thumbnail (local)</label>
                      <input type="file" accept="image/*" onChange={onThumbnailChange} className="w-full mt-1 text-sm" />
                      {form.thumbnail && <img src={form.thumbnail} alt="thumb" className="mt-2 h-28 object-cover rounded" />}
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300">Sections</label>
                        <button onClick={addSection} className="text-sm px-2 py-1 white-border rounded">+ Add</button>
                      </div>

                      <div className="flex flex-col gap-3 max-h-72 overflow-auto pr-2">
                        {form.sections.map((sec) => (
                          <div key={sec.id} className="white-border rounded p-2 flex flex-col gap-2">
                            <div className="flex items-start gap-2">
                              <div className="w-20 h-16 bg-gray-700 flex items-center justify-center rounded overflow-hidden">
                                {sec.image ? <img src={sec.image} className="object-cover w-full h-full" /> : <span className="text-xs text-gray-400">No image</span>}
                              </div>
                              <div className="flex-1 flex flex-col gap-2">
                                <input value={sec.title} onChange={(e) => setForm((s) => ({ ...s, sections: s.sections.map(x => x.id === sec.id ? { ...x, title: e.target.value } : x) }))} placeholder="Section title" className="w-full p-1 rounded white-border border border-transparent" />
                                <input value={sec.description} onChange={(e) => setForm((s) => ({ ...s, sections: s.sections.map(x => x.id === sec.id ? { ...x, description: e.target.value } : x) }))} placeholder="Section description" className="w-full p-1 rounded white-border border border-transparent text-sm" />

                                <div className="flex gap-2 mt-2 flex-wrap">
                                  <label className="text-sm bg-white/5 px-2 py-1 rounded cursor-pointer">
                                    Upload image
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => onSectionImageChange(e, sec.id)} />
                                  </label>
                                  <button onClick={() => removeSection(sec.id)} className="text-sm white-border px-2 py-1 rounded">Remove</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {form.sections.length === 0 && <div className="text-gray-400 text-sm">No sections yet.</div>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
                    <button onClick={() => { setShowForm(false); setForm(initialProject); }} className="px-4 py-2 rounded bg-white/5 w-full sm:w-auto">Cancel</button>
                    <button onClick={saveProject} className="px-4 py-2 rounded bg-indigo-600 w-full sm:w-auto">{`${addloading ? 'loading': 'Save Project'}`}</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        ) 
       } {route === 'messages' && (
          <section>
            <MessagesSection/>
          </section>
        )}
        {route === 'timeline' && (
          <section className="relative">
            <Timeline/>
          </section>
        )}
        {route === 'developers' && (
          <section className="relative">
            <DevelopersAdmin/>
          </section>
        )}
      </main>
    </div>
  </div>
</div>

  );
}

