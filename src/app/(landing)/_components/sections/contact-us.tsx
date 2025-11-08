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
        message: result.error || "Failed to send message. Please try again.",
      });
    }
  }

  return (
    <div className="w-full relative overflow-hidden flex flex-col justify-center items-center gap-2">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="self-stretch px-6 md:px-24 py-12 md:py-12 border-t border-b border-border flex justify-center items-center gap-6 relative z-10">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 300 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: we don't need a key here
                key={i}
                className="absolute h-4 -rotate-45 origin-top-left outline-[0.5px] outline-foreground/10 outline-offset-[-0.25px] -left-full w-[300%]"
                style={{ top: `${i * 16 - 120}px` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="w-full px-6 py-5 md:py-8 overflow-hidden rounded-lg flex justify-center items-center gap-6 relative z-20">
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch flex justify-center flex-col text-secondary-foreground text-3xl md:text-5xl font-semibold leading-tight md:leading-[56px] font-sans tracking-tight">
              Get in touch
            </div>
            <div className="self-stretch text-muted-foreground text-base leading-7 font-sans font-medium">
              Have questions? We'd love to hear from you.
              <br />
              Send us a message and we'll respond as soon as possible.
            </div>
          </div>
          <div className="w-full max-w-[497px] flex flex-col justify-center items-center gap-6">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel
                      htmlFor="name"
                      className="text-secondary-foreground text-sm font-medium leading-6 font-sans"
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
                      className="text-secondary-foreground text-sm font-medium leading-6 font-sans"
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
                      className="text-secondary-foreground text-sm font-medium leading-6 font-sans"
                    >
                      Company
                      <FieldDescription className="text-muted-foreground text-xs font-normal leading-5 font-sans">
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
                      className="text-secondary-foreground text-sm font-medium leading-6 font-sans"
                    >
                      Message
                    </FieldLabel>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project or questions..."
                      required
                      disabled={isSubmitting}
                      className="min-h-[120px] border-border bg-card text-secondary-foreground placeholder:text-muted-foreground focus-visible:ring-border resize-none"
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
                  className={`text-sm font-medium ${
                    submitStatus.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              <div className="flex justify-start items-center gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="default"
                  className="h-10 px-12 py-[6px] relative shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] overflow-hidden rounded-full"
                >
                  <div className="w-44 h-[41px] absolute left-0 top-0 bg-linear-to-b from-[rgba(255,255,255,0)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                  <div className="flex flex-col justify-center text-primary-foreground text-[13px] font-medium leading-5 font-sans relative z-10">
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
