import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContact, ApiError } from "@workspace/api-client-react";

const BUSINESS_TYPES = [
  "Contractor / Trades",
  "Salon / Spa / Barber",
  "Landscaping / Lawn Care",
  "Cleaning Service",
  "Auto / Detailing",
  "Studio / Practitioner",
  "Consulting / Professional Services",
  "Other Service Business",
];

const PROJECT_TYPES = [
  { value: "website", label: "A new website" },
  { value: "dashboard", label: "An internal dashboard or tool" },
  { value: "both", label: "Both — website and back-office tool" },
  { value: "maintenance", label: "Take over an existing site" },
  { value: "not-sure", label: "Not sure yet — let's talk" },
];

function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
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
        <Button
          variant="outline"
          onClick={scrollToContact}
          className="metallic-border rounded-full px-6 bg-transparent text-white hover:bg-white hover:text-black transition-all"
        >
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
            className="w-full h-full object-cover opacity-25 mix-blend-screen"
          />
        </motion.div>

        <div className="relative z-10 max-w-4xl mt-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-8"
          >
            Built for the people <br />
            <span className="text-silver-gradient italic">who do the work.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-sans leading-relaxed"
          >
            Custom websites and dashboards for service-based businesses — contractors, salons, landscapers, cleaners, studios, and the small firms that quietly keep a town running. You stay on the job. We keep the rest in order.
          </motion.p>
        </div>
      </section>

      {/* The Work / What We Build */}
      <section id="work" className="py-32 px-6 md:px-20 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-serif mb-16 max-w-3xl">
              Your trade deserves better than a template. We build the website and back-office tools your service business actually needs — nothing it doesn't.
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
              <h3 className="text-2xl font-serif mb-4">Operations Dashboards</h3>
              <p className="text-muted-foreground leading-relaxed">
                The back office your business has been running on sticky notes and spreadsheets — done properly. Job tracking, client histories, scheduling, invoices, and route lists, all in one place. Built around how your crew actually works, not how a generic SaaS thinks you should.
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
              <h3 className="text-2xl font-serif mb-4">Websites That Win Work</h3>
              <p className="text-muted-foreground leading-relaxed">
                The first thing a prospective client sees when they search your name. Fast, well-built sites with clear service pages, real photos of your work, online booking or quote requests, and the trust signals that turn a search into a phone call.
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
              We work like you do.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-serif italic mb-12">
              "Show up on time. Do honest work. Stand behind it. The kind of service business owners we build for already operate this way — our job is to give their digital side the same standard."
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
              { num: "01", title: "Ride-Along", desc: "We start by understanding how your business actually runs day to day — the calls, the quotes, the no-shows, the spreadsheets, the paperwork you keep meaning to fix. Then we map out exactly what to build." },
              { num: "02", title: "Design & Refinement", desc: "We design pages and screens around the way you and your customers think. Booking flows, service pages, job views — drafted, shown to you, refined until it fits." },
              { num: "03", title: "Launch & Train", desc: "We build it properly, launch it on solid hosting, and walk you and your team through it. No handover binder full of jargon. Just a working tool and a real person to call." }
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
      <section id="care" className="py-32 px-6 md:px-20 bg-secondary/40 text-foreground relative">
        <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              We don't disappear after launch.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              You shouldn't have to chase a developer every time a price changes, a new service gets added, or something breaks on a Sunday. We stay on as your ongoing tech partner — handling updates, hosting, security, and the small fixes that quietly add up.
            </p>
            <ul className="space-y-4">
              {['Hosting, Backups & Security Handled', 'Seasonal Updates & New Service Pages', 'Booking & Form Reliability Checks', 'A Real Person Who Answers When You Call'].map((item) => (
                <li key={item} className="flex items-center gap-4 text-sm tracking-wide text-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-silver-gradient" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="aspect-square rounded-full border-[0.5px] border-foreground/10 flex items-center justify-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/[0.03] to-transparent rounded-full" />
              <div className="w-full h-full rounded-full border border-foreground/20 flex items-center justify-center animate-[spin_60s_linear_infinite]">
                <div className="w-3/4 h-3/4 rounded-full border border-foreground/30 flex items-center justify-center border-dashed" />
              </div>
              <div className="absolute font-serif text-2xl text-silver-gradient italic">Continuous Care</div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-32 px-6 md:px-20 relative border-t border-border/40">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-16">
          <AnimatedSection className="md:col-span-5">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Tell us about <br />
              <span className="text-silver-gradient italic">your business.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you run a two-truck operation or a shop with twenty hands on staff, we'd like to hear how you work. We take on a small number of new clients each quarter so each one gets our full attention.
            </p>
            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              Or email directly at hello@mundhenke.com
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="md:col-span-7">
            <ContactForm />
          </AnimatedSection>
        </div>
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

function ContactForm() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending } = useSubmitContact({
    mutation: {
      onSuccess: () => {
        setSubmitted(true);
        toast({
          title: "Message received.",
          description: "We'll be in touch within a business day.",
        });
        setName("");
        setEmail("");
        setBusiness("");
        setBusinessType("");
        setProjectType("");
        setMessage("");
      },
      onError: (err) => {
        const description =
          err instanceof ApiError && err.data && typeof err.data === "object" && "message" in err.data
            ? String((err.data as { message?: unknown }).message)
            : "Please try again, or email hello@mundhenke.com directly.";
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description,
        });
      },
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({
      data: {
        name: name.trim(),
        email: email.trim(),
        business: business.trim() || null,
        businessType: businessType || null,
        projectType: projectType || null,
        message: message.trim(),
      },
    });
  }

  if (submitted) {
    return (
      <div className="rounded-sm metallic-border p-10 bg-secondary/20 text-center">
        <h3 className="font-serif text-2xl mb-4 text-silver-gradient">
          Thank you.
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          We've received your note and will reply personally within one business day.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="rounded-full text-xs tracking-widest uppercase"
        >
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="grid gap-2">
          <Label htmlFor="contact-name" className="text-xs tracking-widest uppercase text-muted-foreground">
            Your Name
          </Label>
          <Input
            id="contact-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="bg-secondary/30 border-border/60 h-11 rounded-sm"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email" className="text-xs tracking-widest uppercase text-muted-foreground">
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
            className="bg-secondary/30 border-border/60 h-11 rounded-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="grid gap-2">
          <Label htmlFor="contact-business" className="text-xs tracking-widest uppercase text-muted-foreground">
            Business Name
          </Label>
          <Input
            id="contact-business"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Doe Plumbing Co."
            className="bg-secondary/30 border-border/60 h-11 rounded-sm"
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-xs tracking-widest uppercase text-muted-foreground">
            What Do You Do?
          </Label>
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger className="bg-secondary/30 border-border/60 h-11 rounded-sm">
              <SelectValue placeholder="Select your trade" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs tracking-widest uppercase text-muted-foreground">
          What Are You Looking For?
        </Label>
        <Select value={projectType} onValueChange={setProjectType}>
          <SelectTrigger className="bg-secondary/30 border-border/60 h-11 rounded-sm">
            <SelectValue placeholder="Select a project type" />
          </SelectTrigger>
          <SelectContent>
            {PROJECT_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-message" className="text-xs tracking-widest uppercase text-muted-foreground">
          Tell Us More
        </Label>
        <Textarea
          id="contact-message"
          required
          minLength={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A bit about your business, what's working, what isn't, and what you'd like to have."
          rows={6}
          className="bg-secondary/30 border-border/60 rounded-sm resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-12 py-6 text-sm tracking-widest uppercase transition-all duration-300 mt-2 justify-self-start disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Start a Conversation"}
      </Button>
    </form>
  );
}
