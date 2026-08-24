"use client";

import { useState } from "react";
import { contactServices } from "@/lib/contact";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full border border-gold-border bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, service, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setService("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold-border bg-white p-8 text-center md:p-12">
        <p className="text-xs uppercase tracking-wider text-gold">Message sent</p>
        <h2 className="mt-3 font-display text-3xl">Thank you for reaching out</h2>
        <p className="mt-4 text-muted-text">
          Your inquiry has been sent. Jasmeet will review it and contact you on WhatsApp or phone shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 border border-gold px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold/10"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-gold-border bg-white p-6 md:p-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gold">Contact form</p>
        <h2 className="mt-2 font-display text-3xl">Send an inquiry</h2>
        <p className="mt-2 text-sm text-muted-text">
          Fill in your details and the message will be sent directly to Jasmeet by email, including your WhatsApp number.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="contact-name" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
            Full name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
            Phone / WhatsApp *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="647-555-1234"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
            Email <span className="normal-case text-muted-text/70">(optional)</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-service" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
            Service *
          </label>
          <select
            id="contact-service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClass}
          >
            <option value="">Select a service</option>
            {contactServices.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-1 block text-xs uppercase tracking-wider text-muted-text">
            Message *
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={cn(inputClass, "resize-y")}
            placeholder="Tell us about your goals, timeline, or property details..."
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full bg-black px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
