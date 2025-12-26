import { Experience } from "@/components/portfolio/Experience";
import { UIOverlay } from "@/components/portfolio/UIOverlay";

function SRContent() {
  return (
    <div className="sr-only">
      <h1>B. Amarendra Nadh - Agentic AI Engineer & MERN Stack Developer</h1>
      <section>
        <h2>About Me</h2>
        <p>I am a Founder, MERN Stack Developer, and AI Automation Architect specializing in local LLMs, Agentic AI, and workflow automation.</p>
      </section>
      <section>
        <h2>Skills</h2>
        <ul>
          <li>Programming: C, Python, Java (OOP)</li>
          <li>Web: HTML, CSS, React.js, Node.js, Express.js, MongoDB</li>
          <li>AI: Local LLMs, Agentic AI, LangChain, LangGraph, AI Automation</li>
          <li>Tools: Postman, VS Code, Notion, n8n, LLM Studio</li>
        </ul>
      </section>
      <section>
        <h2>Projects</h2>
        <article>
          <h3>Automated YouTube Workflow</h3>
          <p>Devised a content pipeline that automated 70% of video preparation tasks using n8n and custom LLM agents.</p>
        </article>
        <article>
          <h3>Speech Emotion Recognition</h3>
          <p>Trained an audio classification model to detect 6 emotions with over 85% accuracy.</p>
        </article>
        <article>
          <h3>WebNavigator (AI Agent)</h3>
          <p>Engineered an autonomous web navigation agent using LangChain and LLMs.</p>
        </article>
      </section>
      <section>
        <h2>Experience</h2>
        <article>
          <h3>Founder — Digital Marketing Startup</h3>
          <p>Launched and scaled marketing operations; led to a 60% increase in client engagement.</p>
        </article>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <SRContent />
      <Experience />
      <UIOverlay />
    </main>
  );
}
