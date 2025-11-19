import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, UtensilsCrossed, Calendar, Camera } from "lucide-react";
import { mockMealLogs } from "@/data/mockData";
import { ShimmerButton } from "@/components/animated/ShimmerButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Consumptions() {
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [mealName, setMealName] = useState("");
  const { toast } = useToast();

  const handleLogMeal = () => {
    if (!mealName.trim()) return;
    
    setLogDialogOpen(false);
    
    // Simulate AI analysis
    setTimeout(() => {
      toast({
        title: "Meal Logged Successfully!",
        description: `Detected ingredients: Rice, Chicken, Vegetables. Inventory updated.`,
      });
      setMealName("");
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl font-bold mb-2">Meal Log</h1>
            <p className="text-muted-foreground">Track what you cook and eat</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ShimmerButton onClick={() => setLogDialogOpen(true)}>
              <Plus className="mr-2 h-5 w-5" />
              Log Meal
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Meal Logs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMealLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="card-hover-gradient p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold mb-1">{log.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(log.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Ingredients Used:</p>
                <div className="flex flex-wrap gap-2">
                  {log.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State or Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 card-hover-gradient p-8 text-center"
        >
          <h3 className="font-heading text-2xl font-semibold mb-2">
            Keep Logging Your Meals
          </h3>
          <p className="text-muted-foreground mb-4">
            The more you log, the better we can help you reduce waste and save money
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div>
              <p className="text-3xl font-heading font-bold text-gradient mb-2">
                {mockMealLogs.length}
              </p>
              <p className="text-muted-foreground">Meals Logged</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-gradient mb-2">
                12
              </p>
              <p className="text-muted-foreground">Ingredients Used</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold text-gradient mb-2">
                0
              </p>
              <p className="text-muted-foreground">Items Wasted</p>
            </div>
          </div>
        </motion.div>

        {/* Log Meal Dialog */}
        <Dialog open={logDialogOpen} onOpenChange={setLogDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log a Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="meal-name">Meal Name</Label>
                <Input
                  id="meal-name"
                  placeholder="e.g., Chicken Biryani"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Upload Photo (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>

              <ShimmerButton 
                onClick={handleLogMeal}
                className="w-full"
              >
                Analyze & Log Meal
              </ShimmerButton>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
