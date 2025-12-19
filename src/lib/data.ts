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
    workInProgress: boolean
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
            github: "https://github.com/alap-parate/NestJS-Starter-Template",
            linkedin: "#",
            caseStudy: "#",
            live: "#",
        },
        workInProgress: true,
    },
    {
        id: 2,
        title: "strand-auth",
        description: "Auth designed to keep auth fast and decoupled while providing forensic visibility into token misuse, expiry, and key-rotation issues.",
        image: "/images/auth.jpg",
        techStack: ["TYPESCRIPT", "NESTJS", "AUTHENTICATION", "AUTHORIZATION", "JWT"],
        links: {
            github: "https://github.com/alap-parate/strand-auth",
            linkedin: "#",
            caseStudy: "#",
            live: "#",
        },
        workInProgress: true,
    },
]