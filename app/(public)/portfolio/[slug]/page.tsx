import { ProjectDetailSection } from "@/components/sections/ProjectDetailSection";
import { portfolioProjects } from "@/data/portfolio";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const project = portfolioProjects.find((proj) => proj.slug === p.slug);
  
  if (!project) return { title: "Project | MAG Design Portfolio" };
  
  return {
    title: `${project.title.en} | MAG Design Portfolio`,
    description: project.description.en,
  };
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  return <ProjectDetailSection slug={p.slug} />;
}
