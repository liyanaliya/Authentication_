import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white">
              A
            </span>
            Aster
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/10"
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold text-indigo-600">Your account</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Welcome, {user.fullName || user.username}
          </h1>
          <p className="mt-2 text-slate-500">
            Here’s your profile information.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-36 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 sm:h-48">
            <div className="h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
          </div>
          <div className="px-6 pb-7 sm:px-9 sm:pb-9">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="h-24 w-24 rounded-2xl border-4 border-white bg-slate-100 object-cover shadow-md sm:h-28 sm:w-28"
                  />
                ) : (
                  <span className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-3xl font-semibold text-indigo-700 shadow-md sm:h-28 sm:w-28">
                    {(user.fullName || user.username || "?")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
                <div className="pb-1">
                  <h2 className="text-xl font-semibold text-slate-950 sm:text-2xl">
                    {user.fullName || user.username}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    @{user.username}
                  </p>
                </div>
              </div>
              <span className="mb-1 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Account active
              </span>
            </div>

            <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email address
                </p>
                <p className="mt-2 break-all text-sm font-medium text-slate-800">
                  {user.email}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Username
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  @{user.username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}