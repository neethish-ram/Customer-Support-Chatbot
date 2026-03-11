import { Link } from "react-router-dom";
import { MessageSquare, Globe, Shield, BarChart3, ArrowRight, Zap, Brain, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

const features = [
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Processes queries in 50+ languages with automatic detection and contextual responses.",
  },
  {
    icon: Brain,
    title: "LLM-Powered Intelligence",
    description: "Advanced language model with prompt engineering for accurate, contextual customer support.",
  },
  {
    icon: Shield,
    title: "Safety & Hallucination Control",
    description: "Built-in safety filters and grounded responses to prevent misleading information.",
  },
  {
    icon: Zap,
    title: "Real-time Streaming",
    description: "Token-by-token streaming for instant, responsive conversations with minimal latency.",
  },
  {
    icon: BarChart3,
    title: "Logging & Monitoring",
    description: "Comprehensive logging of all interactions for analytics, audit trails, and continuous improvement.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Edge-deployed serverless architecture that scales automatically across regions.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <MessageSquare className="w-4 h-4" />
            LLM-Powered Customer Support
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Intelligent Support,{" "}
            <span className="text-gradient">Every Language</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A multilingual AI chatbot designed for global e-commerce — delivering
            contextual, accurate, and safe responses at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="px-8 gap-2 text-base">
              <Link to="/chat">
                Try the Chatbot <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 text-base">
              <Link to="/architecture">View Architecture</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              System <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Enterprise-grade architecture designed for reliability, scalability, and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-6 hover:glow-border transition-all duration-300 group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center glass-card rounded-2xl p-12 glow-border">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to explore?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Chat with the AI assistant, explore the system architecture, or dive into the technical documentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/chat">
                <MessageSquare className="w-4 h-4" /> Start Chatting
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/docs">
                <BookOpen className="w-4 h-4" /> Read Docs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>GlobalShop AI — LLM Customer Support System</span>
          <span>Built with React + Lovable Cloud</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
