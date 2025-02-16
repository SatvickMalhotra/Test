import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import type { Project } from "@shared/schema";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AnimatedText from "@/components/AnimatedText";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${id}`]
  });

  if (isLoading) {
    return <div className="h-96 bg-muted animate-pulse rounded-lg" />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/projects">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </Link>

      <div className="space-y-4">
        <AnimatedText className="text-4xl font-bold">
          {project.title}
        </AnimatedText>

        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>

      <img 
        src={project.thumbnail}
        alt={project.title}
        className="w-full aspect-video object-cover rounded-lg"
      />

      {project.videoUrl && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Demo</h2>
          <VideoPlayer url={project.videoUrl} />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <h2>About this project</h2>
        <p>{project.fullDescription}</p>
      </div>

      {project.liveUrl && (
        <Button 
          size="lg" 
          onClick={() => window.open(project.liveUrl || '', '_blank')}
        >
          View Live Project
          <ExternalLink className="ml-2" />
        </Button>
      )}
    </motion.div>
  );
}