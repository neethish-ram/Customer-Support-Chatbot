import { Link, useLocation } from "react-router-dom";
import { MessageSquare, LayoutDashboard, BookOpen, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/architecture", label: "Architecture", icon: Shield },
  { to: "/docs", label: "Documentation", icon: BookOpen },
];

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              GlobalShop<span className="text-gradient"> AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === to
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
