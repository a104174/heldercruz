"use client";

import { Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  className?: string;
  onSuccess?: () => void;
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

function validate(values: ContactState) {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Add your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Add a valid email.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Write at least 20 characters.";
  }

  return errors;
}

export function ContactForm({ className, onSuccess }: ContactFormProps) {
  const [values, setValues] = useState<ContactState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const updateValue = (field: keyof ContactState, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setStatusMessage("Please check the highlighted fields.");
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
        setStatusMessage(result.message || "Could not send the message.");
        return;
      }

      setValues(initialState);
      setErrors({});
      setStatus("success");
      setStatusMessage(result.message || "Message sent.");
      onSuccess?.();
    } catch {
      setStatus("error");
      setStatusMessage("Could not send the message. Please try again later.");
    }
  };

  const inputClasses =
    "h-12 w-full rounded-lg border border-line bg-white px-4 text-sm text-ink transition placeholder:text-neutral-400 focus:border-ink focus:outline-none";
  const labelClasses = "text-sm font-semibold text-ink";
  const errorClasses = "mt-2 text-sm text-red-700";

  return (
    <form className={cn("space-y-5", className)} onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            className={inputClasses}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className={errorClasses}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className={labelClasses} htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            className={inputClasses}
            autoComplete="email"
            inputMode="email"
            type="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className={errorClasses}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={labelClasses} htmlFor="contact-company">
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            value={values.company}
            onChange={(event) => updateValue("company", event.target.value)}
            className={inputClasses}
            autoComplete="organization"
          />
        </div>
        <div>
          <label className={labelClasses} htmlFor="contact-project-type">
            Project type
          </label>
          <select
            id="contact-project-type"
            name="projectType"
            value={values.projectType}
            onChange={(event) => updateValue("projectType", event.target.value)}
            className={inputClasses}
          >
            <option value="">Select</option>
            {projectTypes.map((projectType) => (
              <option key={projectType} value={projectType}>
                {projectType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses} htmlFor="contact-budget">
            Budget
          </label>
          <select
            id="contact-budget"
            name="budget"
            value={values.budget}
            onChange={(event) => updateValue("budget", event.target.value)}
            className={inputClasses}
          >
            <option value="">Select</option>
            {budgetRanges.map((budgetRange) => (
              <option key={budgetRange} value={budgetRange}>
                {budgetRange}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          className={cn(inputClasses, "min-h-36 resize-y py-3 leading-6")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className={errorClasses}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          value={values.website}
          onChange={(event) => updateValue("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="h-4 w-4" />
              Send message
            </>
          )}
        </Button>
        <p
          className={cn(
            "min-h-6 text-sm",
            status === "success" && "text-green-700",
            status === "error" && "text-red-700",
            status === "idle" && "text-muted"
          )}
          aria-live="polite"
        >
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
