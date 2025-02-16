import ReactPlayer from "react-player";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function VideoPlayer({ url }: { url: string }) {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        pip
      />
    </AspectRatio>
  );
}
