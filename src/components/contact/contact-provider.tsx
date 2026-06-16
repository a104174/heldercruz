"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ContactModal } from "@/components/contact/contact-modal";

type ContactContextValue = {
  openContactModal: () => void;
  closeContactModal: () => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openContactModal = useCallback(() => setOpen(true), []);
  const closeContactModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      openContactModal,
      closeContactModal
    }),
    [closeContactModal, openContactModal]
  );

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactModal open={open} onClose={closeContactModal} />
    </ContactContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error("useContactModal must be used inside ContactProvider.");
  }

  return context;
}
