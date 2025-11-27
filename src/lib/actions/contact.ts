"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { Resend } from "resend";
import ContactUs from "@/components/email-templates/contact-us";
import { env } from "@/env";

type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  message: string;
  "cf-turnstile-response": string;
};

type ContactFormResult = {
  success: boolean;
  error?: string;
};

const resend = new Resend(env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  try {
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) ?? undefined,
      message: formData.get("message") as string,
      "cf-turnstile-response": formData.get("cf-turnstile-response") as string,
    };

    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      };
    }

    if (!data["cf-turnstile-response"]) {
      return {
        success: false,
        error: "Please complete the security verification.",
      };
    }

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: data["cf-turnstile-response"],
        }),
      },
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return {
        success: false,
        error: "Security verification failed. Please try again.",
      };
    }

    // TODO: Process the contact form submission (e.g., send email, save to database)
    // For now, we'll just return success
    // You can integrate with your email service (Resend) or database here

    const payload = await getPayload({ config });

    await payload.create({
      collection: "submissions",
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
      },
    });

    const company = await payload.findGlobal({
      slug: "company",
    });

    await resend.emails.send({
      from: "noreply@astraqcyberdefence.com",
      to: data.email,
      subject: "Thank you for contacting Astraq Cyber Defence",
      react: ContactUs({
        name: data.name,
        companyName: company.name,
        siteUrl: env.APP_URL,
        supportEmail: company.email ?? "",
        supportPhone: company.phone ?? undefined,
      }),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      error: "An error occurred. Please try again later.",
    };
  }
}
