import { Link } from "react-router-dom";

export default function AuthLayout({ children, eyebrow }) {
  return (
    <main className="min-h-screen bg-slate-950 lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden bg-indigo-600 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-violet-400/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[30rem] w-[30rem] rounded-full bg-cyan-300/20 blur-3xl" />

        <Link to="/" className="relative flex w-fit items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-indigo-700 shadow-lg shadow-indigo-950/20">
            A
          </span>
          <span className="text-lg font-semibold tracking-wide">Aster</span>
        </Link>

        <div className="relative max-w-xl py-16">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-50 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            A calmer way to manage your account
          </span>
          <h1 className="text-5xl font-semibold leading-[1.12] tracking-tight xl:text-6xl">
            Your space,
            <br />
            <span className="text-indigo-200">all in one place.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
            Pick up where you left off. Your account and personal details are
            always just a moment away.
          </p>

          <div className="mt-12 max-w-sm rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl shadow-indigo-950/20 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300/20 text-emerald-200">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <div>
                <p className="font-medium">Your account, protected</p>
                <p className="mt-1 text-sm text-indigo-100">
                  A simple, secure sign-in experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-sm text-indigo-200">
          Simple by design. Ready when you are.
        </p>
      </section>

      <section className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-5 py-10 sm:px-8">
        <Link
          to="/"
          className="mb-8 flex items-center gap-2.5 text-lg font-semibold tracking-tight text-slate-900 lg:hidden"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white">
            A
          </span>
          Aster
        </Link>
        <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/[0.04] sm:p-9">
          <div className="mb-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              {eyebrow}
            </p>
            {children}
          </div>
          <p className="text-center text-xs leading-5 text-slate-400">
            By continuing, you agree to keep your account details safe.
          </p>
        </div>
      </section>
    </main>
  );
}
