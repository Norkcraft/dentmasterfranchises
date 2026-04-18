import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { Send, ArrowRight, ArrowLeft, CheckCircle, Loader2, Upload, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { submitForm, fileToBase64Object } from "@/lib/submitForm";

interface QuoteFormProps {
  compact?: boolean;
}

const damageTypes = {
  en: ["Hail", "Door Ding", "Fender", "Collision", "Other"],
  es: ["Granizo", "Golpe de Puerta", "Guardafango", "Colisión", "Otro"],
};

export default function QuoteForm({ compact }: QuoteFormProps) {
  const { t, lang } = useLanguage();
  const uid = useId();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", city: "",
    vehicleYear: "", vehicleMake: "", vehicleModel: "",
    damageType: "", damageDescription: "",
  });

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (photos.length === 0) {
      setPhotoPreviews([]);
      return;
    }
    const urls = photos.map((p) => URL.createObjectURL(p));
    setPhotoPreviews(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [photos]);

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (!form.fullName.trim()) errs.fullName = t("Name is required", "El nombre es obligatorio");
      if (!form.phone.trim()) errs.phone = t("Phone is required", "El teléfono es obligatorio");
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = t("Valid email is required", "Se requiere un correo válido");
    } else if (s === 1) {
      if (!form.city.trim()) errs.city = t("City is required", "La ciudad es obligatoria");
      if (!form.vehicleYear.trim()) errs.vehicleYear = t("Year is required", "El año es obligatorio");
      if (!form.vehicleMake.trim()) errs.vehicleMake = t("Make is required", "La marca es obligatoria");
      if (!form.vehicleModel.trim()) errs.vehicleModel = t("Model is required", "El modelo es obligatorio");
    } else if (s === 2) {
      if (!form.damageType) errs.damageType = t("Select damage type", "Seleccione el tipo de daño");
      if (!form.damageDescription.trim()) errs.damageDescription = t("Describe the damage", "Describa el daño");
    }
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => { if (validateStep(step)) setStep(step + 1); };
  const prevStep = () => { setStepErrors({}); setStep(step - 1); };

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPhotos(prev => [...prev, ...Array.from(e.target.files!)].slice(0, 5));
  };
  const removePhoto = (i: number) => setPhotos(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    setSending(true);
    setError("");
    try {
      const photoData: Awaited<ReturnType<typeof fileToBase64Object>>[] = [];
      for (const p of photos) {
        photoData.push(await fileToBase64Object(p));
      }
      const payload: Record<string, unknown> = {
        formType: "quote",
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        city: form.city,
        vehicleYear: form.vehicleYear,
        vehicleMake: form.vehicleMake,
        vehicleModel: form.vehicleModel,
        damageType: form.damageType,
        damageDescription: form.damageDescription,
        photos: photoData,
      };
      const res = await submitForm(payload);
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
          {t("Quote Request Sent!", "¡Solicitud de Cotización Enviada!")}
        </h3>
        <p className="text-muted-foreground">
          {t("We'll review your request and get back to you shortly.", "Revisaremos su solicitud y le responderemos pronto.")}
        </p>
      </div>
    );
  }

  const inputCls = "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary";
  const errCls = "text-xs text-destructive mt-1";
  const types = lang === "es" ? damageTypes.es : damageTypes.en;

  const fullNameId = `${uid}-fullName`;
  const phoneId = `${uid}-phone`;
  const emailId = `${uid}-email`;
  const cityId = `${uid}-city`;
  const vehicleYearId = `${uid}-vehicleYear`;
  const vehicleMakeId = `${uid}-vehicleMake`;
  const vehicleModelId = `${uid}-vehicleModel`;
  const damageDescriptionId = `${uid}-damageDescription`;
  const photosId = `${uid}-photos`;

  const stepLabels = [
    t("Contact Information", "Información de Contacto"),
    t("Vehicle & Location", "Vehículo y Ubicación"),
    t("Damage & Photos", "Daño y Fotos"),
  ];

  return (
    <div className={compact ? "" : "card-elevated max-w-lg mx-auto"}>
      {/* Progress */}
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
            <label htmlFor={fullNameId} className="text-sm font-medium text-foreground mb-1 block">{t("Full Name", "Nombre Completo")} *</label>
            <input
              id={fullNameId}
              type="text"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
              placeholder={t("Your full name", "Su nombre completo")}
              className={inputCls}
              aria-invalid={Boolean(stepErrors.fullName)}
              aria-describedby={stepErrors.fullName ? `${fullNameId}-error` : undefined}
              autoComplete="name"
            />
            {stepErrors.fullName && <p id={`${fullNameId}-error`} className={errCls}>{stepErrors.fullName}</p>}
          </div>
          <div>
            <label htmlFor={phoneId} className="text-sm font-medium text-foreground mb-1 block">{t("Phone", "Teléfono")} *</label>
            <input
              id={phoneId}
              type="tel"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 (___) ___-____"
              className={inputCls}
              aria-invalid={Boolean(stepErrors.phone)}
              aria-describedby={stepErrors.phone ? `${phoneId}-error` : undefined}
              autoComplete="tel"
            />
            {stepErrors.phone && <p id={`${phoneId}-error`} className={errCls}>{stepErrors.phone}</p>}
          </div>
          <div>
            <label htmlFor={emailId} className="text-sm font-medium text-foreground mb-1 block">{t("Email", "Correo Electrónico")} *</label>
            <input
              id={emailId}
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@email.com"
              className={inputCls}
              aria-invalid={Boolean(stepErrors.email)}
              aria-describedby={stepErrors.email ? `${emailId}-error` : undefined}
              autoComplete="email"
            />
            {stepErrors.email && <p id={`${emailId}-error`} className={errCls}>{stepErrors.email}</p>}
          </div>
        </div>
      )}

      {/* Step 2: Vehicle + Location */}
      {step === 1 && (
        <div className="space-y-3 mb-6">
          <div>
            <label htmlFor={cityId} className="text-sm font-medium text-foreground mb-1 block">{t("City", "Ciudad")} *</label>
            <input
              id={cityId}
              type="text"
              value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })}
              placeholder={t("e.g. Orlando, FL", "ej. Orlando, FL")}
              className={inputCls}
              aria-invalid={Boolean(stepErrors.city)}
              aria-describedby={stepErrors.city ? `${cityId}-error` : undefined}
              autoComplete="address-level2"
            />
            {stepErrors.city && <p id={`${cityId}-error`} className={errCls}>{stepErrors.city}</p>}
          </div>
          <div>
            <label htmlFor={vehicleYearId} className="text-sm font-medium text-foreground mb-1 block">{t("Vehicle Year", "Año del Vehículo")} *</label>
            <input
              id={vehicleYearId}
              type="text"
              value={form.vehicleYear}
              onChange={e => setForm({ ...form, vehicleYear: e.target.value })}
              placeholder={t("e.g. 2022", "ej. 2022")}
              className={inputCls}
              aria-invalid={Boolean(stepErrors.vehicleYear)}
              aria-describedby={stepErrors.vehicleYear ? `${vehicleYearId}-error` : undefined}
            />
            {stepErrors.vehicleYear && <p id={`${vehicleYearId}-error`} className={errCls}>{stepErrors.vehicleYear}</p>}
          </div>
          <div>
            <label htmlFor={vehicleMakeId} className="text-sm font-medium text-foreground mb-1 block">{t("Vehicle Make", "Marca del Vehículo")} *</label>
            <input
              id={vehicleMakeId}
              type="text"
              value={form.vehicleMake}
              onChange={e => setForm({ ...form, vehicleMake: e.target.value })}
              placeholder={t("e.g. Toyota", "ej. Toyota")}
              className={inputCls}
              aria-invalid={Boolean(stepErrors.vehicleMake)}
              aria-describedby={stepErrors.vehicleMake ? `${vehicleMakeId}-error` : undefined}
            />
            {stepErrors.vehicleMake && <p id={`${vehicleMakeId}-error`} className={errCls}>{stepErrors.vehicleMake}</p>}
          </div>
          <div>
            <label htmlFor={vehicleModelId} className="text-sm font-medium text-foreground mb-1 block">{t("Vehicle Model", "Modelo del Vehículo")} *</label>
            <input
              id={vehicleModelId}
              type="text"
              value={form.vehicleModel}
              onChange={e => setForm({ ...form, vehicleModel: e.target.value })}
              placeholder={t("e.g. Camry", "ej. Camry")}
              className={inputCls}
              aria-invalid={Boolean(stepErrors.vehicleModel)}
              aria-describedby={stepErrors.vehicleModel ? `${vehicleModelId}-error` : undefined}
            />
            {stepErrors.vehicleModel && <p id={`${vehicleModelId}-error`} className={errCls}>{stepErrors.vehicleModel}</p>}
          </div>
        </div>
      )}

      {/* Step 3: Damage + Upload */}
      {step === 2 && (
        <div className="space-y-3 mb-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">{t("Damage Type", "Tipo de Daño")} *</label>
            <div className="grid grid-cols-2 gap-2">
              {damageTypes.en.map((enVal, idx) => {
                const typeName = types[idx] ?? enVal;
                return (
                  <button
                    key={enVal}
                    type="button"
                    onClick={() => { setForm({ ...form, damageType: enVal }); setStepErrors(e => { const n = { ...e }; delete n.damageType; return n; }); }}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${form.damageType === enVal ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary"}`}
                  >
                    {typeName}
                  </button>
                );
              })}
            </div>
            {stepErrors.damageType && <p className={errCls}>{stepErrors.damageType}</p>}
          </div>
          <div>
            <label htmlFor={damageDescriptionId} className="text-sm font-medium text-foreground mb-1 block">{t("Damage Description", "Descripción del Daño")} *</label>
            <textarea
              id={damageDescriptionId}
              value={form.damageDescription}
              onChange={e => setForm({ ...form, damageDescription: e.target.value })}
              placeholder={t("Describe the damage...", "Describa el daño...")}
              rows={3}
              className={inputCls}
              aria-invalid={Boolean(stepErrors.damageDescription)}
              aria-describedby={stepErrors.damageDescription ? `${damageDescriptionId}-error` : undefined}
            />
            {stepErrors.damageDescription && <p id={`${damageDescriptionId}-error`} className={errCls}>{stepErrors.damageDescription}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">{t("Photos (optional, up to 5)", "Fotos (opcional, hasta 5)")}</label>
            <label htmlFor={photosId} className="flex items-center gap-2 cursor-pointer rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary transition-colors">
              <Upload className="w-4 h-4" />
              {t("Upload Photos for Faster Quote", "Suba Fotos y Cotice Más Rápido")}
              <input id={photosId} type="file" accept="image/*" multiple onChange={handlePhotoAdd} className="hidden" />
            </label>
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {photos.map((p, i) => (
                  <div key={i} className="relative">
                    {photoPreviews[i] ? (
                      <Image
                        src={photoPreviews[i]}
                        alt={t(
                          `Uploaded dent photo ${i + 1} for paintless dent repair quote`,
                          `Foto de abolladura ${i + 1} para cotización de reparación sin pintura`
                        )}
                        width={64}
                        height={64}
                        unoptimized
                        className="w-16 h-16 rounded-lg object-cover border border-border"
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label={t(`Remove photo ${i + 1}`, `Eliminar foto ${i + 1}`)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      {/* Navigation */}
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
            {t("Get My Free Quote", "Obtenga Mi Cotización")}
          </button>
        )}
      </div>
    </div>
  );
}
