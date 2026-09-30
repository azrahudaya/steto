import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { LandingExample } from "@/components/landing-example";

export const metadata: Metadata = {
  title: "Steto | Notes that start with the conversation",
  description: "See how Steto turns a clinic conversation into a draft medical note. Read the example, then sign in to your account.",
};

const workflow = [
  { number: "01", title: "Set up the patient", body: "Pull up the chart and record the vital signs before the visit.", role: "Nurse" },
  { number: "02", title: "Consent first", body: "Ask permission, then capture the conversation.", role: "Doctor / midwife" },
  { number: "03", title: "Review the draft", body: "Compare the SOAP draft against the conversation and exam.", role: "Doctor / midwife" },
  { number: "04", title: "Finish the record", body: "Confirm the ICD-10 code and the visit note before approval.", role: "Clinician" },
];

export default function Home() {
  return (
    <div className="steto-landing" data-theme="steto">
      <a className="landing-skip" href="#main">Skip navigation</a>
      <header className="landing-header">
        <nav className="du-navbar landing-container" aria-label="Main navigation">
          <Brand />
          <div className="landing-nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#example">See an example</a>
          </div>
          <Link href="/sign-in" className="du-btn du-btn-neutral nav-signin">Sign in</Link>
        </nav>
      </header>

      <main id="main">
        <section className="landing-hero landing-container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-context">Documentation help for community clinics</p>
            <h1 id="hero-title">Focus on the patient.<br />Let Steto<br /><span>handle the notes.</span></h1>
            <p className="hero-description">Turn a clinic conversation into a clean medical record. Read the draft, finish the exam, sign off.</p>
            <div className="hero-actions">
              <Link href="/sign-in" className="du-btn du-btn-primary hero-primary">Sign in to Steto</Link>
              <a href="#example" className="du-btn du-btn-outline">See a sample note</a>
            </div>
            <p className="hero-footnote">From conversation to draft. You control the final note.</p>
          </div>
          <LandingExample />
        </section>

        <section className="workflow-section" id="how-it-works" aria-labelledby="workflow-title">
          <div className="landing-container workflow-grid">
            <div className="workflow-intro">
              <p className="section-context">The shape of one visit</p>
              <h2 id="workflow-title">One visit.<br />One complete record.</h2>
              <p>Documentation follows the exam room, from patient setup to clinician sign-off.</p>
              <a href="#example" className="workflow-example-link">See the SOAP draft</a>
            </div>
            <ol className="workflow-list">
              {workflow.map((item) => (
                <li key={item.number}>
                  <span className="workflow-number" aria-hidden="true">{item.number}</span>
                  <div><div className="workflow-row-heading"><h3>{item.title}</h3><span>{item.role}</span></div><p>{item.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="closing-section landing-container" aria-labelledby="closing-title">
          <div className="closing-note">
            <div><h2 id="closing-title">Open Steto<br />where you work.</h2><p>Sign in with your existing account.</p></div>
            <Link href="/sign-in" className="du-btn du-btn-neutral">Open Steto</Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer landing-container">
        <Brand />
        <p>Notes that start with the conversation.</p>
        <a href="#main">Back to top</a>
      </footer>
    </div>
  );
}
