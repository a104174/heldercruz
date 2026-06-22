"use client";

import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { forwardRef, useRef } from "react";
import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  FileText,
  Globe2,
  Mail,
  Rocket,
  Send,
  Share2Icon,
  UploadCloud
} from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Calendar } from "@/components/ui/calendar";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const exportFiles = [
  {
    name: "bookings.xlsx",
    body: "Bookings organized by date and client."
  },
  {
    name: "billing.pdf",
    body: "Billing summary ready for review."
  },
  {
    name: "clients.csv",
    body: "Exportable client list."
  },
  {
    name: "schedule.pdf",
    body: "Event schedule in a simple format."
  },
  {
    name: "report.pdf",
    body: "Operations report generated from the backoffice."
  },
  {
    name: "payments.xlsx",
    body: "Filtered payments ready to review."
  }
];

const notificationItems = [
  {
    icon: Bell,
    title: "New booking received",
    description: "Request saved in the backoffice.",
    time: "Now"
  },
  {
    icon: FileSpreadsheet,
    title: "Report exported",
    description: "File ready to share.",
    time: "2 min"
  },
  {
    icon: Mail,
    title: "Email sent to client",
    description: "Confirmation delivered successfully.",
    time: "5 min"
  },
  {
    icon: CheckCircle2,
    title: "Payment recorded",
    description: "Status updated in the system.",
    time: "8 min"
  },
  {
    icon: CalendarCheck,
    title: "Schedule updated",
    description: "New appointment added.",
    time: "12 min"
  },
  {
    icon: Send,
    title: "Contact request submitted",
    description: "New message received through the website.",
    time: "15 min"
  }
];

function ExportMarquee() {
  return (
    <Marquee
      pauseOnHover
      className="absolute top-10 [--duration:22s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
    >
      {exportFiles.map((file) => (
        <figure
          key={file.name}
          className={cn(
            "relative w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
            "border-gray-950/[.1] bg-white/55 hover:bg-white/80",
            "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
          )}
        >
          <figcaption className="text-sm font-medium text-neutral-800">{file.name}</figcaption>
          <blockquote className="mt-2 text-xs leading-4 text-neutral-500">{file.body}</blockquote>
        </figure>
      ))}
    </Marquee>
  );
}

function NotificationsPreview({ className }: { className?: string }) {
  return (
    <AnimatedList className={cn("w-full", className)} delay={1150}>
      {notificationItems.map((notification) => {
        const Icon = notification.icon;

        return (
          <div
            key={notification.title}
            className="mx-auto flex w-full max-w-[430px] items-center gap-3 rounded-xl border border-black/10 bg-white/80 p-3 shadow-sm backdrop-blur"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
              <Icon aria-hidden="true" className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-black">{notification.title}</span>
                <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-black/35" />
              </span>
              <span className="block truncate text-xs text-black/48">
                {notification.description}
              </span>
            </span>
            <span className="shrink-0 text-[10px] font-medium text-black/34">
              {notification.time}
            </span>
          </div>
        );
      })}
    </AnimatedList>
  );
}

const Circle = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    label: string;
  }
>(({ children, className, label }, ref) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm",
        className
      )}
    >
      {children}
    </div>
    <span className="text-[10px] font-semibold text-black/48">{label}</span>
  </div>
));

Circle.displayName = "Circle";

function IntegrationsPreview({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const websiteRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const deployRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg",
        className
      )}
    >
      <div className="flex h-full w-full max-w-lg items-center justify-between gap-8 px-8">
        <div className="flex flex-col justify-center gap-8">
          <Circle ref={websiteRef} label="Website">
            <Globe2 aria-hidden="true" className="h-5 w-5" />
          </Circle>
          <Circle ref={dataRef} label="Data">
            <Database aria-hidden="true" className="h-5 w-5" />
          </Circle>
        </div>

        <Circle ref={centerRef} label="Backoffice" className="h-16 w-16 bg-black text-white">
          <Share2Icon aria-hidden="true" className="h-6 w-6" />
        </Circle>

        <div className="flex flex-col justify-center gap-6">
          <Circle ref={emailRef} label="Email">
            <Mail aria-hidden="true" className="h-5 w-5" />
          </Circle>
          <Circle ref={exportRef} label="PDF/Excel">
            <FileText aria-hidden="true" className="h-5 w-5" />
          </Circle>
          <Circle ref={deployRef} label="Deploy">
            <UploadCloud aria-hidden="true" className="h-5 w-5" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={websiteRef} toRef={centerRef} curvature={20} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dataRef}
        toRef={centerRef}
        curvature={-20}
        delay={0.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={emailRef}
        curvature={28}
        delay={0.8}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={exportRef}
        delay={1.2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={deployRef}
        curvature={-28}
        delay={1.6}
      />
    </div>
  );
}

const features = [
  {
    Icon: FileTextIcon,
    name: "Data exports",
    description: "I turn backoffice data into Excel/PDF reports ready to use.",
    href: "/projects",
    cta: "View projects",
    className: "col-span-3 lg:col-span-1",
    background: <ExportMarquee />
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "I create alerts for bookings, requests, payments and important changes.",
    href: "/projects",
    cta: "View projects",
    className: "col-span-3 lg:col-span-2",
    background: (
      <NotificationsPreview className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    )
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "I connect websites to databases, emails, forms and external services.",
    href: "/projects",
    cta: "View projects",
    className: "col-span-3 lg:col-span-2",
    background: (
      <IntegrationsPreview className="absolute right-2 top-4 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
    )
  },
  {
    Icon: CalendarIcon,
    name: "Calendars and scheduling",
    description: "I build calendars to organize events, appointments, tasks and internal operations.",
    href: "/projects",
    cta: "View projects",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2026, 5, 17)}
        className="absolute right-0 top-10 origin-top scale-75 rounded-md border bg-white [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
      />
    )
  }
];

export function HomeServicesBento() {
  return (
    <section className="mx-auto w-full max-w-[1728px] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-black/38">
            Websites and systems
          </p>
          <h2 className="text-balance text-4xl font-semibold leading-[0.96] tracking-normal text-black sm:text-5xl md:text-6xl">
            Features that bring real value to your website
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/56 sm:text-base">
            Beyond polished pages, I build systems that organize data, automate workflows and
            make running your project or business simpler.
          </p>
        </div>

        <BentoGrid className="max-w-6xl">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
