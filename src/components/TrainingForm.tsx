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

export default function TrainingForm() {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", experience: "", option: "", message: "",
  });

  const steps = [
    { label: t("Name", "Nombre"), field: "name", placeholder: t("Your full name", "Su nombre completo"), type: "text" },
    { label: t("Phone", "Teléfono"), field: "phone", placeholder: "+1 (___) ___-____", type: "tel" },
    { label: t("Email", "Correo"), field: "email", placeholder: "you@email.com", type: "email" },
    { label: t("Experience Level", "Nivel de Experiencia"), field: "experience", type: "select", options: lang === "es" ? experienceLevels.es : experienceLevels.en, enOptions: experienceLevels.en },
    { label: t("Training Option", "Opción de Entrenamiento"), field: "option", type: "select", options: lang === "es" ? trainingOptions.es : trainingOptions.en, enOptions: trainingOptions.en },
    { label: t("Message (optional)", "Mensaje (opcional)"), field: "message", placeholder: t("Any questions or details...", "Preguntas o detalles..."), type: "textarea" },
  ];

  const handleSubmit = async () => {
    setSending(true);
    await submitForm({ ...form, formType: "training", lang });
    setSending(false);
    setSubmitted(true);
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

  const currentStep = steps[step];
  const val = form[currentStep.field as keyof typeof form];

  return (
    <div className="card-elevated max-w-lg mx-auto">
      <div className="flex gap-1 mb-6">
        {steps.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-2">
        {t(`Step ${step + 1} of ${steps.length}`, `Paso ${step + 1} de ${steps.length}`)}
      </p>
      <label className="block text-lg font-bold text-foreground mb-4 font-heading">{currentStep.label}</label>

      {currentStep.type === "select" ? (
        <div className="grid grid-cols-1 gap-2 mb-6">
          {currentStep.options!.map((opt, idx) => {
            const enVal = currentStep.enOptions ? currentStep.enOptions[idx] : opt;
            return (
              <button
                key={enVal}
                onClick={() => setForm({ ...form, [currentStep.field]: enVal })}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors text-left ${form[currentStep.field as keyof typeof form] === enVal ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary"}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      ) : currentStep.type === "textarea" ? (
        <textarea
          value={val}
          onChange={(e) => setForm({ ...form, [currentStep.field]: e.target.value })}
          placeholder={currentStep.placeholder}
          rows={3}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-6"
        />
      ) : (
        <input
          type={currentStep.type}
          value={val}
          onChange={(e) => setForm({ ...form, [currentStep.field]: e.target.value })}
          placeholder={currentStep.placeholder}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-6"
        />
      )}

      <div className="flex justify-between gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="btn-secondary text-sm">
            <ArrowLeft className="w-4 h-4" /> {t("Back", "Atrás")}
          </button>
        )}
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)} className="btn-primary text-sm ml-auto">
            {t("Next", "Siguiente")} <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={sending} className="btn-primary text-sm ml-auto">
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {t("Learn PDR", "Aprende PDR")}
          </button>
        )}
      </div>
    </div>
  );
}
