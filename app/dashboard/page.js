"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FolderKanban,
  MessageSquare,
  CalendarClock,
  Users,
  LogOut,
  Plus,
  Sparkles,
  Pencil,
  Trash2,
  Search,
  Layers,
  ExternalLink,
  Loader2,
  X,
} from "lucide-react";

const MessagesSection = dynamic(() => import("../components/messagesection"), {
  loading: () => (
    <div className="rounded-3xl min-h-[280px] animate-pulse bg-white/[0.06] backdrop-blur-xl white-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)]" />
  ),
});

const Timeline = dynamic(() => import("../components/timeline"), {
  loading: () => (
    <div className="rounded-3xl min-h-[280px] animate-pulse bg-white/[0.06] backdrop-blur-xl white-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)]" />
  ),
});

const DevelopersAdmin = dynamic(() => import("../components/developeradmin"), {
  loading: () => (
    <div className="rounded-3xl min-h-[280px] animate-pulse bg-white/[0.06] backdrop-blur-xl white-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)]" />
  ),
});

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const initialProject = {
  _id: null,
  name: "",
  description: "",
  thumbnail: null,
  categories: "",
  tags: "",
  link: "",
  sections: [],
  createdAt: null,
};

const navItems = [
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "timeline", label: "Timeline", icon: CalendarClock },
  { id: "developers", label: "Developers", icon: Users },
];

const inputClass =
  "w-full mt-1 rounded-xl bg-white/5 white-border px-3 py-2.5 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20";

/** Simple UI font for dashboard body (Geist from layout). */
const fontSans =
  "font-[family-name:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif]";
/** Jersey 25 — only large headings (matches site hero style). */
const fontDisplay =
  "font-[family-name:var(--font-jersey-25),ui-sans-serif,sans-serif]";

