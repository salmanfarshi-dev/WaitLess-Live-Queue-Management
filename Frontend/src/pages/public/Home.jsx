import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiPlay,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiActivity,
} from "react-icons/fi";
import { motion } from "motion/react";

function Home() {
  return (
    <main className="w-full overflow-hidden">
      <section className="relative isolate flex min-h-[760px] w-full items-center overflow-hidden bg-[var(--wl-navy)]">
        {/* Background Video */}
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/waitless-hero-poster.jpg"
        >
          <source src="/videos/waitless-hero.mp4" type="video/mp4" />
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--wl-navy)] via-[var(--wl-navy)]/90 to-[var(--wl-navy)]/45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--wl-navy)]/60 via-transparent to-[var(--wl-navy)]/20" />

        {/* Background Glow */}
        <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-[500px] w-[500px] rounded-full bg-[var(--wl-secondary)]/20 blur-[120px]" />

        <div className="wl-container relative grid w-full items-center gap-16 py-24 lg:min-h-[760px] lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-2xl"
          >
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--wl-secondary)] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--wl-secondary)]" />
              </span>
              <span className="text-[11px] font-extrabold tracking-[1.2px] text-white">
                SMARTER HEALTHCARE QUEUE MANAGEMENT
              </span>
            </div>

            <h1 className="max-w-2xl text-5xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Less Waiting.
              <span className="mt-2 block text-[var(--wl-secondary)]">
                More Time for
              </span>
              What Matters.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              A smarter way to manage healthcare queues. Find hospitals, get
              your token, and follow your queue progress without unnecessary
              waiting.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/hospitals"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[var(--wl-primary)] px-8 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--wl-primary-dark)]"
              >
                Find a Hospital
                <FiArrowUpRight size={19} />
              </Link>

              <Link
                to="/how-it-works"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                <FiPlay size={16} />
                How It Works
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/15 pt-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[var(--wl-secondary)]">
                  <FiClock size={21} />
                </span>
                <span className="text-sm font-semibold text-white/85">
                  Less Waiting
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[var(--wl-secondary)]">
                  <FiUsers size={21} />
                </span>
                <span className="text-sm font-semibold text-white/85">
                  Better Organization
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[var(--wl-secondary)]">
                  <FiActivity size={21} />
                </span>
                <span className="text-sm font-semibold text-white/85">
                  Live Queue Updates
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Queue Card */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md py-5 lg:ml-auto"
          >
            {/* Main Card */}
            <div className="rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold tracking-[1px] text-[var(--wl-muted)]">
                    WAITLESS LIVE EXPERIENCE
                  </p>
                  <h2 className="text-xl font-extrabold text-[var(--wl-navy)]">
                    Your Queue Status
                  </h2>
                </div>

                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--wl-secondary-light)] px-3 py-2 text-[10px] font-extrabold text-[var(--wl-secondary-dark)]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--wl-secondary)]" />
                  LIVE
                </span>
              </div>

              {/* Token Panel */}
              <div className="rounded-2xl bg-[var(--wl-background)] p-5 sm:p-6">
                <p className="text-[11px] font-bold tracking-wide text-[var(--wl-muted)]">
                  YOUR TOKEN NUMBER
                </p>

                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-4xl font-extrabold tracking-tight text-[var(--wl-primary)]">
                    WL-024
                  </p>
                  <span className="rounded-full bg-[var(--wl-secondary-light)] px-3 py-2 text-xs font-bold text-[var(--wl-secondary-dark)]">
                    Active
                  </span>
                </div>

                {/* Queue Statistics */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[var(--wl-border)] bg-white p-4">
                    <FiClock className="text-[var(--wl-primary)]" size={21} />
                    <p className="mb-1 mt-3 text-xs text-[var(--wl-muted)]">
                      Estimated Wait
                    </p>
                    <p className="text-2xl font-extrabold text-[var(--wl-navy)]">
                      12 min
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--wl-border)] bg-white p-4">
                    <FiUsers className="text-[var(--wl-secondary)]" size={21} />
                    <p className="mb-1 mt-3 text-xs text-[var(--wl-muted)]">
                      People Ahead
                    </p>
                    <p className="text-2xl font-extrabold text-[var(--wl-navy)]">
                      03
                    </p>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--wl-secondary-light)] text-[var(--wl-secondary)]">
                  <FiCheckCircle size={21} />
                </span>

                <div>
                  <p className="text-sm font-bold text-[var(--wl-navy)]">
                    You're all set!
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--wl-muted)]">
                    Follow your queue without standing in line.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Top Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 -top-7 hidden items-center gap-3 rounded-2xl border border-white/50 bg-white p-4 shadow-xl sm:flex lg:-right-10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--wl-secondary-light)] text-[var(--wl-secondary)]">
                <FiCheckCircle size={22} />
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--wl-navy)]">
                  Simple & Organized
                </p>
                <p className="mt-1 text-xs text-[var(--wl-muted)]">
                  A better queue experience
                </p>
              </div>
            </motion.div>

            {/* Floating Bottom Card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-7 -left-4 hidden items-center gap-3 rounded-2xl border border-white/50 bg-white/95 p-4 shadow-xl backdrop-blur-xl sm:flex"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--wl-primary-light)] text-[var(--wl-primary)]">
                <FiActivity size={21} />
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--wl-navy)]">
                  Real-time Updates
                </p>
                <p className="mt-1 text-xs text-[var(--wl-muted)]">
                  Stay informed, stress less
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default Home;
