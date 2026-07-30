import { useState, type FormEvent } from "react";
import { subscribe } from "../lib/emailProvider";

type Status = "idle" | "loading" | "success" | "error";

function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await subscribe(email);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  }

  if (status === "success") {
    return <p>Thanks — you're on the list.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Join the mailing list</label>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Signing up..." : "Sign up"}
        </button>
      </div>
      {status === "error" && <p role="alert">{error}</p>}
    </form>
  );
}

export default EmailSignupForm;
