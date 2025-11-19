import { motion } from "framer-motion";
import { useState } from "react";
import { Camera, Package, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { mockInventory } from "@/data/mockData";
import { ShimmerButton } from "@/components/animated/ShimmerButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Inventory() {
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleScan = () => {
    setScanDialogOpen(true);
    // Simulate scanning process
    setTimeout(() => {
      setScanDialogOpen(false);
      toast({
        title: "Scan Complete!",
        description: "Successfully added 3 items to your inventory",
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "fresh":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "expiring":
        return <AlertTriangle className="h-5 w-5 text-accent" />;
      case "expired":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "fresh":
        return "bg-primary/10 text-primary";
      case "expiring":
        return "bg-accent/10 text-accent";
      case "expired":
        return "bg-destructive/10 text-destructive";
      default:
        return "";
    }
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
            <h1 className="font-heading text-4xl font-bold mb-2">My Pantry</h1>
            <p className="text-muted-foreground">
              {mockInventory.length} items • {mockInventory.filter(i => i.status === "expiring").length} expiring soon
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ShimmerButton onClick={handleScan}>
              <Camera className="mr-2 h-5 w-5" />
              Scan Shopping
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Inventory Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-hover-gradient overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b">
                <tr>
                  <th className="text-left p-4 font-heading font-semibold">Item</th>
                  <th className="text-left p-4 font-heading font-semibold">Category</th>
                  <th className="text-left p-4 font-heading font-semibold">Quantity</th>
                  <th className="text-left p-4 font-heading font-semibold">Expiry Date</th>
                  <th className="text-left p-4 font-heading font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockInventory.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{item.category}</td>
                    <td className="p-4">
                      <span className="font-medium">
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {new Date(item.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.daysUntilExpiry > 0 
                          ? `${item.daysUntilExpiry} days left`
                          : item.daysUntilExpiry === 0
                          ? "Expires today"
                          : "Expired"
                        }
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="text-sm font-medium capitalize">{item.status}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Scan Dialog */}
        <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Scanning Receipt</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-4"
              >
                <Camera className="h-16 w-16 text-primary" />
              </motion.div>
              <p className="text-muted-foreground">Analyzing your shopping receipt...</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
