"use client";

import type { SVGProps } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { TextAnimate } from "@/components/ui/text-animate";
import { cn } from "@/lib/utils";

// --- ÍCONES DE MARCAS (SVGs Customizados) ---
const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
// ---------------------------------------------

const directContacts = [
  {
    label: "Email",
    value: "a104174@uminho.pt",
    href: "mailto:a104174@uminho.pt",
    icon: Mail,
    note: "Best for project context and formal proposals."
  },
  {
    label: "WhatsApp / Phone",
    value: "+351 91X XXX XXX", // Substitui pelo teu número
    href: "https://wa.me/351910000000", // Substitui pelo teu link wa.me
    icon: MessageCircle,
    note: "Available for quick messages and urgent inquiries."
  }
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/heldercruz30", icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com/a104174", icon: GithubIcon },
  { label: "Twitter / X", href: "https://x.com/hcruz30", icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/hcruzz._/", icon: InstagramIcon }
];

export default function ContactPage() {
  return (
    <PageShell className="bg-[#fbfaf7] text-black">
      <section className="px-5 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-32 lg:px-8">
        <Container className="px-0">
          
          {/* HEADER DA PÁGINA (Coreografado) */}
          <div className="max-w-4xl">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 text-[10px] font-bold uppercase tracking-[0.18em] text-black/40"
            >
              Get in touch
            </motion.p>
            
            <TextAnimate 
              animation="blurIn" 
              as="h1" 
              by="line"
              duration={0.4}
              className="max-w-4xl text-[48px] font-semibold leading-[0.94] tracking-normal text-black sm:text-[72px] md:text-[80px]"
            >
              {"Let's build software\nthat works."}
            </TextAnimate>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 max-w-xl text-[15px] leading-7 text-black/60"
            >
              Whether you have a specific project in mind, need a tailored system, or just want to explore a potential collaboration, I am ready to talk.
            </motion.p>
          </div>

          {/* ESTRUTURA PRINCIPAL */}
          <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-24">
            
            {/* COLUNA ESQUERDA: Tipografia e Links */}
            <div className="space-y-16">
              
              {/* ZONA 1: Contactos Diretos */}
              <div>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-black/30"
                >
                  Direct Connect
                </motion.h2>
                <div className="flex flex-col gap-8">
                  {directContacts.map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <motion.a
                        key={contact.label}
                        href={contact.href}
                        target={contact.href.startsWith("http") ? "_blank" : undefined}
                        rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        // Cascata: 0.4s, depois 0.5s...
                        transition={{ delay: 0.4 + (index * 0.1), duration: 0.5, ease: "easeOut" }}
                        className="group flex flex-col items-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                      >
                        <span className="mb-2 flex items-center gap-2.5 text-sm font-semibold text-black/50 transition-colors duration-300 group-hover:text-black">
                          <Icon aria-hidden="true" className="h-4 w-4" />
                          {contact.label}
                        </span>
                        <span className="text-2xl font-medium tracking-tight text-black transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                          {contact.value}
                        </span>
                        <span className="mt-2 text-[13px] text-black/40">
                          {contact.note}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* ZONA 2: Redes Sociais */}
              <div>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black/30"
                >
                  Digital Presence
                </motion.h2>
                <div className="flex flex-col">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        // Cascata: 0.6s, 0.65s, 0.7s...
                        transition={{ delay: 0.6 + (index * 0.05), duration: 0.4, ease: "easeOut" }}
                        className="group flex items-center justify-between border-b border-black/5 py-4 transition-colors duration-300 hover:border-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                      >
                        <span className="flex items-center gap-3 text-[15px] font-medium text-black/70 transition-colors duration-300 group-hover:text-black">
                          <Icon aria-hidden="true" className="h-4 w-4 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                          {social.label}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 text-black/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                        />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: Formulário (Sticky) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
              className={cn(
                "rounded-[32px] border border-black/5 bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_32px_90px_rgba(0,0,0,0.09)]",
                "sm:p-9 lg:sticky lg:top-28"
              )}
            >
              <div className="mb-8">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black/30">
                  Message
                </p>
                <h2 className="text-2xl font-semibold leading-tight text-black md:text-3xl">
                  Send the details directly.
                </h2>
              </div>
              
              {/* O formulário já tem as suas próprias animações internas staggerChildren */}
              <ContactForm idPrefix="contact-page" variant="simple" />
            </motion.div>
            
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
