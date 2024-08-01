import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Model from "@/components/Model";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

export default function Home() {

  const Scene = dynamic(() => import("@/components/Scene"), { ssr: false })

  return (
    <div className="h-screen bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Scene />
    </div>
  );
}
