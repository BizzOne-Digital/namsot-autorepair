"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { SubmitError, submitForm } from "@/lib/api/public-client";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validation/schemas";

const initialState: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    field: keyof ContactFormData,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = contactFormSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await submitForm("/api/contact", result.data);

      toast.success("Message sent successfully", {
        description: "We'll get back to you within one business day.",
      });
      setForm(initialState);
      setErrors({});
    } catch (error) {
      const message =
        error instanceof SubmitError
          ? error.message
          : "Something went wrong. Please try again.";

      if (error instanceof SubmitError) {
        setErrors(error.details as Partial<Record<keyof ContactFormData, string>>);
      }

      toast.error("Message not sent", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="name"
          label="Full Name"
          placeholder="John Smith"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
          required
        />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="phone"
          type="tel"
          label="Phone (optional)"
          placeholder="(519) 242-0900"
          value={form.phone ?? ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          error={errors.phone}
        />
        <Input
          name="subject"
          label="Subject"
          placeholder="Service inquiry"
          value={form.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          error={errors.subject}
          required
        />
      </div>

      <Textarea
        name="message"
        label="Message"
        placeholder="Tell us about your vehicle or the service you need..."
        rows={5}
        value={form.message}
        onChange={(e) => handleChange("message", e.target.value)}
        error={errors.message}
        required
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
