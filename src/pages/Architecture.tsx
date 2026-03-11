import { Navbar } from "@/components/Navbar";
import {
  Globe,
  MessageSquare,
  Brain,
  Shield,
  Database,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

const flowSteps = [
  {
    icon: MessageSquare,
    title: "User Interface",
    desc: "React chat UI with multilingual input, quick prompts, and real-time streaming display.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Globe,
    title: "Language Detection",
    desc: "Auto-detects user language via the LLM's native multilingual capabilities. User can also manually select.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "LLM + Prompt Logic",
    desc: "Gemini 3 Flash via Lovable AI Gateway with structured system prompts containing verified policy data.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Safety / Filter Module",
    desc: "System prompt constraints, grounded responses with verified data, refusal for unknown topics, and escalation paths.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Database,
    title: "Logging & Monitoring",
    desc: "All interactions logged via Supabase edge function logs for audit, analytics, and model improvement.",
    color: "text-success",
    bg: "bg-success/10",
  },
];

const modelChoices = [
  {
    title: "1. Tokenizer: Multilingual Byte-Pair Encoding (BPE)",
    rationale:
      "The model uses a multilingual BPE tokenizer trained on diverse language corpora. This ensures consistent token coverage across scripts (Latin, Devanagari, CJK, Arabic) without excessive token fragmentation, keeping inference cost proportional regardless of language.",
    icon: "🔤",
  },
  {
    title: "2. Embeddings: Shared Multilingual Embedding Space",
    rationale:
      "A shared cross-lingual embedding space maps semantically similar phrases across languages to nearby vectors. This enables zero-shot language transfer — the model understands 'devolver producto' (Spanish) the same as 'return product' (English) without per-language fine-tuning.",
    icon: "🧬",
  },
  {
    title: "3. Output Control: Constrained Decoding + Grounded Generation",
    rationale:
      "System prompts enforce response boundaries (verified policies only). Temperature is kept low (0.3-0.5) for factual queries. The model is instructed to explicitly refuse when uncertain rather than generate plausible-sounding fiction, paired with escalation to human agents.",
    icon: "🎯",
  },
];

const Architecture = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            System <span className="text-gradient">Architecture</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            End-to-end design of the multilingual LLM customer support chatbot
          </p>
        </div>

        {/* Data Flow Diagram */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            System-Level Data Flow
          </h2>

          <div className="space-y-4">
            {flowSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center shrink-0`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="w-0.5 h-8 bg-border mt-2" />
                  )}
                </div>
                <div className="glass-card rounded-xl p-5 flex-1 group-hover:glow-border transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">
                      STEP {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 glass-card rounded-xl p-6 border border-primary/20">
            <h3 className="font-display font-semibold text-sm text-primary mb-3 uppercase tracking-wider">
              Data Flow Summary
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              User input → Language detected (auto or manual) → Request sent to edge function →
              System prompt with verified policies + user message sent to LLM Gateway →
              Streamed response passes through safety constraints →
              Tokens rendered in real-time in chat UI →
              Full interaction logged for monitoring & audit.
            </p>
          </div>
        </section>

        {/* Model Design Choices */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-warning" />
            Core Model Design Choices
          </h2>

          <div className="space-y-6">
            {modelChoices.map((choice, i) => (
              <div key={i} className="glass-card rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{choice.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      {choice.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      <span className="text-foreground font-medium">Rationale: </span>
                      {choice.rationale}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Scenario */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Risk Scenario: Hallucination Mitigation
          </h2>

          <div className="glass-card rounded-xl p-8 border border-destructive/20">
            <div className="flex items-start gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  The Problem
                </h3>
                <p className="text-muted-foreground text-sm">
                  If the deployed model hallucinates incorrect return/refund policies,
                  users may be misled — causing financial losses, legal liability, and
                  trust erosion.
                </p>
              </div>
            </div>

            <h3 className="font-display font-semibold text-foreground mb-4">
              Technical Solution
            </h3>

            <div className="space-y-4">
              {[
                {
                  title: "Retrieval-Augmented Generation (RAG)",
                  desc: "Ground the model's responses in a verified knowledge base of actual company policies. The system retrieves relevant policy documents before generating, ensuring factual accuracy.",
                },
                {
                  title: "Constrained System Prompts",
                  desc: "Hard-code verified policy data directly in the system prompt. The model is instructed to ONLY reference these policies and to explicitly state uncertainty otherwise.",
                },
                {
                  title: "Confidence-Based Escalation",
                  desc: "When the model detects low confidence on policy-related queries, it automatically offers to connect the user with a human agent rather than risk fabrication.",
                },
                {
                  title: "Post-Generation Validation",
                  desc: "A lightweight filter checks responses against a policy keyword database. If the response contains policy-like claims not in the verified set, it triggers a fallback response.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-1" />
                  <div>
                    <span className="font-medium text-foreground text-sm">
                      {item.title}:
                    </span>{" "}
                    <span className="text-muted-foreground text-sm">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Latency tradeoff: </span>
                RAG adds ~100-200ms per query for retrieval. This is mitigated by
                caching frequent policy lookups and using streaming to mask perceived
                latency — users see tokens arriving while retrieval completes in the
                background.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Architecture;
