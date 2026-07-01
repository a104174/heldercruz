"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/contact/social-icons";
import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { TextAnimate } from "@/components/ui/text-animate";
import { useDictionary } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/heldercruz30", icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com/a104174", icon: GithubIcon },
  { label: "Twitter / X", href: "https://x.com/hcruz30", icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/hcruzz._/", icon: InstagramIcon }
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.52 0 .2 5.32.2 11.87c0 2.09.55 4.13 1.59 5.93L0 24l6.38-1.67a11.8 11.8 0 0 0 5.69 1.45h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.43-8.43ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-3.79 1 1.01-3.69-.24-.38a9.91 9.91 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.91 9.92Zm5.44-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.23-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.56-.35Z" />
    </svg>
  );
}

export default function ContactPage() {
  const dictionary = useDictionary();
  const directContacts = [
    {
      label: "Email",
      value: "heldercruz.dev@gmail.com",
      href: "mailto:heldercruz.dev@gmail.com",
      icon: Mail,
      note: dictionary.contactPage.emailNote
    },
    {
      label: dictionary.contactPage.whatsappLabel,
      value: "+351 914 096 517",
      href: "https://wa.me/351914096517",
      icon: WhatsAppIcon,
      note: dictionary.contactPage.whatsappNote
    }
  ];

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
              {dictionary.contactPage.eyebrow}
            </motion.p>
            
            <TextAnimate 
              animation="blurIn" 
              as="h1" 
              by="line"
              duration={0.4}
              className="max-w-4xl text-[48px] font-semibold leading-[0.94] tracking-normal text-black sm:text-[72px] md:text-[80px]"
            >
              {dictionary.contactPage.title}
            </TextAnimate>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 max-w-xl text-[15px] leading-7 text-black/60"
            >
              {dictionary.contactPage.intro}
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
                  {dictionary.contactPage.directConnect}
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
                  {dictionary.contactPage.digitalPresence}
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
                  {dictionary.contactPage.message}
                </p>
                <h2 className="text-2xl font-semibold leading-tight text-black md:text-3xl">
                  {dictionary.contactPage.formTitle}
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
