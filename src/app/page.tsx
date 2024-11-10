import Hero from "@/components/Hero";
import VideoCarousal from "@/components/VideoCarousal";
import TopCreators from "@/components/TopCreators";
// import TopContributors from "@/components/TopContributors";

export default function Home() {
  return (
    <>
      <Hero />
      <VideoCarousal />
      <TopCreators />
      {/* <TopContributors /> */}
    </>
  );
}
