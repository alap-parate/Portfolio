import { projects } from "@/lib/data"
import { ProjectCard } from "@/components/project-card.tsx"
import { useInView } from "@/hooks/use-in-view"

export function ProjectsSection() {
  const projectCount = String(projects.length).padStart(2, "0")
  const { ref: headerRef, isInView: headerInView } = useInView<HTMLDivElement>({ threshold: 0.2, animationKey: "projects-header" })
  const { ref: dividerRef, isInView: dividerInView } = useInView<HTMLDivElement>({ threshold: 0.5, animationKey: "projects-divider" })
  const { ref: gridRef, isInView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.1, animationKey: "projects-grid" })

  return (
    <section id="projects" className="bg-linear-to-r from-stone-300 via-white to-stone-300 py-16 md:py-24 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-16 container mx-auto">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`flex items-end justify-between gap-4 mb-8 transition-all duration-700 ease-out ${
            headerInView 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 -translate-x-20"
          }`}
        >
          <h2 className="font-family-name:var(--font-display) font-bold text-[14vw] md:text-[10vw] lg:text-[5vw] leading-[0.85] text-black uppercase tracking-tight">
            SELECTED
            <br />
            WORKS
          </h2>
          <span className="font-mono text-base md:text-lg text-gray-500 pb-2">({projectCount})</span>
        </div>

        {/* Horizontal divider line */}
        <div 
          ref={dividerRef}
          className={`h-[0.5vh] bg-black mb-10 transition-all duration-700 ease-out origin-left ${
            dividerInView 
              ? "w-full" 
              : "w-0"
          }`}
        />

        {/* Project grid - 2 columns on desktop */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ease-out ${
                gridInView 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-16"
              }`}
              style={{ transitionDelay: gridInView ? `${index * 150}ms` : "0ms" }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
