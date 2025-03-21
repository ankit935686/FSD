import React from "react";
import { githubLogin } from "../context/api";

const GitHubLogin = () => {
  const handleGitHubLogin = async () => {
    try {
      const response = await githubLogin();
      window.location.href = response.data.github_auth_url; // Redirect to GitHub login
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  };

  return <button onClick={handleGitHubLogin}>Login with GitHub</button>;
};

export default GitHubLogin;
