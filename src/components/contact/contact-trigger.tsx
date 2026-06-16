"use client";

import type { MouseEvent } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useContactModal } from "@/components/contact/contact-provider";

export function ContactTrigger({ children, onClick, ...props }: ButtonProps) {
  const { openContactModal } = useContactModal();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      openContactModal();
    }
  };

  return (
    <Button type="button" onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
