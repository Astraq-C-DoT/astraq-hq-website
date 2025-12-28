"use client";

import Script from "next/script";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { submitContactForm } from "@/lib/actions/contact";

export function ContactUsSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);

    const result = await submitContactForm(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitStatus({
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
      });
      e.currentTarget.reset();
    } else {
      setSubmitStatus({
        success: false,
        message: result.error ?? "Failed to send message. Please try again.",
      });
    }
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="relative z-10 flex items-center justify-center gap-6 self-stretch border-border border-t border-b px-6 py-12 md:px-24 md:py-12">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="relative h-full w-full">
            {Array.from({ length: 300 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: we don't need a key here
                key={i}
                className="-rotate-45 -left-full absolute h-4 w-[300%] origin-top-left outline-[0.5px] outline-foreground/10 outline-offset-[-0.25px]"
                style={{ top: `${i * 16 - 120}px` }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 flex flex-col md:flex-row w-full items-center justify-center gap-6 overflow-hidden rounded-lg px-6 py-5 md:py-8">
          <div className="flex flex-col items-start justify-start gap-3 self-stretch">
            <div className="flex flex-col justify-center self-stretch font-sans font-semibold text-3xl text-secondary-foreground leading-tight tracking-tight md:text-5xl md:leading-[56px]">
              Get in touch
            </div>
            <div className="self-stretch font-medium font-sans text-base text-muted-foreground leading-7">
              Have questions? We'd love to hear from you.
              <br />
              Send us a message and we'll respond as soon as possible.
            </div>
          </div>
          <div className="flex w-full max-w-[497px] flex-col items-center justify-center gap-6">
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel
                      htmlFor="name"
                      className="font-medium font-sans text-secondary-foreground text-sm leading-6"
                    >
                      Name
                    </FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                      className="border-border bg-card text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-border"
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="email"
                      className="font-medium font-sans text-secondary-foreground text-sm leading-6"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                      className="border-border bg-card text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-border"
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="company"
                      className="font-medium font-sans text-secondary-foreground text-sm leading-6"
                    >
                      Company
                      <FieldDescription className="font-normal font-sans text-muted-foreground text-xs leading-5">
                        Optional
                      </FieldDescription>
                    </FieldLabel>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your company name"
                      disabled={isSubmitting}
                      className="border-border bg-card text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-border"
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="message"
                      className="font-medium font-sans text-secondary-foreground text-sm leading-6"
                    >
                      Message
                    </FieldLabel>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your product or questions..."
                      required
                      disabled={isSubmitting}
                      className="min-h-[120px] resize-none border-border bg-card text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-border"
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              <div
                className="cf-turnstile"
                data-sitekey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                data-appearance="execute"
              />
              {submitStatus && (
                <div
                  className={`font-medium text-sm ${
                    submitStatus.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <div className="flex items-center justify-start gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="default"
                  className="relative h-10 overflow-hidden rounded-full px-12 py-[6px] shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] w-full md:w-auto"
                >
                  <div className="absolute top-0 left-0 h-[41px] w-44 bg-linear-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply" />
                  <div className="relative z-10 flex flex-col justify-center font-medium font-sans text-[13px] text-primary-foreground leading-5">
                    {isSubmitting ? "Sending..." : "Send message"}
                  </div>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
