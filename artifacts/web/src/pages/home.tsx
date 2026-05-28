import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Set dark mode by default for this sophisticated look
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-silver-gradient selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center mix-blend-difference">
        <div className="font-serif text-xl tracking-tight text-white">Mundhenke</div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-white/70">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#care" className="hover:text-white transition-colors">Care</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <Button variant="outline" className="metallic-border rounded-full px-6 bg-transparent text-white hover:bg-white hover:text-black transition-all">
          Inquire
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-20 pt-20">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
          <img 
            src="/hero-texture.png" 
            alt="Silver metallic texture" 
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
          />
        </motion.div>

        <div className="relative z-10 max-w-4xl mt-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-8"
          >
            Digital tools <br />
            <span className="text-silver-gradient italic">crafted quietly.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-sans leading-relaxed"
          >
            We design, build, and maintain personalized dashboards and websites for small businesses and individuals. You focus on your work; we keep the engine running.
          </motion.p>
        </div>
      </section>

      {/* The Work / What We Build */}
      <section id="work" className="py-32 px-6 md:px-20 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-serif mb-16 max-w-3xl">
              Software shouldn't feel like a compromise. We build exactly what you need, nothing you don't.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16 mt-24">
            <AnimatedSection delay={0.2} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-sm overflow-hidden mb-8 relative metallic-border hover-metallic-glow">
                <img 
                  src="/dashboard-mockup.png" 
                  alt="Dashboard Mockup" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-serif mb-4">Personalized Dashboards</h3>
              <p className="text-muted-foreground leading-relaxed">
                Internal tools that reflect how your mind actually works. CRMs, trackers, and data visualization tools designed with the care of a consumer product. No bloated features. Just your data, clear and actionable.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="group cursor-pointer md:mt-24">
              <div className="aspect-[4/3] rounded-sm overflow-hidden mb-8 relative metallic-border hover-metallic-glow">
                <img 
                  src="/workspace.png" 
                  alt="Websites" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                />
              </div>
              <h3 className="text-2xl font-serif mb-4">Editorial Websites</h3>
              <p className="text-muted-foreground leading-relaxed">
                Digital presences that command respect. We move past templates to build fast, distinct, and enduring websites that capture the exact nuance of your brand's quiet confidence.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Philosophy / Vibe */}
      <section className="py-32 bg-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-silver-gradient">
              Dependable by design.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-serif italic mb-12">
              "We believe a digital tool should feel like a well-made watch—intricate on the inside, effortlessly simple on the outside, and built to outlast trends."
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <AnimatedSection>
              <h2 className="text-3xl font-serif mb-6">The Process</h2>
              <p className="text-muted-foreground text-sm uppercase tracking-widest">Methodical & Transparent</p>
            </AnimatedSection>
          </div>
          <div className="md:col-span-8 grid gap-12">
            {[
              { num: "01", title: "Discovery & Blueprint", desc: "We sit down to understand the exact friction points in your current workflow or presence. We return with a precise architectural blueprint." },
              { num: "02", title: "Design & Refinement", desc: "Every screen is designed with a focus on typography, spacing, and restraint. We iterate until the tool feels like an extension of your own taste." },
              { num: "03", title: "Development & Polish", desc: "We write clean, performant code. Interactions are smoothed out, edge cases are handled, and the interface is tested rigorously." }
            ].map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.1} className="relative pl-12 border-l border-white/10 group hover:border-white/40 transition-colors">
                <span className="absolute left-0 top-0 -translate-x-1/2 bg-background text-xs px-2 text-white/40 group-hover:text-white transition-colors">{step.num}</span>
                <h3 className="text-xl font-serif mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance / Care */}
      <section id="care" className="py-32 px-6 md:px-20 bg-black text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              A studio that stays.
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Launching is only the beginning. We don't hand over the keys and disappear. We act as your ongoing technical partner—handling updates, security, scaling, and the inevitable small tweaks.
            </p>
            <ul className="space-y-4">
              {['Proactive Security Monitoring', 'Performance Optimization', 'Content & Feature Updates', 'Direct Line to the Founders'].map((item) => (
                <li key={item} className="flex items-center gap-4 text-sm tracking-wide text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-silver-gradient" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="aspect-square rounded-full border-[0.5px] border-white/10 flex items-center justify-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-full" />
              <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center animate-[spin_60s_linear_infinite]">
                <div className="w-3/4 h-3/4 rounded-full border border-white/30 flex items-center justify-center border-dashed" />
              </div>
              <div className="absolute font-serif text-2xl text-silver-gradient italic">Continuous Care</div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-40 px-6 text-center relative">
        <AnimatedSection className="max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif mb-8">Ready to begin?</h2>
          <p className="text-xl text-muted-foreground mb-12 font-sans">
            We take on a limited number of clients per quarter to ensure uncompromising quality. Let's discuss what you need built.
          </p>
          <Button size="lg" className="rounded-none bg-white text-black hover:bg-gray-200 px-12 py-6 text-sm tracking-widest uppercase transition-all duration-300">
            Start a Conversation
          </Button>
          <p className="mt-8 text-xs text-muted-foreground tracking-widest uppercase">
            Or email directly at hello@mundhenke.com
          </p>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-muted-foreground uppercase">
        <div>© {new Date().getFullYear()} Mundhenke Company. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
