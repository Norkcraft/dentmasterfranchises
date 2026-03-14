import { useState } from "react";
import { Send, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { submitForm } from "@/lib/submitForm";

const experienceLevels = {
  en: ["Beginner", "Intermediate"],
  es: ["Principiante", "Intermedio"],
};
const trainingOptions = {
  en: ["Daily $400", "Weekly $1,800", "Monthly $6,800"],
  es: ["Diario $400", "Semanal $1,800", "Mensual $6,800"],
};
const timeframes = {
  en: ["ASAP", "2–4 weeks", "1–3 months", "Not sure"],
  es: ["Lo antes posible", "2–4 semanas", "1–3 meses", "No estoy seguro"],
};

export default function TrainingForm() {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    experienceLevel: "", trainingOption: "", startTimeframe: "",
    message: "",
  });
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (!form.fullName.trim()) errs.fullName = t("Name is required", "El nombre es obligatorio");
      if (!form.phone.trim()) errs.phone = t("Phone is required", "El teléfono es obligatorio");
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = t("Valid email is required", "Se requiere un correo válido");
    } else if (s === 1) {
      if (!form.experienceLevel) errs.experienceLevel = t("Select your level", "Seleccione su nivel");
      if (!form.trainingOption) errs.trainingOption = t("Select an option", "Seleccione una opción");
      if (!form.startTimeframe) errs.startTimeframe = t("Select a timeframe", "Seleccione un plazo");
    }
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => { if (validateStep(step)) setStep(step + 1); };
  const prevStep = () => { setStepErrors({}); setStep(step - 1); };

  const handleSubmit = async () => {
    setSending(true);
    setError("");
    try {
      const res = await submitForm({
        formType: "training",
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        experienceLevel: form.experienceLevel,
        trainingOption: form.trainingOption,
        startTimeframe: form.startTimeframe,
        message: form.message,
      });
      if (!res.ok) {
        setError(t("Submission failed. Please try again or call us directly.", "Error al enviar. Intente de nuevo o llámenos directamente."));
        setSending(false);
        return;
      }
      setSending(false);
      setSubmitted(true);
    } catch {
      setError(t("Submission failed. Please try again or call us directly.", "Error al enviar. Intente de nuevo o llámenos directamente."));
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2 font-heading">
          {t("Training Inquiry Sent!", "¡Consulta de Entrenamiento Enviada!")}
        </h3>
        <p className="text-muted-foreground">
          {t("We'll be in touch about your PDR training.", "Nos pondremos en contacto sobre su entrenamiento PDR.")}
        </p>
      </div>
    );
  }

  const inputCls = "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";
  const errCls = "text-xs text-destructive mt-1";

  const stepLabels = [
    t("Contact Information", "Información de Contacto"),
    t("Training Selection", "Selección de Entrenamiento"),
    t("Additional Message", "Mensaje Adicional"),
  ];

  const selectBtn = (value: string, enValue: string, field: keyof typeof form) => (
    <button
      key={enValue}
      type="button"
      onClick={() => { setForm({ ...form, [field]: enValue }); setStepErrors(e => { const n = { ...e }; delete n[field]; return n; }); }}
      className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors text-left ${form[field] === enValue ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary"}`}
    >
      {value}
    </button>
  );

  return (
    <div className="card-elevated max-w-lg mx-auto">
      <div className="flex gap-1 mb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-1">
        {t(`Step ${step + 1} of 3`, `Paso ${step + 1} de 3`)}
      </p>
      <h3 className="text-lg font-bold text-foreground mb-4 font-heading">{stepLabels[step]}</h3>

      {/* Step 1: Contact */}
      {step === 0 && (
        <div className="space-y-3 mb-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">{t("Full Name", "Nombre Completo")} *</label>
            <input type="text" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder={t("Your full name", "Su nombre completo")} className={inputCls} />
            {stepErrors.fullName && <p className={errCls}>{stepErrors.fullName}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">{t("Phone", "Teléfono")} *</label>
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 (___) ___-____" className={inputCls} />
            {stepErrors.phone && <p className={errCls}>{stepErrors.phone}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">{t("Email", "Correo Electrónico")} *</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className={inputCls} />
            {stepErrors.email && <p className={errCls}>{stepErrors.email}</p>}
          </div>
        </div>
      )}

      {/* Step 2: Training Selection */}
      {step === 1 && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("Experience Level", "Nivel de Experiencia")} *</label>
            <div className="grid grid-cols-2 gap-2">
              {(lang === "es" ? experienceLevels.es : experienceLevels.en).map((opt, i) => selectBtn(opt, experienceLevels.en[i], "experienceLevel"))}
            </div>
            {stepErrors.experienceLevel && <p className={errCls}>{stepErrors.experienceLevel}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("Training Option", "Opción de Entrenamiento")} *</label>
            <div className="grid grid-cols-1 gap-2">
              {(lang === "es" ? trainingOptions.es : trainingOptions.en).map((opt, i) => selectBtn(opt, trainingOptions.en[i], "trainingOption"))}
            </div>
            {stepErrors.trainingOption && <p className={errCls}>{stepErrors.trainingOption}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("Start Timeframe", "Plazo de Inicio")} *</label>
            <div className="grid grid-cols-2 gap-2">
              {(lang === "es" ? timeframes.es : timeframes.en).map((opt, i) => selectBtn(opt, timeframes.en[i], "startTimeframe"))}
            </div>
            {stepErrors.startTimeframe && <p className={errCls}>{stepErrors.startTimeframe}</p>}
          </div>
        </div>
      )}

      {/* Step 3: Message */}
      {step === 2 && (
        <div className="space-y-3 mb-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">{t("Message (optional)", "Mensaje (opcional)")}</label>
            <textarea
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder={t("Any questions or details...", "Preguntas o detalles...")}
              rows={4}
              className={inputCls}
            />
          </div>
        </div>
      )}

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      <div className="flex justify-between gap-3">
        {step > 0 && (
          <button type="button" onClick={prevStep} className="btn-secondary text-sm">
            <ArrowLeft className="w-4 h-4" /> {t("Back", "Atrás")}
          </button>
        )}
        {step < 2 ? (
          <button type="button" onClick={nextStep} className="btn-primary text-sm ml-auto">
            {t("Next", "Siguiente")} <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} disabled={sending} className="btn-primary text-sm ml-auto">
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {t("Submit", "Enviar")}
          </button>
        )}
      </div>
    </div>
  );
}
