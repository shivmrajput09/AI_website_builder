import React from "react";
import { Link } from "react-router-dom";
// Lucide icons for a premium look
import { Plus, Layout, Edit3, ExternalLink, Settings2 } from "lucide-react";
import Header from "../components/Header";
import { useSelector } from "react-redux";

export default function Dashboard() {
  // [Zero-Knowledge Explanation]
  // Redux se user ka data nikal rahe hain (jaise naam aur bache hue credits).
  const { userData } = useSelector((state) => state.user);

  // [Change Effect]
  // Yeh ek dummy data hai. Jab backend ready hoga, toh hum DB se user ki banayi hui websites
  // fetch karke is array mein daalenge. Abhi design dekhne ke liye isme 2 dummy projects hain.
  const mySites = [
    {
      id: "proj_123",
      name: "Photography Portfolio",
      slug: "photo-folio-24",
      status: "Published",
      lastEdited: "2 hours ago",
    },
    {
      id: "proj_456",
      name: "E-Commerce Landing Page",
      slug: "tech-store-pro",
      status: "Draft",
      lastEdited: "1 day ago",
    },
  ];

  return (
    <main className="mx-auto max-w-[1280px] p-3 sm:p-6">
      {/* Outer Theme Wrapper */}
      <div className="rounded-[2.5rem] bg-paper pb-4 sm:pb-12 min-h-screen">
        <Header />

        {/* ---------- DASHBOARD HEADER ---------- */}
        <section className="mx-3 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:mx-6">
          <div>
            {/* Dynamically user ka naam dikhayenge agar hai, warna default 'Builder' */}
            <h1 className="text-3xl font-bold text-forest-950 sm:text-4xl">
              Welcome back, {userData?.name || "Builder"}! 👋
            </h1>
            <p className="mt-2 text-forest-800/70">
              You have <span className="font-bold text-forest-950">{userData?.credits || 100} credits</span> remaining.
            </p>
          </div>
          
          {/* Create New Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-semibold text-forest-800 transition hover:brightness-95"
          >
            <Plus size={18} />
            Create New Site
          </Link>
        </section>

        {/* ---------- PROJECTS GRID ---------- */}
        <section className="mx-3 mt-10 sm:mx-6">
          <h2 className="text-xl font-bold text-forest-950 mb-6 flex items-center gap-2">
            <Layout size={20} className="text-forest-800" />
            Your Websites
          </h2>

          {mySites.length === 0 ? (
            // [Zero-Knowledge Explanation]
            // Empty State: Jab user naya hoga aur koi site nahi banayi hogi, 
            // tab blank screen dikhane ki jagah hum yeh prompt dikhayenge.
            <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-forest-950/10 bg-forest-950/5 py-20 text-center">
              <p className="text-lg font-semibold text-forest-950">No websites yet.</p>
              <p className="mt-2 text-forest-800/70 max-w-sm">
                You haven't generated any websites. Describe your idea and let AI build it for you in seconds.
              </p>
              <Link
                to="/"
                className="mt-6 rounded-full bg-forest-950 px-6 py-2.5 text-sm font-semibold text-paper transition hover:bg-forest-800"
              >
                Generate First Site
              </Link>
            </div>
          ) : (
            // [Change Effect]
            // Grid layout: Desktop par 3 cards ek line mein aayenge (lg:grid-cols-3), 
            // Tablet par 2 (md:grid-cols-2), aur Mobile par 1.
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mySites.map((site) => (
                <div
                  key={site.id}
                  className="flex flex-col rounded-[2rem] bg-forest-950 p-6 shadow-sm transition hover:shadow-md border border-forest-800/20"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-paper">{site.name}</h3>
                      <a 
                        href={`https://${site.slug}.yourdomain.com`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sm text-mist hover:text-lime transition"
                      >
                        {site.slug}.yourdomain.com
                      </a>
                    </div>
                    {/* Status Badge */}
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      site.status === "Published" ? "bg-lime/20 text-lime" : "bg-paper/10 text-mist"
                    }`}>
                      {site.status}
                    </span>
                  </div>

                  {/* Spacer to push buttons to the bottom */}
                  <div className="flex-grow">
                    <p className="text-xs text-mist/70 mb-6">Last edited: {site.lastEdited}</p>
                  </div>

                  {/* ---------- ACTION BUTTONS ---------- */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    
                    {/* 🛠️ MANUAL ADJUST / EDIT BUTTON (Tumhara Feature!) */}
                    {/* [Zero-Knowledge Explanation]
                        Jab user is par click karega, hum use '/editor/:id' wale page par le jayenge 
                        jahan Code aur UI dono manually edit ho sakenge. */}
                    <Link
                      to={`/editor/${site.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-4 py-2.5 text-sm font-semibold text-forest-950 transition hover:brightness-95"
                    >
                      <Edit3 size={16} />
                      Manual Edit
                    </Link>

                    {/* View Live / Settings */}
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest-800 px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-forest-800/80 border border-paper/10">
                      <Settings2 size={16} />
                      Settings
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}