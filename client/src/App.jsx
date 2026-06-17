import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import InputField from "./components/InputField.jsx";
import Button from "./components/Button.jsx";
import OutputBox from "./components/OutputBox.jsx";

const INITIAL_FORM = { jobRole: "", projectName: "", technologies: "", description: "" };

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [bullets, setBullets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const update = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (apiError) setApiError("");
  };

  const validate = () => {
    const e = {};
    if (!form.jobRole.trim())      e.jobRole      = "Job role is required";
    if (!form.projectName.trim())  e.projectName  = "Project name is required";
    if (!form.technologies.trim()) e.technologies = "Technologies are required";
    if (!form.description.trim())  e.description  = "Project description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleGenerate = async () => {
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    setBullets([]);
    try {
      const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const res = await fetch(`${API_URL}/api/generate`,  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data.error || "Something went wrong."); return; }
      setBullets(data.bullets);
    } catch {
      setApiError("Network error. Make sure the server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(bullets.join("\n"));
    } catch {
      const el = document.createElement("textarea");
      el.value = bullets.join("\n");
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  };

  const handleClear = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setBullets([]);
    setApiError("");
  };

  return (
    <div className="app">
      <Header />

      <main className="main">
        {/* Hero */}
        <div className="hero">
          <div className="hero-badge">
            <span className="pulse-dot" />
            AI-Powered · ATS-Optimized · Instant Results
          </div>
          <h1>
            AI Resume{" "}
            <span>Bullet Generator</span>
          </h1>
          <p className="hero-sub">
            Generate ATS-friendly resume points for your projects using AI.
          </p>
        </div>

        {/* Form Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <p className="card-title">Project Details</p>
              <p className="card-sub">Fill in all fields to generate your bullets</p>
            </div>
          </div>

          <div className="grid-2">
            <InputField label="Job Role" id="jobRole" placeholder="e.g. Full Stack Developer"
              value={form.jobRole} onChange={update("jobRole")} error={errors.jobRole} />
            <InputField label="Project Name" id="projectName" placeholder="e.g. E-Commerce Platform"
              value={form.projectName} onChange={update("projectName")} error={errors.projectName} />
          </div>

          <div className="full-width">
            <InputField label="Technologies Used" id="technologies"
              placeholder="e.g. React, Node.js, PostgreSQL, AWS, Docker"
              value={form.technologies} onChange={update("technologies")} error={errors.technologies} />
          </div>

          <div className="full-width-last">
            <InputField label="Project Description" id="description" type="textarea" rows={5}
              placeholder="Describe your role, what the project does, challenges you solved, and measurable outcomes (e.g. improved performance by 40%, reduced costs, served 10k users)..."
              value={form.description} onChange={update("description")} error={errors.description} />
          </div>

          {apiError && (
            <div className="api-error">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd" />
              </svg>
              <p>{apiError}</p>
            </div>
          )}

          <div className="actions">
            <Button
              label="Generate Bullets"
              onClick={handleGenerate}
              variant="primary"
              loading={loading}
              icon={
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />

            {bullets.length > 0 && (
              <Button
                label="Copy All"
                onClick={handleCopyAll}
                variant="secondary"
                icon={
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              />
            )}

            <Button
              label="Clear"
              onClick={handleClear}
              variant="ghost"
              icon={
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Output */}
        <OutputBox bullets={bullets} onCopyAll={handleCopyAll} />

        {/* Stats (shown when no bullets yet) */}
        {bullets.length === 0 && !loading && (
          <div className="stats">
            {[
              { value: "5",   label: "Bullets Generated" },
              { value: "ATS", label: "Optimized" },
              { value: "<25", label: "Words Each" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
