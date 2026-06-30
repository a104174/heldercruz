"use client";

import { Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/use-i18n";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  className?: string;
  idPrefix?: string;
  onSuccess?: () => void;
  variant?: "detailed" | "simple";
};

type ContactState = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  website: string;
};

type FieldErrors = Partial<Record<keyof ContactState, string>>;

const initialState: ContactState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
  website: ""
};

const projectTypes = ["Website", "Web app", "Backoffice", "Consulting", "Other"];
const budgetRanges = ["Under 2k", "2k - 5k", "5k - 10k", "10k+"];

function validate(values: ContactState, messages: ReturnType<typeof useDictionary>["contactForm"]["errors"]) {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = messages.name;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = messages.email;
  }

  if (values.message.trim().length < 10) {
    errors.message = messages.message;
  }

  return errors;
}

// Animações para a cascata de entrada dos campos
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export function ContactForm({
  className,
  idPrefix = "contact",
  onSuccess,
  variant = "detailed"
}: ContactFormProps) {
  const dictionary = useDictionary();
  const labels = dictionary.contactForm;
  const [values, setValues] = useState<ContactState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const isSimpleVariant = variant === "simple";

  const updateValue = (field: keyof ContactState, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(values, labels.errors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setStatusMessage(labels.errors.highlighted);
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          origin: window.location.href
        })
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
        fieldErrors?: Record<string, string[]>;
      };

      if (!response.ok || !result.success) {
        const nextErrors: FieldErrors = {};

        Object.entries(result.fieldErrors || {}).forEach(([field, messages]) => {
          const key = field as keyof ContactState;
          nextErrors[key] = messages[0];
        });

        setErrors(nextErrors);
        setStatus("error");
        setStatusMessage(result.message || labels.errors.send);
        return;
      }

      setValues(initialState);
      setErrors({});
      setStatus("success");
      setStatusMessage(result.message || labels.success);
      onSuccess?.();
    } catch {
      setStatus("error");
      setStatusMessage(labels.errors.fallback);
    }
  };

  const getFieldId = (field: string) => `${idPrefix}-${field}`;
  
  // Classes CSS Premium
  const inputClasses =
    "h-12 w-full rounded-[14px] border border-black/5 bg-black/[0.03] px-4 text-[15px] text-black transition-all duration-300 placeholder:text-black/30 hover:bg-black/[0.05] focus:border-black/20 focus:bg-white focus:outline-none focus:ring-4 focus:ring-black/[0.03]";
  const labelClasses = "mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-black/50";
  const errorClasses = "mt-2 text-[13px] font-medium text-red-600";

  return (
    <motion.form 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("space-y-6", className)} 
      onSubmit={handleSubmit} 
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <motion.div variants={itemVariants}>
          <label className={labelClasses} htmlFor={getFieldId("name")}>
            {labels.name}
          </label>
          <input
            id={getFieldId("name")}
            name="name"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            className={inputClasses}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? getFieldId("name-error") : undefined}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }} 
                id={getFieldId("name-error")} 
                className={errorClasses}
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className={labelClasses} htmlFor={getFieldId("email")}>
            {labels.email}
          </label>
          <input
            id={getFieldId("email")}
            name="email"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            className={inputClasses}
            autoComplete="email"
            inputMode="email"
            type="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? getFieldId("email-error") : undefined}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }} 
                id={getFieldId("email-error")} 
                className={errorClasses}
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {isSimpleVariant ? (
        <motion.div variants={itemVariants}>
          <label className={labelClasses} htmlFor={getFieldId("subject")}>
            {labels.subject}
          </label>
          <input
            id={getFieldId("subject")}
            name="subject"
            value={values.projectType}
            onChange={(event) => updateValue("projectType", event.target.value)}
            className={inputClasses}
            autoComplete="off"
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? getFieldId("subject-error") : undefined}
          />
        </motion.div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-3">
          <motion.div variants={itemVariants}>
            <label className={labelClasses} htmlFor={getFieldId("company")}>
              {labels.company}
            </label>
            <input
              id={getFieldId("company")}
              name="company"
              value={values.company}
              onChange={(event) => updateValue("company", event.target.value)}
              className={inputClasses}
              autoComplete="organization"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label className={labelClasses} htmlFor={getFieldId("project-type")}>
              {labels.projectType}
            </label>
            <select
              id={getFieldId("project-type")}
              name="projectType"
              value={values.projectType}
              onChange={(event) => updateValue("projectType", event.target.value)}
              className={cn(inputClasses, "cursor-pointer appearance-none")}
            >
              <option value="">{labels.select}</option>
              {projectTypes.map((projectType) => (
                <option key={projectType} value={projectType}>
                  {projectType}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className={labelClasses} htmlFor={getFieldId("budget")}>
              {labels.budget}
            </label>
            <select
              id={getFieldId("budget")}
              name="budget"
              value={values.budget}
              onChange={(event) => updateValue("budget", event.target.value)}
              className={cn(inputClasses, "cursor-pointer appearance-none")}
            >
              <option value="">{labels.select}</option>
              {budgetRanges.map((budgetRange) => (
                <option key={budgetRange} value={budgetRange}>
                  {budgetRange}
                </option>
              ))}
            </select>
          </motion.div>
        </div>
      )}

      <motion.div variants={itemVariants}>
        <label className={labelClasses} htmlFor={getFieldId("message")}>
          {labels.message}
        </label>
        <textarea
          id={getFieldId("message")}
          name="message"
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          className={cn(inputClasses, "min-h-[140px] resize-y py-4 leading-relaxed")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? getFieldId("message-error") : undefined}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }} 
              id={getFieldId("message-error")} 
              className={errorClasses}
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={getFieldId("website")}>Website</label>
        <input
          id={getFieldId("website")}
          name="website"
          value={values.website}
          onChange={(event) => updateValue("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <motion.div variants={itemVariants} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between pt-2">
        <Button 
          type="submit" 
          disabled={status === "loading"} 
          className="h-14 rounded-full bg-black px-8 text-[15px] font-semibold text-white transition-all hover:scale-[1.02] hover:bg-black/90 active:scale-[0.98]"
        >
          {status === "loading" ? (
            <>
              <Loader2 aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
              {labels.sending}
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="mr-2 h-4 w-4" />
              {labels.sendMessage}
            </>
          )}
        </Button>
        
        <AnimatePresence mode="wait">
          {status !== "idle" && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "min-h-6 text-sm font-medium",
                status === "success" && "text-emerald-600",
                status === "error" && "text-red-600"
              )}
              aria-live="polite"
            >
              {statusMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.form>
  );
}
