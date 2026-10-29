import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { LandingExample } from "@/components/landing-example";
import "./landing.css";

export const metadata: Metadata = {
  title: "Steto | Clinical notes that start with the conversation",
  description: "Documentation assistant for community clinics. Turn consultation dialogue into verified SOAP drafts and standard health records.",
};

const workflow = [
  {
    number: "01",
    title: "Triage and vital signs",
    body: "Triage nurses record baseline vitals: blood pressure, pulse, temperature, and respiration in the patient chart.",
    role: "Nurse",
  },
  {
    number: "02",
    title: "Patient consent and audio capture",
    body: "Clinicians secure explicit patient permission, then capture the consultation dialogue without typing on a keyboard.",
    role: "Doctor / Midwife",
  },
  {
    number: "03",
    title: "Dialogue transcription and SOAP draft",
    body: "Steto structures the conversation into Subjective, Objective, Assessment, and Plan drafts with suggested ICD-10 codes.",
    role: "Doctor / Midwife",
  },
  {
    number: "04",
    title: "Clinical review and sign-off",
    body: "The attending clinician edits findings, verifies diagnostic codes, and approves the final legal visit record.",
    role: "Licensed Clinician",
  },
];

const safeguards = [
  {
    title: "Patient consent required",
    description: "Consultation audio is never recorded without explicit patient consent. Patients can pause or decline capture at any point.",
    badge: "Consent first",
  },
  {
    title: "Clinician retains legal control",
    description: "Steto does not diagnose, prescribe, or close encounters autonomously. Every clinical note requires human clinician sign-off.",
    badge: "Human in the loop",
  },
  {
    title: "Multi-tenant clinic isolation",
    description: "Each health center operates inside an isolated workspace. Patient records are strictly confined to authorized clinic personnel.",
    badge: "Isolated data",
  },
  {
    title: "Interoperable health standards",
    description: "Structured around standard SOAP notes, WHO ICD-10 diagnostic codes, and HL7 FHIR formats ready for national health data registries.",
    badge: "Open standards",
  },
];

const faqs = [
  {
    q: "Does Steto make autonomous diagnoses or treatment choices?",
    a: "No. Steto serves solely as a transcription and drafting assistant. The attending doctor or midwife reviews every line, adjusts clinical assessments, and assumes full legal responsibility before signing.",
  },
  {
    q: "How is patient consent captured before consultation?",
    a: "Before consultation recording begins, the health provider prompts the patient for verbal agreement and confirms consent within the application workflow. Audio capture can be stopped at any moment.",
  },
  {
    q: "What clinical formats and coding systems are supported?",
    a: "Visits are formatted into standard SOAP sections (Subjective, Objective, Assessment, Plan). Suggested diagnosis codes use ICD-10, and export bundles conform to HL7 FHIR R4 specifications.",
  },
  {
    q: "Can health providers access records from other clinics?",
    a: "No. Steto enforces strict multi-tenant boundaries. Each community clinic manages its own personnel, patients, and encounters without cross-clinic data leakage.",
  },
];

export default function Home() {
  return (
    <div className="steto-landing">
      <a className="landing-skip" href="#main">Skip navigation</a>

      <header className="landing-header">
        <nav className="navbar landing-container" aria-label="Main navigation">
          <Brand />
          <div className="landing-nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#example">Sample record</a>
            <a href="#safeguards">Safeguards</a>
            <a href="#faq">FAQ</a>
            <Link href="/panduan">Panduan</Link>
          </div>
          <Link href="/sign-in" className="btn btn-neutral nav-signin">Sign in</Link>
        </nav>
      </header>

      <main id="main">
        {/* Hero Section */}
        <section className="landing-hero landing-container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-context">Clinical documentation for community health centers</p>
            <h1 id="hero-title">
              Focus on the patient.
              <br />
              Let Steto
              <br />
              <span>draft the record.</span>
            </h1>
            <p className="hero-description">
              Capture exam room dialogue with consent. Steto produces structured SOAP drafts, suggested ICD-10 codes, and standard health records so clinicians spend time with patients, not keyboards.
            </p>
            <div className="hero-actions">
              <Link href="/sign-in" className="btn btn-primary hero-primary">Sign in to Steto</Link>
              <a href="#example" className="btn btn-outline">Inspect sample note</a>
            </div>
            <p className="hero-footnote">
              Designed for outpatient clinics, community health centers, and primary care.
            </p>
          </div>

          <LandingExample />
        </section>

        {/* Workflow Section */}
        <section className="workflow-section" id="how-it-works" aria-labelledby="workflow-title">
          <div className="landing-container workflow-grid">
            <div className="workflow-intro">
              <p className="section-context">The shape of one visit</p>
              <h2 id="workflow-title">
                One visit.
                <br />
                One complete record.
              </h2>
              <p>
                Clinical documentation structured around every step in the clinic room, connecting nursing triage to physician sign-off.
              </p>
              <a href="#example" className="workflow-example-link">See the live SOAP draft</a>
            </div>

            <ol className="workflow-list">
              {workflow.map((item) => (
                <li key={item.number}>
                  <span className="workflow-number" aria-hidden="true">{item.number}</span>
                  <div>
                    <div className="workflow-row-heading">
                      <h3>{item.title}</h3>
                      <span>{item.role}</span>
                    </div>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Safeguards & Governance Section */}
        <section className="safeguards-section" id="safeguards" aria-labelledby="safeguards-title">
          <div className="landing-container">
            <div className="safeguards-header">
              <p className="section-context">Clinical governance</p>
              <h2 id="safeguards-title">Built around clinical responsibility and patient privacy.</h2>
              <p className="safeguards-lead">
                Medical documentation software must protect patient confidentiality and preserve clinician judgment. Steto is designed with strict boundaries.
              </p>
            </div>

            <div className="safeguards-grid">
              {safeguards.map((item) => (
                <article key={item.title} className="safeguard-card">
                  <span className="safeguard-badge font-mono">{item.badge}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" id="faq" aria-labelledby="faq-title">
          <div className="landing-container faq-grid">
            <div className="faq-intro">
              <p className="section-context">Questions and answers</p>
              <h2 id="faq-title">Frequently asked questions.</h2>
              <p>Everything you need to know about clinic workflow integration, patient privacy, and data formats.</p>
            </div>

            <div className="faq-list">
              {faqs.map((faq) => (
                <div key={faq.q} className="faq-item">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Action */}
        <section className="closing-section landing-container" aria-labelledby="closing-title">
          <div className="closing-note">
            <div>
              <h2 id="closing-title">
                Open Steto
                <br />
                where you work.
              </h2>
              <p>Sign in with your verified clinic credentials or request access from your administrator.</p>
            </div>
            <Link href="/sign-in" className="btn btn-neutral">Open Steto</Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer landing-container" aria-label="Footer">
        <Brand size="sm" />
        <div className="footer-links">
          <a href="#how-it-works">How it works</a>
          <a href="#example">Sample</a>
          <a href="#safeguards">Safeguards</a>
          <a href="#faq">FAQ</a>
          <Link href="/panduan">Panduan</Link>
          <Link href="/kebijakan-privasi">Privasi</Link>
          <Link href="/sign-in">Sign in</Link>
        </div>
        <p className="footer-copy">Notes that start with the conversation.</p>
        <a href="#main" className="footer-back-to-top">Back to top</a>
      </footer>
    </div>
  );
}
