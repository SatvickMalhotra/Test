import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import AdminAuthDialog from "@/components/AdminAuthDialog";
import { useAdminStore } from "@/lib/adminState";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const technicalSkills = [
  "Python",
  "SQL",
  "Excel",
  "Automation",
  "AI",
  "Data Analysis",
  "Data Visualization"
];

const leadershipSkills = [
  "Strong Communication",
  "Leadership",
  "Project Management",
  "Problem-Solving",
  "Technical Proficiency"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [showPictureEdit, setShowPictureEdit] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const { clickCount, incrementClickCount, resetClickCount, isAdmin, profilePicture, setProfilePicture } = useAdminStore();
  const { toast } = useToast();

  const handleWorkflowClick = () => {
    incrementClickCount();
    if (clickCount + 1 === 3) {
      setShowAdminAuth(true);
      resetClickCount();
    }
  };

  const handleSavePicture = () => {
    if (!pictureUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
      return;
    }
    setProfilePicture(pictureUrl);
    setShowPictureEdit(false);
    setPictureUrl("");
    toast({
      title: "Success",
      description: "Profile picture updated successfully"
    });
  };

  return (
    <motion.div 
      className="min-h-[80vh] flex flex-col justify-center items-center text-center gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        <motion.img
          src={profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        />
        {isAdmin && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-8 right-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowPictureEdit(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showPictureEdit && (
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Enter new picture URL"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
          />
          <Button onClick={handleSavePicture}>Save</Button>
        </div>
      )}

      <motion.div
        variants={itemVariants}
        className="text-4xl md:text-6xl font-bold"
      >
        Hello, I'm Satvick Malhotra
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
      >
        I am a tech consultant who helps people resolve their problems using tech and AI. 
        Currently working as a data engineer in a Health tech startup, building their operations 
        projects from scratch and helping them convert manual work into automated <span 
          className="cursor-pointer hover:text-primary"
          onClick={handleWorkflowClick}
        >workflows</span>.
      </motion.div>

      <div className="space-y-4 w-full max-w-2xl">
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold">Technical Skills</h2>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {technicalSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mt-6">Leadership & Team Management</h2>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {leadershipSkills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
      >
        <Link href="/projects">
          <Button size="lg" className="text-lg">
            View Projects
            <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </motion.div>

      <AdminAuthDialog 
        open={showAdminAuth} 
        onOpenChange={setShowAdminAuth} 
      />
    </motion.div>
  );
}