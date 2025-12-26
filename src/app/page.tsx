import { Experience } from "@/components/portfolio/Experience";
import { UIOverlay } from "@/components/portfolio/UIOverlay";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Experience />
      <UIOverlay />
    </main>
  );
}
