"use client";

import { useLang } from "@/context/LanguageContext";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");

      // Aquí iría la llamada real a tu API o Formspree.
      // Por ahora solo simulamos un delay:
      await new Promise((res) => setTimeout(res, 900));

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-12 col-md-6">
        <label htmlFor="name" className="form-label">
          {t.contact.formName}
        </label>
        <input
          id="name"
          name="name"
          className="form-control"
          value={form.name}
          onChange={onChange}
          required
        />
      </div>

      <div className="col-12 col-md-6">
        <label htmlFor="email" className="form-label">
          {t.contact.formEmail}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          value={form.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="col-12">
        <label htmlFor="message" className="form-label">
          {t.contact.formMessage}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="form-control"
          value={form.message}
          onChange={onChange}
          required
        />
      </div>

      <div className="col-12 d-flex align-items-center gap-3">
        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          disabled={status === "sending"}
        >
          {status === "sending" ? t.contact.formSending : t.contact.formSubmit}
        </button>

        {status === "success" && (
          <span className="text-success small">{t.contact.formSuccess}</span>
        )}
        {status === "error" && (
          <span className="text-danger small">{t.contact.formError}</span>
        )}
      </div>
    </form>
  );
}
