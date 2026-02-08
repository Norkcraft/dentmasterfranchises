import { useState } from "react";
import { Send, ArrowRight, ArrowLeft, Upload, CheckCircle } from "lucide-react";

interface QuoteFormProps {
  compact?: boolean;
}

const damageTypes = ["Hail", "Door Ding", "Fender", "Collision", "Other"];

export default function QuoteForm({ compact }: QuoteFormProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", make: "", model: "",
    damageType: "", description: "",
  });

  const steps = [
    { label: "Name", field: "name", placeholder: "Your full name", type: "text" },
    { label: "Phone", field: "phone", placeholder: "+1 (___) ___-____", type: "tel" },
    { label: "Email", field: "email", placeholder: "you@email.com", type: "email" },
    { label: "City", field: "city", placeholder: "e.g. Orlando, FL", type: "text" },
    { label: "Vehicle Make", field: "make", placeholder: "e.g. Toyota", type: "text" },
    { label: "Vehicle Model", field: "model", placeholder: "e.g. Camry", type: "text" },
    { label: "Damage Type", field: "damageType", type: "select" },
    { label: "Damage Description", field: "description", placeholder: "Describe the damage...", type: "textarea" },
  ];

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2 font-heading">Quote Request Sent!</h3>
        <p className="text-muted-foreground">We'll review your request and get back to you shortly.</p>
      </div>
    );
  }

  const currentStep = steps[step];
  const val = form[currentStep.field as keyof typeof form];

  return (
    <div className={compact ? "" : "card-elevated max-w-lg mx-auto"}>
      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {steps.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-2">Step {step + 1} of {steps.length}</p>
      <label className="block text-lg font-bold text-foreground mb-4 font-heading">{currentStep.label}</label>

      {currentStep.type === "select" ? (
        <div className="grid grid-cols-2 gap-2 mb-6">
          {damageTypes.map((t) => (
            <button
              key={t}
              onClick={() => setForm({ ...form, damageType: t })}
              className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${form.damageType === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary"}`}
            >
              {t}
            </button>
          ))}
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
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)} className="btn-primary text-sm ml-auto">
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn-primary text-sm ml-auto">
            <Send className="w-4 h-4" /> Get Instant Quote
          </button>
        )}
      </div>
    </div>
  );
}
