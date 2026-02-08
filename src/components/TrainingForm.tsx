import { useState } from "react";
import { Send, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

const experienceLevels = ["Beginner", "Intermediate"];
const trainingOptions = ["Daily $400", "Weekly $1,800", "Monthly $6,800"];

export default function TrainingForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", experience: "", option: "", message: "",
  });

  const steps = [
    { label: "Name", field: "name", placeholder: "Your full name", type: "text" },
    { label: "Phone", field: "phone", placeholder: "+1 (___) ___-____", type: "tel" },
    { label: "Email", field: "email", placeholder: "you@email.com", type: "email" },
    { label: "Experience Level", field: "experience", type: "select", options: experienceLevels },
    { label: "Training Option", field: "option", type: "select", options: trainingOptions },
    { label: "Message (optional)", field: "message", placeholder: "Any questions or details...", type: "textarea" },
  ];

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2 font-heading">Training Inquiry Sent!</h3>
        <p className="text-muted-foreground">We'll be in touch about your PDR training.</p>
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

      <p className="text-xs text-muted-foreground mb-2">Step {step + 1} of {steps.length}</p>
      <label className="block text-lg font-bold text-foreground mb-4 font-heading">{currentStep.label}</label>

      {currentStep.type === "select" ? (
        <div className="grid grid-cols-1 gap-2 mb-6">
          {currentStep.options!.map((opt) => (
            <button
              key={opt}
              onClick={() => setForm({ ...form, [currentStep.field]: opt })}
              className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors text-left ${form[currentStep.field as keyof typeof form] === opt ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary"}`}
            >
              {opt}
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
          <button onClick={() => setSubmitted(true)} className="btn-primary text-sm ml-auto">
            <Send className="w-4 h-4" /> Learn PDR
          </button>
        )}
      </div>
    </div>
  );
}
