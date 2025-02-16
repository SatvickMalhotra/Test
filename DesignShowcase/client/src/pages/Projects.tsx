import ProjectCard from "@/components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import AnimatedText from "@/components/AnimatedText";
import type { Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddProjectDialog from "@/components/AddProjectDialog";
import { useAdminStore } from "@/lib/adminState";

export default function Projects() {
  const [showAddProject, setShowAddProject] = useState(false);
  const isAdmin = useAdminStore((state) => state.isAdmin);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"]
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-8">
          <AnimatedText className="text-3xl font-bold">
            My Projects
          </AnimatedText>
          {isAdmin && (
            <Button onClick={() => setShowAddProject(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          )}
        </div>
        <AnimatedText className="text-muted-foreground">
          Here are some of the projects I've worked on. Click on any project to learn more.
        </AnimatedText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <AddProjectDialog 
        open={showAddProject} 
        onOpenChange={setShowAddProject} 
      />
    </div>
  );
}