export default function Dashboard() {
  const [route, setRoute] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectSearch, setProjectSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [addloading, setaddloading] = useState(false);

  const router = useRouter();

  const activeNav = useMemo(
    () => navItems.find((n) => n.id === route) ?? navItems[0],
    [route]
  );

  const sectionCount = useMemo(
    () => projects.reduce((n, p) => n + (p.sections?.length ?? 0), 0),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const q = projectSearch.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => {
      const hay = [
        p.name,
        p.description,
        p.categories,
        p.category,
        typeof p.tags === "string" ? p.tags : Array.isArray(p.tags) ? p.tags.join(" ") : "",
        p.link,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [projects, projectSearch]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth !== "true") {
      router.push("/login");
    }
  }, [router]);

  const [form, setForm] = useState(initialProject);

  useEffect(() => {
    if (editingProject) {
      setForm(editingProject);
      setShowForm(true);
    }
  }, [editingProject]);

  useEffect(() => {
    async function fetchProjects() {
      setProjectsLoading(true);
      try {
        const res = await fetch("/api/getprojects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data.projects);
      } catch (err) {
        console.error(err);
        alert("Error fetching projects");
      } finally {
        setProjectsLoading(false);
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

  async function saveProject() {
    if (!form.name.trim()) return alert("Project name is required");

    setaddloading(true);

    const projectData = {
      name: form.name,
      description: form.description,
      thumbnail: form.thumbnail,
      categories: form.categories,
      tags: form.tags,
      link: form.link,
      sections: form.sections,
      createdAt: form.createdAt || new Date().toISOString(),
    };

    try {
      let res;
      if (form._id) {
        res = await fetch(`/api/editproject/${form._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
      } else {
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
      setShowForm(false);
      setForm(initialProject);
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Error saving project");
    } finally {
      setaddloading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    router.push("/login");
  }

  const closeForm = useCallback(() => {
    setShowForm(false);
    setForm(initialProject);
    setEditingProject(null);
  }, []);

  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeForm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm, closeForm]);

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
      className={`min-h-screen pb-12 pt-6 text-white ${fontSans} text-[15px] leading-normal antialiased`}
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -15%, rgba(34, 211, 238, 0.22), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(23, 123, 161, 0.18), transparent 50%)",
        }}
      />

      <div className="main-container max-w-[1400px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <aside className="relative flex shrink-0 flex-col gap-6 overflow-hidden rounded-3xl border border-white/[0.12] bg-[#040d1a]/55 p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl ring-1 ring-cyan-400/15 lg:sticky lg:top-6 lg:w-72 lg:self-start">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
              aria-hidden
            />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/25 to-[#177ba1]/40 ring-1 ring-white/10">
                <img src="/logo.svg" alt="" className="h-7 w-7 opacity-95" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-white">
                  Asians Technology
                </h1>
                <p className="text-xs text-cyan-200/70">Admin dashboard</p>
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-medium text-white/70 transition hover:border-cyan-400/35 hover:bg-cyan-500/10 hover:text-cyan-100"
            >
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              View public site
            </Link>

            <nav className="flex flex-col gap-1.5" aria-label="Dashboard sections">
              {navItems.map(({ id, label, icon: Icon }) => {
                const active = route === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setRoute(id)}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                      active
                        ? "border border-cyan-400/35 bg-gradient-to-r from-cyan-500/20 to-transparent text-white shadow-[0_0_24px_-4px_rgba(34,211,238,0.35)]"
                        : "border border-transparent text-white/75 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        active ? "text-cyan-300" : "text-white/45 group-hover:text-cyan-200/80"
                      }`}
                      strokeWidth={2}
                    />
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto space-y-3 border-t border-white/10 pt-5 text-xs text-white/50">
              <p>
                Signed in as <span className="font-medium text-cyan-100/90">Admin</span>
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] py-2.5 text-sm font-medium text-white transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-100"
              >
                <LogOut className="h-4 w-4" strokeWidth={2} />
                Logout
              </button>
            </div>
          </aside>

          <main className="min-w-0 flex-1 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:p-7">
            <div className="mb-6 flex flex-col gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2 text-cyan-300/90">
                  <Sparkles className="h-4 w-4" strokeWidth={2} />
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/60">
                    Control center
                  </span>
                </div>
                <h2
                  className={`${fontDisplay} bg-gradient-to-r from-white via-white to-cyan-200/90 bg-clip-text text-4xl font-normal capitalize tracking-wide text-transparent sm:text-5xl`}
                >
                  {activeNav.label}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                  {route === "projects" &&
                    "Manage portfolio projects, media, and sections in one place."}
                  {route === "messages" && "Review inquiries and client messages."}
                  {route === "timeline" && "Update milestones and company timeline."}
                  {route === "developers" && "Manage developer profiles and team content."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {route === "projects" && (
                  <>
                    {!projectsLoading && projects.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-transparent px-4 py-2 text-sm backdrop-blur-sm">
                          <span className="text-white/45">Projects</span>{" "}
                          <span className="font-semibold tabular-nums text-cyan-200">
                            {projects.length}
                          </span>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm backdrop-blur-sm">
                          <span className="inline-flex items-center gap-1.5 text-white/45">
                            <Layers className="h-3.5 w-3.5 text-cyan-300/70" />
                            Sections
                          </span>{" "}
                          <span className="font-semibold tabular-nums text-white/90">
                            {sectionCount}
                          </span>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={openAddProject}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-[#177ba1] px-4 py-2.5 text-sm font-semibold text-[#040d1a] shadow-lg shadow-cyan-500/25 transition hover:brightness-110 active:scale-[0.98]"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                      Add project
                    </button>
                  </>
                )}
              </div>
            </div>

            {route === "projects" && (
              <section>
                {!projectsLoading && projects.length > 0 && (
                  <div className="relative mb-5">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
                      strokeWidth={2}
                    />
                    <input
                      type="search"
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      placeholder="Search by name, tags, category, link…"
                      className="w-full rounded-2xl border border-white/10 bg-[#040d1a]/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/35 outline-none ring-cyan-400/0 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/15"
                      aria-label="Filter projects"
                    />
                  </div>
                )}

                {projectsLoading && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03]"
                      >
                        <div className="h-44 animate-pulse bg-white/10" />
                        <div className="space-y-3 p-4">
                          <div className="h-5 w-3/4 animate-pulse rounded-lg bg-white/10" />
                          <div className="h-3 w-full animate-pulse rounded bg-white/5" />
                          <div className="h-3 w-5/6 animate-pulse rounded bg-white/5" />
                          <div className="flex gap-2 pt-2">
                            <div className="h-9 flex-1 animate-pulse rounded-xl bg-white/10" />
                            <div className="h-9 flex-1 animate-pulse rounded-xl bg-white/10" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!projectsLoading && (
                <div className="grid max-h-[calc(100vh-14rem)] grid-cols-1 gap-5 overflow-auto pr-1 sm:grid-cols-2 xl:grid-cols-3 [scrollbar-gutter:stable]">
                  {projects.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] px-8 py-16 text-center">
                      <FolderKanban className="mb-3 h-10 w-10 text-cyan-400/50" strokeWidth={1.25} />
                      <p className="text-white/80">No projects yet</p>
                      <p className="mt-1 max-w-sm text-sm text-white/45">
                        Create your first project to populate the public portfolio.
                      </p>
                      <button
                        type="button"
                        onClick={openAddProject}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20"
                      >
                        <Plus className="h-4 w-4" />
                        Add project
                      </button>
                    </div>
                  )}

                  {projects.length > 0 && filteredProjects.length === 0 && (
                    <div className="col-span-full rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
                      <p className="text-white/80">No projects match your search</p>
                      <button
                        type="button"
                        onClick={() => setProjectSearch("")}
                        className="mt-4 text-sm text-cyan-300 underline-offset-4 hover:underline"
                      >
                        Clear search
                      </button>
                    </div>
                  )}

                  {filteredProjects.map((p) => (
                    <article
                      key={p._id}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-[#040d1a]/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.55)] backdrop-blur-md transition duration-300 hover:border-cyan-400/30 hover:shadow-[0_24px_48px_-12px_rgba(34,211,238,0.12)]"
                    >
                      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-white/10 to-[#0a1628]">
                        {p.thumbnail ? (
                          <img
                            src={p.thumbnail}
                            alt={p.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-white/35">
                            No thumbnail
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040d1a]/90 via-transparent to-transparent opacity-80" />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-lg leading-snug text-white">{p.name}</h3>
                          {p.link ? (
                            <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-200/90">
                              Live
                            </span>
                          ) : null}
                        </div>
                        <p className="line-clamp-2 text-sm text-white/55">{p.description}</p>
                        {(p.categories || p.category) && (
                          <div className="flex flex-wrap gap-1.5">
                            {String(p.categories ?? p.category ?? "")
                              .split(/[,|]/)
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .slice(0, 4)
                              .map((tag, i) => (
                                <span
                                  key={`${tag}-${i}`}
                                  className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-2 py-0.5 text-[11px] text-cyan-100/90"
                                >
                                  {tag}
                                </span>
                              ))}
                          </div>
                        )}
                        {p.link && (
                          <p className="truncate text-xs text-white/40" title={p.link}>
                            {p.link}
                          </p>
                        )}
                        {p.tags && (
                          <p className="text-xs text-white/45">
                            {typeof p.tags === "string" ? p.tags : p.tags.join(", ")}
                          </p>
                        )}
                        {p.sections?.length > 0 && (
                          <p className="text-xs text-white/35">
                            {p.sections.length} section{p.sections.length !== 1 ? "s" : ""}
                          </p>
                        )}
                        <div className="mt-auto flex flex-wrap gap-2 pt-3">
                          <button
                            type="button"
                            onClick={() => editProject(p._id)}
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm transition hover:border-cyan-400/40 hover:bg-cyan-500/10 sm:flex-none"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProject(p._id)}
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-100/90 transition hover:border-red-400/50 hover:bg-red-500/20 sm:flex-none"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                )}

                {showForm &&
                  typeof document !== "undefined" &&
                  createPortal(
                    <div
                      className={`dashboard-modal-overlay fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#040d1a]/85 backdrop-blur-[12px] ${fontSans}`}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="project-form-title"
                      onClick={closeForm}
                    >
                      {/* Full-viewport flex: centered when short; scrollable when tall (mobile / small height) */}
                      <div className="flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-6">
                        <div
                          className="dashboard-modal-panel relative flex w-full max-w-[min(100%,48rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070f18]/98 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_28px_80px_-20px_rgba(0,0,0,0.85),0_0_60px_-25px_rgba(34,211,238,0.35)] ring-1 ring-cyan-400/20 backdrop-blur-2xl max-h-[min(90dvh,52rem)] sm:max-h-[min(92dvh,56rem)]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] bg-gradient-to-r from-cyan-500/10 via-transparent to-[#177ba1]/10 px-5 py-4 sm:px-7 sm:py-5">
                            <div className="min-w-0 pr-2">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/70">
                                Portfolio
                              </p>
                              <h3
                                id="project-form-title"
                                className={`${fontDisplay} mt-1 text-2xl font-normal capitalize leading-tight tracking-wide text-white sm:text-3xl`}
                              >
                                {form._id ? "Edit project" : "New project"}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={closeForm}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/85 transition hover:border-cyan-400/40 hover:bg-cyan-500/15 hover:text-white"
                              aria-label="Close dialog"
                            >
                              <X className="h-5 w-5" strokeWidth={2} />
                            </button>
                          </div>

                          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                              <div className="flex flex-col gap-3">
                                <label className="text-sm text-white/65">Project name</label>
                                <input
                                  value={form.name}
                                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                                  className={inputClass}
                                />

                                <label className="text-sm text-white/65">Description</label>
                                <textarea
                                  value={form.description}
                                  onChange={(e) =>
                                    setForm((s) => ({ ...s, description: e.target.value }))
                                  }
                                  className={`${inputClass} min-h-[100px] resize-y`}
                                  rows={4}
                                />

                                <label className="text-sm text-white/65">Categories</label>
                                <input
                                  value={form.categories || ""}
                                  onChange={(e) =>
                                    setForm((s) => ({ ...s, categories: e.target.value }))
                                  }
                                  placeholder="e.g. Web, Mobile, Design"
                                  className={inputClass}
                                />

                                <label className="text-sm text-white/65">Tags</label>
                                <input
                                  value={form.tags || ""}
                                  onChange={(e) =>
                                    setForm((s) => ({ ...s, tags: e.target.value }))
                                  }
                                  placeholder="tag1, tag2, tag3"
                                  className={inputClass}
                                />

                                <label className="text-sm text-white/65">URL</label>
                                <input
                                  value={form.link || ""}
                                  onChange={(e) =>
                                    setForm((s) => ({ ...s, link: e.target.value }))
                                  }
                                  placeholder="https://"
                                  className={inputClass}
                                />

                                <label className="text-sm text-white/65">Thumbnail</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={onThumbnailChange}
                                  className="mt-1 w-full text-sm text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-3 file:py-2 file:text-sm file:text-cyan-100"
                                />
                                {form.thumbnail && (
                                  <img
                                    src={form.thumbnail}
                                    alt="Thumbnail preview"
                                    className="mt-2 h-28 w-full rounded-xl object-cover ring-1 ring-white/10"
                                  />
                                )}
                              </div>

                              <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                  <label className="text-sm text-white/65">Sections</label>
                                  <button
                                    type="button"
                                    onClick={addSection}
                                    className="rounded-lg border border-cyan-400/35 bg-cyan-500/15 px-2.5 py-1 text-sm text-cyan-100 transition hover:bg-cyan-500/25"
                                  >
                                    + Add
                                  </button>
                                </div>

                                <div className="flex max-h-[min(18rem,40vh)] flex-col gap-3 overflow-y-auto pr-1">
                                  {form.sections.map((sec) => (
                                    <div
                                      key={sec.id}
                                      className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                                    >
                                      <div className="flex items-start gap-2">
                                        <div className="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10">
                                          {sec.image ? (
                                            <img
                                              src={sec.image}
                                              alt=""
                                              className="h-full w-full object-cover"
                                            />
                                          ) : (
                                            <span className="px-1 text-center text-[10px] text-white/35">
                                              No image
                                            </span>
                                          )}
                                        </div>
                                        <div className="min-w-0 flex-1 space-y-2">
                                          <input
                                            value={sec.title}
                                            onChange={(e) =>
                                              setForm((s) => ({
                                                ...s,
                                                sections: s.sections.map((x) =>
                                                  x.id === sec.id
                                                    ? { ...x, title: e.target.value }
                                                    : x
                                                ),
                                              }))
                                            }
                                            placeholder="Section title"
                                            className={inputClass}
                                          />
                                          <input
                                            value={sec.description}
                                            onChange={(e) =>
                                              setForm((s) => ({
                                                ...s,
                                                sections: s.sections.map((x) =>
                                                  x.id === sec.id
                                                    ? { ...x, description: e.target.value }
                                                    : x
                                                ),
                                              }))
                                            }
                                            placeholder="Section description"
                                            className={`${inputClass} text-sm`}
                                          />
                                          <div className="flex flex-wrap gap-2">
                                            <label className="cursor-pointer rounded-lg border border-white/15 bg-white/[0.06] px-2 py-1.5 text-xs transition hover:border-cyan-400/30">
                                              Upload image
                                              <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => onSectionImageChange(e, sec.id)}
                                              />
                                            </label>
                                            <button
                                              type="button"
                                              onClick={() => removeSection(sec.id)}
                                              className="rounded-lg border border-white/15 px-2 py-1.5 text-xs transition hover:border-red-400/40 hover:text-red-200"
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  {form.sections.length === 0 && (
                                    <p className="text-sm text-white/40">No sections yet.</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-white/[0.08] bg-[#070f18]/95 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                            <button
                              type="button"
                              onClick={closeForm}
                              className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-medium transition hover:bg-white/10"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={saveProject}
                              disabled={addloading}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-[#177ba1] px-5 py-2.5 text-sm font-semibold text-[#040d1a] shadow-lg shadow-cyan-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {addloading ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                                  Saving…
                                </>
                              ) : (
                                "Save project"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>,
                    document.body
                  )}
              </section>
            )}

            {route === "messages" && (
              <section className="min-h-[240px]">
                <MessagesSection />
              </section>
            )}

            {route === "timeline" && (
              <section className="relative min-h-[240px]">
                <Timeline />
              </section>
            )}

            {route === "developers" && (
              <section className="relative min-h-[240px]">
                <DevelopersAdmin />
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
