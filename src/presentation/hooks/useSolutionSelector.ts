"use client";

import { useState } from "react";
import { container } from "@/infrastructure/container";
import { ContactMessage, ContactSubmissionResult } from "@/core/domain/entities/contact";

export function useSolutionSelector() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: "",
    contact: "",
    service: "clases",
    detail: "",
    _honeypot: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ContactSubmissionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setService = (service: ContactMessage["service"]) => {
    setFormData((prev) => ({ ...prev, service }));
  };

  const updateField = (field: keyof ContactMessage, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await container.sendContactUseCase.execute(formData);
      if (res.success) {
        setResult(res);
      } else {
        setError(res.message);
      }
    } catch {
      setError("Ocurrió un error inesperado al procesar la solicitud. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      contact: "",
      service: "clases",
      detail: "",
      _honeypot: "",
    });
    setResult(null);
    setError(null);
  };

  return {
    formData,
    setService,
    updateField,
    submitForm,
    resetForm,
    isSubmitting,
    result,
    error,
  };
}
