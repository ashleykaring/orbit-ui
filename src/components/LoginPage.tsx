import { useState, type FormEvent } from "react";
import "../styles/LoginPage.css";

type LoginPageProps = {
  onSignIn: () => void;
};

export default function LoginPage({ onSignIn }: LoginPageProps) {
  const [username, setUsername] = useState("jessica32");
  const [password, setPassword] = useState("........");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSignIn();
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <img
          src="/orbit_logo_rectangle_tight_dark.png"
          alt="Orbit"
          className="login-logo"
        />
        <p className="login-subtitle">Monitor your family's digital orbit</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          className="login-input"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label className="login-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="login-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button className="login-button" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
