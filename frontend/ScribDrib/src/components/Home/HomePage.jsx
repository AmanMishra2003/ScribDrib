import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  LayoutDashboard,
  Users,
  Grid3x3,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(56,189,248,0.15)_1px,transparent_0)] [background-size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950" />
      </div>

      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-[120px]" />

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold">
            <LayoutDashboard className="h-6 w-6 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ScribDrib
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-slate-400 hover:text-cyan-400">
              Features
            </a>
            <a href="#how" className="text-sm text-slate-400 hover:text-cyan-400">
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/auth/login" className="text-sm text-slate-300 hover:text-cyan-400">
              Login
            </Link>

            <Link
              to="/auth/signup"
              className="group rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-[2px]"
            >
              <span className="flex items-center gap-2 rounded-full bg-slate-950 px-6 py-2.5 text-sm font-semibold transition group-hover:bg-transparent">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:text-white">
                  Get Started
                </span>
                <ArrowRight className="h-4 w-4 text-cyan-400 group-hover:text-white" />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-16">
        <section className="flex min-h-screen w-full items-center justify-center py-28 text-center">
          <div className="mx-auto px-6 lg:px-8">
            <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-medium text-cyan-300">
                Real-time Collaboration
              </span>
            </div>

            <h1 className="mx-auto  text-5xl font-black leading-tight md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                Everything happens
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                in real time
              </span>
            </h1>

            <p className="mx-auto mt-10  text-lg md:text-xl text-slate-400">
              A collaborative visual board for teams to plan, brainstorm and
              execute — together.
            </p>

            <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/auth/signup"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-10 py-5 font-bold text-white shadow-lg hover:shadow-cyan-500/30"
              >
                Start Collaborating
              </Link>

              <Link
                to="/demo"
                className="rounded-full border border-white/10 bg-white/5 px-10 py-5 font-semibold backdrop-blur hover:border-cyan-400/40"
              >
                View Demo →
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
<section id="features" className="w-full py-52">
  <div className="mx-auto px-6 lg:px-8 text-center">
    <header className="mb-36">
      <h2 className="mb-10 text-4xl font-black md:text-5xl lg:text-6xl">
        Built for{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          speed & clarity
        </span>
      </h2>
      <p className="mx-auto  text-lg md:text-xl text-slate-400">
        Designed for fast coordination and shared understanding
      </p>
    </header>

    <div className="grid gap-16 md:grid-cols-3">
      <FeatureCard
        icon={<Zap />}
        title="Live Collaboration"
        description="Edit boards together and see updates instantly."
      />
      <FeatureCard
        icon={<Grid3x3 />}
        title="Visual Boards"
        description="Organize ideas visually with cards and lists."
      />
      <FeatureCard
        icon={<ShieldCheck />}
        title="Reliable Sync"
        description="Everyone stays perfectly in sync at all times."
      />
    </div>
  </div>
</section>

{/* How it works */}
<section
  id="how"
  className="w-full border-y border-white/5 bg-slate-900/40 py-56"
>
  <div className="mx-auto px-6 lg:px-8">
    <header className="mb-36 text-center">
      <h2 className="mb-10 text-4xl font-black md:text-5xl lg:text-6xl">
        How it{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          works
        </span>
      </h2>
      <p className="mx-auto text-lg md:text-xl text-slate-400">
        Simple, powerful, team-friendly
      </p>
    </header>

    <div className="grid gap-18 md:grid-cols-3">
      <StepCard step="01" title="Create a Board" />
      <StepCard step="02" title="Collaborate Live" />
      <StepCard step="03" title="Stay Aligned" />
    </div>
  </div>
</section>

{/* CTA */}
<section className="w-full py-60">
  <div className="mx-auto px-6 lg:px-8 text-center">
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10 px-12 py-28 sm:px-24 sm:py-36">
      <Users className="mx-auto mb-16 h-14 w-14 text-cyan-400" />

      <h2 className="mb-10 text-3xl font-black md:text-4xl lg:text-5xl">
        Ready to revolutionize your workflow?
      </h2>

      <p className="mx-auto mb-18 text-lg md:text-xl text-slate-400">
        Join thousands of teams already collaborating on ScribDrib
      </p>

      <Link
        to="/auth/signup"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-10 py-5 font-bold text-white"
      >
        Get Started Free
        <ArrowRight />
      </Link>
    </div>
  </div>
</section>
</main>

{/* Footer */}
<footer className="border-t border-white/5 py-16 text-center text-sm text-slate-500">
  © {new Date().getFullYear()} ScribDrib. All rights reserved.
</footer>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               UI Components                                */
/* -------------------------------------------------------------------------- */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-10 py-12 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-400/40">
      <div className="mb-8 text-cyan-400">{icon}</div>
      <h4 className="mb-4 text-xl font-bold">{title}</h4>
      <p className="text-base leading-relaxed text-slate-400">
        {description}
      </p>
    </div>
  );
}

function StepCard({ step, title }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-10 py-14 text-center transition hover:-translate-y-2 hover:border-cyan-400/40">
      <div className="mb-10 text-6xl font-black text-cyan-400/20">{step}</div>
      <h4 className="text-xl font-bold">{title}</h4>
    </div>
  );
}
