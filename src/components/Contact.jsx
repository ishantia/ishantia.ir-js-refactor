import React, { useCallback, useState } from "react";
import Reveal from "./Reveal.jsx";
import Magnetic from "./Magnetic.jsx";
import Icon from "./Icon.jsx";

const FORM_ACTION = "https://formspree.io/f/xldwlwpb";
const INITIAL_FIELDS = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.target);

    try {
      const response = await fetch(FORM_ACTION, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Unable to send");
      setStatus("success");
      setFields(INITIAL_FIELDS);
    } catch {
      setStatus("error");
    }
  }, []);

  const isSending = status === "sending";

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal as="p" className="section-kicker">
          Communication
        </Reveal>
        <Reveal as="h2" className="section-title">
          Have an idea, project, or collaboration?
        </Reveal>
        <Reveal as="p" className="section-copy">
          Whether you want to discuss a new software tool, an AI pipeline, or just say hello — my inbox is always open.
        </Reveal>

        <div className="contact-layout">
          <Reveal as="div" className="contact-card">
            <h3>Direct Channels</h3>
            <p className="contact-card-sub">Feel free to reach out directly through any of these platforms:</p>
            <div className="contact-list">
              <div className="contact-item">
                <div className="contact-icon">
                  <Icon name="envelope" size={20} />
                </div>
                <div>
                  <span className="contact-label">Email</span>
                  <p>
                    <a href="mailto:shantiaeslami@gmail.com">
                      shantiaeslami@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Icon name="telegram" size={20} />
                </div>
                <div>
                  <span className="contact-label">Telegram</span>
                  <p>
                    <a
                      href="https://t.me/ishantia"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @ishantia
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Icon name="github" size={20} />
                </div>
                <div>
                  <span className="contact-label">GitHub</span>
                  <p>
                    <a
                      href="https://github.com/ishantia"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/ishantia
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal as="div" className="form-panel">
            <form
              id="contact-form"
              className="form-grid"
              action={FORM_ACTION}
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <input
                  className="input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                  autoComplete="name"
                  value={fields.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">Your Name</label>
              </div>

              <div className="field">
                <input
                  className="input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  autoComplete="email"
                  value={fields.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Your Email</label>
              </div>

              <div className="field">
                <input
                  className="input"
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  required
                  value={fields.subject}
                  onChange={handleChange}
                />
                <label htmlFor="subject">Subject</label>
              </div>

              <div className="field">
                <textarea
                  className="input"
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  required
                  value={fields.message}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="message">Your Message</label>
              </div>

              <Magnetic
                as="button"
                type="submit"
                className="button primary submit-button"
                id="submitButton"
                disabled={isSending}
              >
                <Icon name="paper-plane" size={18} />
                <span id="submit-text">
                  {isSending ? "Sending message..." : "Send Message"}
                </span>
              </Magnetic>
            </form>

            <div
              id="message-alert"
              className={`alert${status === "success" || status === "error" ? " show" : ""}${
                status === "error" ? " error" : ""
              }`}
              role="alert"
              aria-live="polite"
            >
              {status === "error"
                ? "Failed to send message. Please reach out via Telegram or direct email."
                : "Your message has been sent successfully! I will get back to you soon."}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
