import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { BadgeCheck, Sparkles } from "lucide-react";
import Header, { BRAND } from "../components/Header";

// Content ko data se render karte hain, taaki text badalna aasan ho.
const BENEFITS = [
  "Full responsive HTML + Tailwind site, ready in under a minute",
  "Edit the code in a VS Code style editor, or just chat your changes",
  "Pay only for what you use: no subscription, no hidden limits",
];

const STEPS = [
  "Describe your site in one prompt",
  "AI generates the page and shows a live preview",
  "Tweak it with chat or edit the code directly",
  "Deploy with one click and share your link",
];

// Check-icon wali list item (dono dark cards mein use hoti hai)
function CheckItem({ children }) {
  return (
    <li className="flex gap-3 text-[15px] leading-relaxed text-paper">
      <BadgeCheck className="mt-0.5 shrink-0 text-lime" size={22} />
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const { userData } = useSelector((state) => state.user);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    // TODO (Phase 5): yahan POST /api/website/generate call hoga
    // aur success par editor page par redirect karenge.
    console.log("Generate:", prompt);
  };

  return (
    <main className="mx-auto max-w-[1280px] p-3 sm:p-6">
      {/* Bada white container: reference image jaisa "browser card" */}
      <div className="rounded-[2.5rem] bg-paper pb-4 sm:pb-6">
        <Header />

        {/* ---------- HERO (yahi page ki memorable cheez hai) ---------- */}
        <section className="mx-3 mt-10 grid gap-10 rounded-[2rem] bg-forest-800 p-7 sm:mx-6 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          {/* Left: heading + prompt */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold text-paper sm:text-6xl">
              Describe your idea.
              <span className="block text-lime">We build the website.</span>
            </h1>

            <form onSubmit={handleGenerate} className="mt-9">
              <label htmlFor="prompt" className="mb-3 block text-sm text-mist">
                What should we build?
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                maxLength={2000}
                placeholder="A dark-theme portfolio for a photographer, with a gallery and a contact form"
                className="w-full resize-none rounded-2xl border border-paper/20 bg-forest-950/40 p-5 text-[15px] text-paper placeholder:text-mist/60 focus:border-lime focus:outline-none"
              />
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-display text-base font-semibold text-forest-800 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles size={18} />
                Generate website
              </button>
            </form>
          </motion.div>

          {/* Right: credits panel (calculator wale card ka idea) */}
          <div className="flex flex-col justify-center">
            <p className="text-lg text-mist">
              {userData ? "Your balance" : "Free on sign up"}
            </p>
            <p className="mt-1 font-display text-7xl font-bold leading-none tracking-tighter text-paper sm:text-8xl">
              {userData ? userData.credits : 100}
            </p>
            <p className="mt-2 text-lg text-paper">credits</p>

            <div className="my-7 h-px bg-paper/25" />

            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-sm text-mist">New website</dt>
                <dd className="font-display text-3xl font-semibold text-lime">50</dd>
              </div>
              <div>
                <dt className="text-sm text-mist">Chat edit</dt>
                <dd className="font-display text-3xl font-semibold text-lime">25</dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-mist">
              Manual code edits and deploys are always free.
            </p>
          </div>
        </section>

        {/* ---------- FEATURE CARDS ---------- */}
        <section className="mx-3 mt-4 grid gap-4 sm:mx-6">
          <div className="grid gap-8 rounded-[2rem] bg-forest-950 p-7 sm:p-12 lg:grid-cols-[1fr_1.6fr] lg:items-center">
            <h2 className="text-4xl font-bold text-paper sm:text-5xl">
              Why teams
              <span className="block text-lime">pick {BRAND}</span>
            </h2>
            <ul className="space-y-5">
              {BENEFITS.map((text) => (
                <CheckItem key={text}>{text}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="grid gap-8 rounded-[2rem] bg-forest-800 p-7 sm:p-12 lg:grid-cols-[1fr_1.6fr] lg:items-center">
            <h2 className="text-4xl font-bold text-paper sm:text-5xl">
              How it works
            </h2>
            <ol className="grid gap-5 sm:grid-cols-2">
              {STEPS.map((text) => (
                <CheckItem key={text}>{text}</CheckItem>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* ---------- FOOTER CTA ---------- */}
      <section className="mt-4 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-forest-950 p-7 sm:flex-row sm:items-center sm:p-12">
        <div>
          <h2 className="text-3xl font-bold text-paper sm:text-4xl">
            Your first site is on us.
          </h2>
          <p className="mt-2 text-mist">Sign in and get 100 credits instantly.</p>
        </div>
        <a
          href="#prompt"
          className="rounded-full bg-lime px-7 py-3.5 font-display font-semibold text-forest-800 transition hover:brightness-95"
        >
          Start building
        </a>
      </section>
    </main>
  );
}