"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { SubmitError, submitForm } from "@/lib/api/public-client";
import {
  bookingFormSchema,
  timeSlotOptions,
  type BookingFormData,
} from "@/lib/validation/schemas";

/** Only the fields the picker needs, so the whole service document isn't shipped. */
export interface BookingServiceOption {
  slug: string;
  name: string;
}

const initialState: BookingFormData = {
  serviceSlug: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  message: "",
};

function resolveInitialServiceSlug(
  serviceParam: string | null,
  services: BookingServiceOption[],
): string {
  if (serviceParam && services.some((s) => s.slug === serviceParam)) {
    return serviceParam;
  }
  return "";
}

function BookingFormFields({
  initialServiceSlug,
  services,
}: {
  initialServiceSlug: string;
  services: BookingServiceOption[];
}) {
  const [form, setForm] = useState<BookingFormData>({
    ...initialState,
    serviceSlug: initialServiceSlug,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const serviceOptions = services.map((s) => ({
    value: s.slug,
    label: s.name,
  }));

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = bookingFormSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof BookingFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await submitForm("/api/bookings", result.data);

      toast.success("Booking request submitted", {
        description: "We'll confirm your appointment shortly.",
      });
      setForm(initialState);
      setErrors({});
      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof SubmitError
          ? error.message
          : "Something went wrong. Please try again.";

      if (error instanceof SubmitError) {
        setErrors(error.details as Partial<Record<keyof BookingFormData, string>>);
      }

      toast.error("Booking request failed", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-green-900">
          Booking Request Received
        </h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for your booking request. Our team will contact you to
          confirm your appointment details.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          Book Another Service
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
          Service Details
        </h3>
        <Select
          name="serviceSlug"
          label="Service"
          placeholder="Select a service"
          options={serviceOptions}
          value={form.serviceSlug}
          onChange={(e) => handleChange("serviceSlug", e.target.value)}
          error={errors.serviceSlug}
          required
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            name="date"
            type="date"
            label="Preferred Date"
            min={today}
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            error={errors.date}
            required
          />
          <Select
            name="time"
            label="Preferred Time"
            placeholder="Select a time"
            options={timeSlotOptions.map((t) => ({
              value: t.value,
              label: t.label,
            }))}
            value={form.time}
            onChange={(e) => handleChange("time", e.target.value)}
            error={errors.time}
            required
          />
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
          Your Information
        </h3>
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
        <Input
          name="phone"
          type="tel"
          label="Phone"
          placeholder="(519) 242-0900"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          error={errors.phone}
          required
        />
      </div>

      <div className="space-y-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted">
          Vehicle Information
        </h3>
        <div className="grid gap-5 sm:grid-cols-3">
          <Input
            name="vehicleMake"
            label="Make"
            placeholder="Toyota"
            value={form.vehicleMake}
            onChange={(e) => handleChange("vehicleMake", e.target.value)}
            error={errors.vehicleMake}
            required
          />
          <Input
            name="vehicleModel"
            label="Model"
            placeholder="Camry"
            value={form.vehicleModel}
            onChange={(e) => handleChange("vehicleModel", e.target.value)}
            error={errors.vehicleModel}
            required
          />
          <Input
            name="vehicleYear"
            label="Year"
            placeholder="2020"
            maxLength={4}
            value={form.vehicleYear}
            onChange={(e) => handleChange("vehicleYear", e.target.value)}
            error={errors.vehicleYear}
            required
          />
        </div>
      </div>

      <Textarea
        name="message"
        label="Additional Message (optional)"
        placeholder="Any specific concerns or requests..."
        rows={4}
        value={form.message ?? ""}
        onChange={(e) => handleChange("message", e.target.value)}
      />

      <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full sm:w-auto">
        Submit Booking Request
      </Button>
    </form>
  );
}

interface BookingFormProps {
  /** Active services, read from MongoDB by the page that renders the form. */
  services: BookingServiceOption[];
}

export function BookingForm({ services }: BookingFormProps) {
  const searchParams = useSearchParams();
  const initialServiceSlug = resolveInitialServiceSlug(
    searchParams.get("service"),
    services,
  );

  return (
    <BookingFormFields
      initialServiceSlug={initialServiceSlug}
      services={services}
    />
  );
}
