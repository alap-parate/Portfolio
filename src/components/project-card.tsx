import { Linkedin, BookOpen, ExternalLink, Github, Loader } from "lucide-react"
import type { Project } from "@/lib/data"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const projectNumber = index + 1

  return (
    <article className="bg-white border-4 border-black p-5 flex flex-col transition-all duration-300 ease-out hover:translate-y-[-1vh] hover:shadow-[1vh_1vh_0_rgba(0,0,0,1)] hover:shadow-black">
      {/* Header row: PRJ tag left, icons right */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] bg-black text-white px-2 py-1 tracking-wider">PRJ-{projectNumber}</span>

        {/* Icon buttons */}
        <div className="flex gap-1">
          {project.links.github && project.links.github!="#" && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.links.linkedin && project.links.linkedin!="#" && (
            <a
              href={project.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="View on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {project.links.caseStudy && project.links.caseStudy!="#" &&(
            <a
              href={project.links.caseStudy}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Read case study"
            >
              <BookOpen className="w-4 h-4" />
            </a>
          )}
          {project.links.live && project.links.live!="#" && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="View live site"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            )}
          {project.workInProgress && (
            <span className="w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <Loader className="w-4 h-4 animate-spin" />
            </span>
          )}
        </div>
      </div>

      {/* Project image */}
      <div className="w-full aspect-4/3 bg-gray-100 border-2 border-black mb-4 overflow-hidden">
        {project.image ? (
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-r from-gray-200 to-gray-300">
            <span className="text-gray-400 font-mono text-sm">Project Image</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-(family-name:--font-display) text-xl md:text-2xl text-sky-600 font-bold uppercase mb-3 tracking-tight">
        {project.title}
      </h3>

      {/* Description with left border */}
      <div className="flex gap-3 mb-4 min-h-10">
        <div className="w-[3px] shrink-0" style={{ backgroundColor: "#000000" }} />
        <p className="font-mono text-xs md:text-sm leading-relaxed line-clamp-3">{project.description}</p>
      </div>

      {/* Tech stack tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono font-bold text-[1.2vh] px-3 border-2 border-black text-black uppercase tracking-wider"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  )
}
