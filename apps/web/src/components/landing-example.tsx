"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const labels = ["Consultation", "SOAP draft", "FHIR export"];

const sampleFhir = `{
  "resourceType": "Bundle",
  "type": "transaction",
  "entry": [
    {
      "resource": {
        "resourceType": "Encounter",
        "status": "finished",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "AMB",
          "display": "ambulatory"
        },
        "subject": { "reference": "Patient/demo-patient-01" },
        "serviceProvider": { "display": "Puskesmas Kecamatan" }
      }
    },
    {
      "resource": {
        "resourceType": "Condition",
        "clinicalStatus": { "text": "active" },
        "code": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/sid/icd-10",
              "code": "R51",
              "display": "Headache"
            }
          ]
        }
      }
    }
  ]
}`;

export function LandingExample() {
  const [active, setActive] = useState(1);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % labels.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + labels.length) % labels.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = labels.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className="example-stage" id="example">
      <div className="example-backing" aria-hidden="true" />
      <section className="du-card example-sheet" aria-label="Sample consultation note">
        <div className="example-heading">
          <div>
            <p className="document-context">Exam Room 02 · Outpatient Consultation</p>
            <h2>Visit note: Ibu Siti Rahma (42)</h2>
          </div>
          <span className="du-badge du-badge-outline example-label">Sample</span>
        </div>

        <div className="tabs tabs-border example-tabs" role="tablist" aria-label="View consultation stages">
          {labels.map((label, index) => (
            <button
              key={label}
              ref={(el) => { buttons.current[index] = el; }}
              id={`example-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`example-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              className={`tab ${active === index ? "tab-active" : ""}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => navigate(event, index)}
            >
              {label}
            </button>
          ))}
        </div>

        <div id="example-panel-0" role="tabpanel" aria-labelledby="example-tab-0" hidden={active !== 0} className="example-content">
          <div className="conversation-header">
            <span className="audio-badge">Recorded with patient consent</span>
            <span className="audio-time font-mono">Duration: 02:45</span>
          </div>
          <div className="conversation-line">
            <span>Doctor</span>
            <p>Good morning Ibu Siti. What brings you to the clinic today?</p>
          </div>
          <div className="conversation-line patient-line">
            <span>Patient</span>
            <p>Good morning Doctor. I have had a severe throbbing headache and dizziness for three days.</p>
          </div>
          <div className="conversation-line">
            <span>Doctor</span>
            <p>Have you had any fever, stiff neck, or vomiting?</p>
          </div>
          <div className="conversation-line patient-line">
            <span>Patient</span>
            <p>No fever, but mild nausea in the morning. It feels worse when I stand up quickly.</p>
          </div>
          <div className="conversation-line">
            <span>Doctor</span>
            <p>Understood. The triage nurse recorded your blood pressure at 135/85 mmHg. Let us check your reflexes now.</p>
          </div>
        </div>

        <div id="example-panel-1" role="tabpanel" aria-labelledby="example-tab-1" hidden={active !== 1} className="example-content soap-content">
          <div className="soap-row">
            <span className="soap-letter">S</span>
            <div>
              <h3>Subjective</h3>
              <p>Throbbing headache and dizziness for 3 days, exacerbated by postural change. Reports mild morning nausea; denies fever, visual disturbance, or photophobia.</p>
              <span className="source-label">Transcribed from dialogue</span>
            </div>
          </div>
          <div className="soap-row">
            <span className="soap-letter">O</span>
            <div>
              <h3>Objective</h3>
              <p>BP: 135/85 mmHg, HR: 82 bpm, RR: 18/min, Temp: 36.6 C (Triage). Physical exam: Cranial nerves intact, supple neck, negative Kernig sign.</p>
              <span className="source-label">Integrated triage vitals and physical exam</span>
            </div>
          </div>
          <div className="soap-row">
            <span className="soap-letter">A</span>
            <div>
              <h3>Assessment</h3>
              <p>Cephalalgia, consistent with tension-type headache. Stage 1 systolic pre-hypertension. Suggested ICD-10: R51 (Headache).</p>
            </div>
          </div>
          <div className="soap-row">
            <span className="soap-letter">P</span>
            <div>
              <h3>Plan</h3>
              <p>Paracetamol 500 mg PO every 8 hours as needed for pain. Hydration counseling and rest. Follow-up if symptoms persist after 48 hours.</p>
            </div>
          </div>
        </div>

        <div id="example-panel-2" role="tabpanel" aria-labelledby="example-tab-2" hidden={active !== 2} className="example-content fhir-content">
          <div className="fhir-header">
            <span>Standard HL7 FHIR R4 Bundle ready for SATUSEHAT registry</span>
            <span className="fhir-badge font-mono">VALID</span>
          </div>
          <pre className="fhir-code font-mono" tabIndex={0} aria-label="FHIR transaction JSON">
            <code>{sampleFhir}</code>
          </pre>
        </div>

        <div className="example-note">
          <span className="review-mark" aria-hidden="true">!</span>
          <p>
            Draft for clinician verification.
            <br />
            <strong>Clinicians verify and sign off all records before archive.</strong>
          </p>
        </div>
      </section>
      <p className="example-caption">Sample demonstration record, not a live patient consultation.</p>
    </div>
  );
}
