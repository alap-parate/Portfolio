export const personalInfo = {
    firstName: "ALAP",
    middleName: "DASHRATH",
    lastName: "PARATE",
    role: "BACKEND DEVELOPER",
    bio: "Building High-Performance Backend Systems, turning ideas into scalable solutions. Specializing in Typescript and NestJS.",
    email: "alap.parate@gmail.com",
    status: "AVAILABLE",
    socials: {
        linkedin: "https://www.linkedin.com/in/alapparate/",
        github: "https://github.com/alap-parate",
        twitter: "https://x.com/alapparate",
    },
    calendlyLink: "https://calendly.com/alap-parate",
}

export interface Project {
    id: number
    title: string
    description: string
    image?: string // Added optional image field
    techStack: string[]
    links: {
        live?: string
        github?: string
        caseStudy?: string
        linkedin?: string // Added LinkedIn link option
    }
}

export const projects: Project[] = [
    {
        id: 1,
        title: "NESTJS STARTER TEMPLATE",
        description:
            "Starter Template with basic setup to get started without getting overwhelmed.",
        image: "/images/nestjs.jpg",
        techStack: ["TYPESCRIPT", "NESTJS", "TEMPLATE"],
        links: {
            github: "#",
            linkedin: "#",
            caseStudy: "#",
            live: "#",
        },
    },
    {
        id: 2,
        title: "event-driven cqrs",
        description: "Scalable Event-driven CQRS implementation using Kafka and NestJS.",
        image: "/images/cubes.jpg",
        techStack: ["KAFKA", "CQRS", "EVENT-DRIVEN"],
        links: {
            github: "#",
            linkedin: "#",
            caseStudy: "#",
            live: "#",
        },
    },
]