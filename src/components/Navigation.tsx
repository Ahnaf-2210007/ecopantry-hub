import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Leaf, LayoutDashboard, Package, UtensilsCrossed, BookOpen, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "./animated/ShimmerButton";

export const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Leaf },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/inventory", label: "Inventory", icon: Package },
    { path: "/consumptions", label: "Meal Log", icon: UtensilsCrossed },
    { path: "/resources", label: "Resources", icon: BookOpen },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.1 }}
              className="rounded-xl bg-primary p-2"
            >
              <Leaf className="h-6 w-6 text-white" />
            </motion.div>
            <span className="font-heading text-xl font-bold text-gradient">
              EcoPantry
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-4 py-2 rounded-lg font-medium transition-colors",
                    isActive(item.path)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  <span className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </span>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-primary/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <ShimmerButton className="px-6 py-2">
              <Plus className="mr-2 inline h-4 w-4" />
              Add Item
            </ShimmerButton>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden rounded-lg p-2 hover:bg-muted">
            <Package className="h-6 w-6" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
