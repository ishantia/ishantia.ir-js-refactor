import React from "react";
import Reveal from "./Reveal.jsx";
import Icon from "./Icon.jsx";

const BENTO_ITEMS = [
  {
    icon: "sparkles",
    tag: "AI & Backend",
    title: "AI Voice Assistant & LLMs",
    body: "Experience building Persian AI voice pipelines (STT, Gemma-3-27B LLM via LM Studio, TTS, and face detection) during a 240-hour internship at SnowaTech.",
  },
  {
    icon: "mobile-screen",
    tag: "Systems & OS",
    title: "Android & Kernel Exploration",
    body: "Hands-on experience with Android device trees, TWRP custom recovery building, and kernel source modifications.",
  },
  {
    icon: "code",
    tag: "Automation",
    title: "Python, Java & Telegram APIs",
    body: "Authoring Telegram bots, membership validation tools (TGC), automated scripts, and creative full-stack experiments.",
  },
  {
    icon: "network-wired",
    tag: "Embedded & IoT",
    title: "Hardware & Digispark Projects",
    body: "Tinkering with Arduino, Digispark USB microcontrollers, automation keystroke payloads, and networking tools like FlexDNS.",
  },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <Reveal as="aside" className="profile-panel" data-parallax="0.04">
          <div className="profile-image-wrap">
            <img
              className="profile-image"
              src="/assets/images/mybot-160.webp"
              srcSet="/assets/images/mybot-160.webp 160w, /assets/images/mybot-320.webp 320w"
              sizes="96px"
              alt="Avatar illustration of Shantia Eslami"
              width="96"
              height="96"
              loading="lazy"
              decoding="async"
            />
            <span className="profile-badge-dot" title="Active developer"></span>
          </div>
          <h2>Student. Developer. Builder.</h2>
          <p>
            Focused on practical code, AI model pipelines, creative hardware experiments, and continuous craft improvement.
          </p>
          <div className="availability">
            <span>
              Location <strong>Isfahan, Iran</strong>
            </span>
            <span>
              Education <strong>Computer Science</strong>
            </span>
            <span>
              Mindset <strong>Open Source</strong>
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal as="p" className="section-kicker">
            About Me
          </Reveal>
          <Reveal as="h2" className="section-title">
            Curiosity turned into code, tools, and real-world experiments.
          </Reveal>
          <Reveal as="p" className="section-copy">
            From low-level Android kernels to high-level speech-to-text AI models and automation scripts, I love breaking down complex systems and building fast, useful tools.
          </Reveal>

          <div className="bento-grid">
            {BENTO_ITEMS.map((item) => (
              <Reveal as="article" className="bento-card" key={item.title}>
                <div className="bento-top">
                  <span className="bento-icon-box">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span className="bento-tag">{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
