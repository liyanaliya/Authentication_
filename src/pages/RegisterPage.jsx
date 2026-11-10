import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../hooks/useAuth";
import { validateRegister } from "../utils/validation";

export default function RegisterPage() {
  const { register, checkUsername } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const usernameCheckId = useRef(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...values, [name]: value };
    setValues(updated);
    setApiError("");
    setErrors(validateRegister(updated));

    if (name === "username" && value.length >= 3) {
      const currentCheckId = ++usernameCheckId.current;
      checkUsername(value.trim())
        .then((exists) => {
          if (currentCheckId === usernameCheckId.current && exists) {
            setErrors((prev) => ({
              ...prev,
              username: "Username already exists",
            }));
          }
        })
        .catch(() => {
          if (currentCheckId === usernameCheckId.current) {
            setApiError("Unable to check username. Please try again.");
          }
        });
    } else if (name === "username") {
      usernameCheckId.current += 1;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setApiError("");
    try {
      await register(values);
      navigate("/login");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Unable to register.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout eyebrow="Get started">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
        Create your account
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        A few details and you’ll be ready to go.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        {apiError && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {apiError}
          </p>
        )}

        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            minLength={2}
            placeholder="e.g. Alex Morgan"
            value={values.fullName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 aria-invalid:border-red-400"
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-2 text-sm text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            minLength={3}
            maxLength={20}
            placeholder="Choose a username"
            value={values.username}
            onChange={handleChange}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? "username-error" : undefined}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 aria-invalid:border-red-400"
          />
          {errors.username && (
            <p id="username-error" className="mt-2 text-sm text-red-600">
              {errors.username}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 aria-invalid:border-red-400"
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={6}
            required
            placeholder="At least 6 characters"
            value={values.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 aria-invalid:border-red-400"
          />
          {errors.password && (
            <p id="password-error" className="mt-2 text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/25 disabled:opacity-60"
        >
          {isSubmitting ? "Creating your account..." : "Create account"}
          {!isSubmitting && (
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-7-7 7 7-7 7"
              />
            </svg>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}