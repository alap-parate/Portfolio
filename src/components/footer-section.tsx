import { useState } from "react"
import { personalInfo } from "@/lib/data"
import { Github, Linkedin, Copy, Check } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export function FooterSection() {
  const [copied, setCopied] = useState(false)
  const { ref: headingRef, isInView: headingInView } = useInView<HTMLDivElement>({ threshold: 0.3, animationKey: "footer-heading" })
  const { ref: descRef, isInView: descInView } = useInView<HTMLParagraphElement>({ threshold: 0.5, animationKey: "footer-desc" })
  const { ref: emailRef, isInView: emailInView } = useInView<HTMLDivElement>({ threshold: 0.5, animationKey: "footer-email" })
  const { ref: socialRef, isInView: socialInView } = useInView<HTMLDivElement>({ threshold: 0.5, animationKey: "footer-social" })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <footer className="bg-black overflow-hidden container mx-auto py-20 md:py-20" id="contact">
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center md:text-center space-y-1 px-6 md:px-0">
          {/* Heading */}
          <div
            ref={headingRef}
            className={`transition-all duration-700 ease-out ${
              headingInView 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-20"
            }`}
          >
            <h2 className="text-6xl md:text-[5vw] font-bold tracking-tight">
              <span className="text-white">READY TO <span className="text-[#38bdf8] italic">SCALE?</span> </span>
              
            </h2>
          </div>

          {/* Description */}
          <p 
            ref={descRef}
            className={`mt-5 text-gray-400 font-mono text-lg md:text-xl max-w-2xl items-start self-start text-left leading-relaxed transition-all duration-700 ease-out delay-100 ${
              descInView 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-16"
            }`}
          >
            Let's build something extraordinary. Whether it's a complex backend system or an immersive web experience.
          </p>

          {/* Email section */}
          <div 
            ref={emailRef}
            className={`space-y-3 flex flex-col items-start self-start mt-10 transition-all duration-700 ease-out delay-200 ${
              emailInView 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-16"
            }`}
          >
            <span className="text-lg font-mono text-gray-500 tracking uppercase">
              Drop a line
            </span>
            <div className="flex items-center gap-3">
              <a 
                target="_blank"
                href={`mailto:${personalInfo.email}`}
                className="text-2xl md:text-6xl font-bold text-white hover:text-[#38bdf8] transition-colors underline underline-offset-4 decoration-2"
              >
                {personalInfo.email}
              </a>
              <button
                onClick={copyEmail}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                aria-label="Copy email"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Social links */}
          <div 
            ref={socialRef}
            className={`flex items-center gap-4 pt-4 self-start mt-10 transition-all duration-700 ease-out delay-300 ${
              socialInView 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-16"
            }`}
          >
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="md:w-8 md:h-8 w-6 h-6" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="md:w-8 md:h-8 w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
