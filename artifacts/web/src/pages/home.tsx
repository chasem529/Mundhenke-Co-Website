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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContact, ApiError } from "@workspace/api-client-react";

const CONTACT_EMAIL = "chase@mundhenke.co";

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

// Credibility numbers shown in the strip under the hero.
// EDIT THESE to match your real figures as your business grows.
const STATS = [
  { value: "100%", label: "Custom-built — never a template" },
  { value: "1 day", label: "Typical reply to a new inquiry" },
  { value: "Ongoing", label: "Care & support after launch" },
  { value: "Local", label: "Built for service businesses" },
];

// PLACEHOLDER case studies — replace with real projects and outcomes
// before publishing. Keep claims truthful.
const CASE_STUDIES = [
  {
    tag: "Landscaping",
    title: "From shoebox of invoices to one clean dashboard",
    result: "Hours of weekly paperwork replaced with a few clicks.",
    desc: "Built a job-tracking and invoicing tool tailored to a seasonal crew — so quotes, schedules, and billing all live in one place.",
  },
  {
    tag: "Trades",
    title: "A website that turns searches into phone calls",
    result: "A clear, fast site with real photos and easy quote requests.",
    desc: "Replaced an outdated, slow page with a modern site built around the services that actually bring in work.",
  },
  {
    tag: "Salon",
    title: "Online booking that fills the slow days",
    result: "Clients book themselves — fewer phone tag, fewer empty chairs.",
    desc: "Added simple online booking and a polished service menu, freeing up the front desk and filling gaps in the calendar.",
  },
];

