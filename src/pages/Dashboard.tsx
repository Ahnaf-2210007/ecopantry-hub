import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Package, AlertTriangle, CheckCircle, UtensilsCrossed, Leaf, Cloud, DollarSign, ShoppingBag, Utensils, Camera, Lightbulb } from "lucide-react";
import { BorderBeam } from "@/components/animated/BorderBeam";
import { mockGreenScore, mockInventory, mockMealLogs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const expiringItems = mockInventory.filter(item => item.status === "expiring");
  const expiredItems = mockInventory.filter(item => item.status === "expired");

  const recentActivity = [
    { 
      type: 'scan', 
      item: 'Miniket Rice (5kg)', 
      time: '2h ago', 
      delta: '+1', 
      icon: ShoppingBag, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      type: 'log', 
      item: 'Chicken Curry', 
      time: '5h ago', 
      delta: '-4 items', 
      icon: Utensils, 
      color: 'text-orange-600', 
      bg: 'bg-orange-100' 
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your sustainability impact</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Green Score Card with Border Beam */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <BorderBeam>
              <div className="p-8 bg-white border border-slate-100 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-heading text-2xl font-semibold mb-2">Green Score</h3>
                    <p className="text-muted-foreground">Your sustainability rating</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    mockGreenScore.trend === "up" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {mockGreenScore.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-semibold">+{mockGreenScore.change}%</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column: Score & Progress */}
                  <div className="relative">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-heading text-6xl font-bold text-gradient">
                        {mockGreenScore.current}
                      </span>
                      <span className="text-2xl text-muted-foreground">/100</span>
                    </div>
                    
                    {/* Circular Progress */}
                    <div className="relative h-48 w-48">
                      <svg className="transform -rotate-90" width="192" height="192">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="hsl(var(--muted))"
                          strokeWidth="8"
                          fill="none"
                        />
                        <motion.circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 88}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                          animate={{ 
                            strokeDashoffset: 2 * Math.PI * 88 * (1 - mockGreenScore.current / 100)
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop offset="100%" stopColor="hsl(var(--teal))" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Right Column: Impact Stats */}
                  <div className="bg-emerald-50/50 rounded-lg p-6 flex flex-col justify-center">
                    <h4 className="font-heading text-lg font-semibold mb-4">Your Impact</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-emerald-100 p-2">
                          <Leaf className="h-5 w-5 text-emerald-700" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Items Saved</p>
                          <p className="font-heading text-2xl font-bold">24</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-sky-100 p-2">
                          <Cloud className="h-5 w-5 text-sky-700" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">CO₂ Reduced</p>
                          <p className="font-heading text-2xl font-bold">12kg</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-amber-100 p-2">
                          <DollarSign className="h-5 w-5 text-amber-700" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Money Saved</p>
                          <p className="font-heading text-2xl font-bold">৳480</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BorderBeam>
          </motion.div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card-hover-gradient p-6 bg-white border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-xl bg-emerald-100 p-3">
                  <Package className="h-6 w-6 text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="font-heading text-2xl font-bold">{mockInventory.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card-hover-gradient p-6 bg-white border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-xl bg-amber-100 p-3">
                  <AlertTriangle className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
                  <p className="font-heading text-2xl font-bold">{expiringItems.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card-hover-gradient p-6 bg-white border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-xl bg-red-100 p-3">
                  <AlertTriangle className="h-6 w-6 text-red-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expired</p>
                  <p className="font-heading text-2xl font-bold">{expiredItems.length}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate('/inventory')}
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-primary/5"
            >
              <Camera className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">Scan Receipt</p>
                <p className="text-xs text-muted-foreground">Add items quickly</p>
              </div>
            </Button>
            <Button 
              onClick={() => navigate('/consumptions')}
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-primary/5"
            >
              <Utensils className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">Log Meal</p>
                <p className="text-xs text-muted-foreground">Track consumption</p>
              </div>
            </Button>
            <Button 
              onClick={() => navigate('/resources')}
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-primary/5"
            >
              <Lightbulb className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">See Tips</p>
                <p className="text-xs text-muted-foreground">Reduce waste</p>
              </div>
            </Button>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-hover-gradient p-6 bg-white border border-slate-100 shadow-sm"
        >
          <h3 className="font-heading text-2xl font-semibold mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className={`rounded-lg ${activity.bg} p-2`}>
                    <Icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.item}</p>
                    <p className="text-sm text-muted-foreground">{activity.delta}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </motion.div>
              );
            })}

            {mockMealLogs.slice(0, 1).map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  <UtensilsCrossed className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{log.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Used: {log.ingredients.join(", ")}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(log.date).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>

          {expiringItems.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-accent mb-1">Items Expiring Soon</p>
                  <p className="text-sm text-muted-foreground">
                    {expiringItems.map(item => item.name).join(", ")} will expire in the next few days.
                    Check your inventory for recipe suggestions!
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
