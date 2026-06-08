"use client";

import { useState, useEffect } from "react";

export default function FormFactory({
  schema,
  fields,
  initialData,
  onSubmit,
  styles,
}) {
  const [form, setForm] = useState(initialData || {});
  const [error, setError] = useState("");
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      const messages = parsed.error.issues.map((issue) => issue.message);
      setErrorFields(parsed.error.issues.map((issue) => issue.path[0]));
      setError(messages.join(", "));
      return;
    }

    setError("");
    setErrorFields([]);
    await onSubmit(parsed.data);
  };

  const getInputClassName = (fieldName) => {
    const baseStyle = styles?.input || "";
    const errorStyle = errorFields.includes(fieldName)
      ? ` ${styles?.errorField || ""}`
      : "";
    return `${baseStyle}${errorStyle}`.trim();
  };

  return (
    <form onSubmit={handleSubmit} className={styles?.form}>
      {fields.map((field) =>
        field.type === "textarea" ? (
          <textarea
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            className={getInputClassName(field.name)}
          />
        ) : (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            className={getInputClassName(field.name)}
          />
        ),
      )}

      {error && <p className={styles?.error}>{error}</p>}

      <button type="submit" className={styles?.button}>
        {initialData?._id ? "Обновить" : "Сохранить"}
      </button>
    </form>
  );
}