const FAQS = [
  {
    q: "What does a project cost?",
    a: "Every business is different, so we price per project after we understand what you actually need — no bloated packages for features you'll never use. After a short conversation we give you a clear, fixed quote up front, so there are no surprises.",
  },
  {
    q: "How long does it take?",
    a: "Most websites take a few weeks from kickoff to launch; dashboards and custom tools depend on complexity. We map out a realistic timeline at the start and keep you updated the whole way through.",
  },
  {
    q: "Do I need to be technical?",
    a: "Not at all — that's the whole point. You stay focused on running your business. We handle the technical side, explain things in plain language, and train you on anything you'll touch day to day.",
  },
  {
    q: "What happens after launch?",
    a: "We don't disappear. We stay on as your ongoing tech partner — handling hosting, security, backups, seasonal updates, and the small fixes that come up — so you always have a real person to call.",
  },
  {
    q: "Can you take over a site someone else built?",
    a: "Often, yes. We'll review what you have, tell you honestly whether it's worth keeping or rebuilding, and take care of the migration either way.",
  },
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
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex justify-between items-center border-b border-white/[0.06] backdrop-blur-md bg-background/80">
        <div className="font-serif text-xl tracking-tight">MundhenkeCo</div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition-colors duration-200">Work</a>
          <a href="#results" className="hover:text-foreground transition-colors duration-200">Results</a>
          <a href="#process" className="hover:text-foreground transition-colors duration-200">Process</a>
          <a href="#faq" className="hover:text-foreground transition-colors duration-200">FAQ</a>
          <a href="#contact" className="hover:text-foreground transition-colors duration-200">Contact</a>
        </div>
        <Button
          variant="outline"
          onClick={scrollToContact}
          className="rounded-full px-5 py-2 text-xs tracking-[0.12em] uppercase bg-transparent border-foreground/25 hover:bg-foreground hover:text-background transition-all duration-200"
        >
          Book a Consultation
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

        <div className="relative z-10 max-w-4xl mt-20 md:mt-32">
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
            className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Custom websites and dashboards for service-based businesses — contractors, salons, landscapers, cleaners, studios, and the small firms that quietly keep a town running. You stay on the job. We keep the rest in order.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToContact}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-sm tracking-[0.12em] uppercase transition-all"
            >
              Book a Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.getElementById("work");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="metallic-border rounded-full bg-transparent px-8 py-6 text-sm tracking-[0.12em] uppercase hover:bg-foreground hover:text-background transition-all"
            >
              See What We Build
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="border-y border-white/5 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {STATS.map((stat) => (
            <div key={stat.label} className="py-10 px-4 text-center">
              <div className="font-serif text-3xl md:text-4xl text-silver-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Work / What We Build */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-20 relative">
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

            <AnimatedSection delay={0.2} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-sm overflow-hidden mb-8 relative metallic-border hover-metallic-glow">
                <img 
                  src="/crm-mockup.png" 
                  alt="Custom CRM" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-serif mb-4">Custom CRMs</h3>
              <p className="text-muted-foreground leading-relaxed">
                A customer system that fits the way you actually sell — not a bloated platform you pay for and never fully use. Track leads, quotes, follow-ups, and every conversation in one place, so nothing slips through the cracks and no good customer gets forgotten.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="group cursor-pointer md:mt-24">
              <div className="aspect-[4/3] rounded-sm overflow-hidden mb-8 relative metallic-border hover-metallic-glow">
                <img 
                  src="/project-mgmt-mockup.png" 
                  alt="Custom Project Management Tools" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-serif mb-4">Custom Project Management Tools</h3>
              <p className="text-muted-foreground leading-relaxed">
                Keep every job moving from first call to final invoice. Custom boards, schedules, and checklists built around your real workflow — so your crew knows what's next, deadlines don't slip, and you can see the whole pipeline at a glance.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Case Studies / Proof */}
      <section id="results" className="py-24 md:py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">Real Outcomes</p>
            <h2 className="text-3xl md:text-5xl font-serif mb-16 max-w-3xl">
              The point isn't a prettier screen. It's more booked jobs, nothing slipping through the cracks, and hours handed back to you.
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {CASE_STUDIES.map((study, i) => (
              <AnimatedSection
                key={study.title}
                delay={i * 0.1}
                className="metallic-border rounded-sm p-8 bg-secondary/10 hover-metallic-glow flex flex-col"
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                  {study.tag}
                </span>
                <h3 className="text-xl font-serif mb-4 leading-snug">{study.title}</h3>
                <p className="text-silver-gradient font-serif italic mb-4">{study.result}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-auto">{study.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / Vibe */}
      <section className="py-24 md:py-32 bg-secondary/5 relative overflow-hidden">
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
      <section id="process" className="py-24 md:py-32 px-6 md:px-20 border-t border-white/5">
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
                <span className="absolute left-0 top-0 -translate-x-1/2 bg-background text-xs px-2 tabular-nums text-foreground/30 group-hover:text-foreground/60 transition-colors">{step.num}</span>
                <h3 className="text-xl font-serif mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance / Care */}
      <section id="care" className="py-24 md:py-32 px-6 md:px-20 bg-secondary/40 text-foreground relative">
        <div className="absolute inset-0 opacity-5 bg-[url('/noise.svg')]" />
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

      {/* Booking CTA band */}
      <section className="py-20 md:py-28 px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">No pressure, no jargon</p>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              Ready to see what we'd build <span className="text-silver-gradient italic">for you?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
              Book a free consultation and we'll talk through how your business runs day to day, where the friction is, and exactly what we'd build to fix it. You'll leave the call with a clear plan — whether or not we work together.
            </p>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-10 py-6 text-sm tracking-[0.12em] uppercase transition-all"
            >
              Book a Consultation
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-serif mb-4 text-center">
              Questions, answered.
            </h2>
            <p className="text-muted-foreground text-center mb-16 leading-relaxed">
              The things owners ask us most — before the first call.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left font-serif text-lg hover:no-underline hover:text-silver-gradient py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-20 relative border-t border-border/40">
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
              Or email directly at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground transition-colors">
                {CONTACT_EMAIL}
              </a>
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
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <a
            href="https://x.com/mundhenkeco"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            X
          </a>
          <a
            href="https://instagram.com/mundhenkeco"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Instagram
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground transition-colors normal-case tracking-normal">
            {CONTACT_EMAIL}
          </a>
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
            : `Please try again, or email ${CONTACT_EMAIL} directly.`;
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
            className="bg-secondary/20 border-border h-11 rounded-sm"
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
            className="bg-secondary/20 border-border h-11 rounded-sm"
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
            className="bg-secondary/20 border-border h-11 rounded-sm"
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-xs tracking-widest uppercase text-muted-foreground">
            What Do You Do?
          </Label>
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger className="bg-secondary/20 border-border h-11 rounded-sm">
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
          <SelectTrigger className="bg-secondary/20 border-border h-11 rounded-sm">
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
          className="bg-secondary/20 border-border rounded-sm resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="rounded-none bg-foreground text-background hover:bg-foreground/90 px-12 py-6 text-sm tracking-[0.12em] uppercase transition-all duration-300 mt-2 justify-self-start disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Book My Consultation"}
      </Button>
    </form>
  );
}
