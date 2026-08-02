import { useState, type FormEvent } from "react";
import { subscribe } from "../../lib/emailProvider";
import styles from "./EmailSignupForm.module.css";

interface Props {
  className?: string;
}

type Status = "idle" | "loading" | "success" | "error";

function EmailSignupForm({ className }: Props) {
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
    return <p className={styles.success}>Thanks — you're on the list.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className ? `${styles.form} ${className}` : styles.form}
    >
      <label htmlFor="email" className={styles.label}>
        Join the mailing list
      </label>
      <div className={styles.inputRow}>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={styles.button}
        >
          {status === "loading" ? "Signing up..." : "Sign up"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </form>
  );
}

export default EmailSignupForm;
