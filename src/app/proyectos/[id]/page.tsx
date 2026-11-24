import type { Metadata } from "next";
import { BENTO_PROJECTS } from "@/data/portfolio";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";

export function generateStaticParams() {
  return BENTO_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = BENTO_PROJECTS.find((p) => p.id === id);
  if (!project) {
    return {
      title: "Proyecto | Brayan Pulido",
    };
  }
  return {
    title: project.title,
    description: project.subtitle,
  };
}

export default async function ProyectoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectDetailClient id={id} />;
}
