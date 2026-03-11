import { Navbar } from "@/components/Navbar";
import {
  Code,
  Server,
  Layout,
  Shield,
  Database,
  Cpu,
  FileText,
  Layers,
} from "lucide-react";

const sections = [
  {
    icon: Layout,
    title: "Frontend Stack",
    items: [
      "React 18 with TypeScript for type-safe component architecture",
      "Tailwind CSS with custom design tokens for consistent theming",
      "shadcn/ui component library for accessible, customizable UI",
      "react-markdown for rendering AI markdown responses",
      "Token-by-token SSE streaming for real-time chat display",
    ],
  },
  {
    icon: Server,
    title: "Backend Architecture",
    items: [
      "Lovable Cloud (Supabase) edge functions for serverless compute",
      "Lovable AI Gateway proxying requests to Google Gemini 3 Flash",
      "Streaming SSE response pipeline for minimal time-to-first-token",
      "CORS-compliant API with proper error handling (429/402/500)",
      "Automatic scaling via edge deployment across global regions",
    ],
  },
  {
    icon: Cpu,
    title: "LLM Configuration",
    items: [
      "Model: google/gemini-3-flash-preview (balanced speed + quality)",
      "System prompt contains verified policies as grounding data",
      "Multilingual support via model's native cross-lingual capability",
      "Structured refusal patterns for unknown or uncertain queries",
      "Streaming enabled for responsive token-by-token output",
    ],
  },
  {
    icon: Shield,
    title: "Safety & Hallucination Prevention",
    items: [
      "Verified policy data embedded in system prompt (ground truth)",
      "Explicit instructions to refuse rather than fabricate answers",
      "Human escalation path for low-confidence policy questions",
      "No user-facing SQL or raw data access (all queries parameterized)",
      "Input validation on both client and server side",
    ],
  },
  {
    icon: Database,
    title: "Logging & Monitoring",
    items: [
      "Edge function logs capture all request/response pairs",
      "Supabase analytics for latency, error rates, and usage metrics",
      "Rate limiting (429) and credit management (402) with user feedback",
      "Structured error responses for all failure modes",
    ],
  },
  {
    icon: Layers,
    title: "Scalability Design",
    items: [
      "Stateless edge functions — horizontal scaling by default",
      "No database dependency for chat (stateless conversations)",
      "CDN-served frontend with code splitting and lazy loading",
      "Connection pooling and retry logic for AI gateway",
    ],
  },
];

const fileTree = [
  { path: "src/App.tsx", desc: "Router setup with all page routes" },
  { path: "src/pages/Index.tsx", desc: "Landing page with features overview" },
  { path: "src/pages/Chat.tsx", desc: "Live AI chat interface with streaming" },
  { path: "src/pages/Architecture.tsx", desc: "System architecture & design choices" },
  { path: "src/pages/Docs.tsx", desc: "This documentation page" },
  { path: "src/components/Navbar.tsx", desc: "Navigation bar component" },
  { path: "src/lib/chatStream.ts", desc: "SSE streaming client for AI chat" },
  { path: "supabase/functions/chat/index.ts", desc: "Edge function for AI gateway" },
  { path: "supabase/config.toml", desc: "Supabase project configuration" },
  { path: "src/index.css", desc: "Design tokens and global styles" },
  { path: "tailwind.config.ts", desc: "Tailwind theme configuration" },
];

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Documentation</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete technical reference for the LLM Customer Support Chatbot
          </p>
        </div>

        {/* Tech Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {sections.map((section, i) => (
            <div key={i} className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1.5 text-[6px]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* File Structure */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Project File Structure
          </h2>

          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-mono text-muted-foreground">
                  Key project files
                </span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {fileTree.map((file, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/30 transition-colors">
                  <code className="text-sm text-primary font-mono min-w-[300px]">
                    {file.path}
                  </code>
                  <span className="text-sm text-muted-foreground">{file.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Docs;
