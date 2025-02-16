import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAdminStore } from "@/lib/adminState";

interface AdminAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminAuthDialog({ open, onOpenChange }: AdminAuthDialogProps) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const setIsAdmin = useAdminStore((state) => state.setIsAdmin);

  const handleLogin = () => {
    if (id === "123456" && password === "kukka123") {
      setIsAdmin(true);
      toast({
        title: "Success",
        description: "You are now logged in as admin",
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Authentication</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            placeholder="Admin ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
