export interface Review {
  name: string;
  source: "Google" | "Facebook";
  text: string;
  textEs: string;
  rating: 5;
}

export const reviews: Review[] = [
  {
    name: "Samuel Esteban Osorio González",
    source: "Google",
    text: "Excellent service and perfect attention from Mr. Mario. 100% recommended.",
    textEs: "Excelente servicio y atención perfecta del Sr. Mario. 100% recomendado.",
    rating: 5,
  },
  {
    name: "James Perez",
    source: "Facebook",
    text: "Excellent work, great attention, and reliable service. My vehicle looked like new. Very satisfied.",
    textEs: "Excelente trabajo, gran atención y servicio confiable. Mi vehículo quedó como nuevo. Muy satisfecho.",
    rating: 5,
  },
  {
    name: "Luis Valencia",
    source: "Facebook",
    text: "Highly recommended. Very professional service and great results.",
    textEs: "Muy recomendado. Servicio muy profesional y excelentes resultados.",
    rating: 5,
  },
  {
    name: "Alex Albarracín",
    source: "Facebook",
    text: "Very good work, totally recommended. Fast and professional service.",
    textEs: "Muy buen trabajo, totalmente recomendado. Servicio rápido y profesional.",
    rating: 5,
  },
  {
    name: "John Carlos P.E.",
    source: "Facebook",
    text: "Excellent service — the best of the best.",
    textEs: "Excelente servicio — el mejor de los mejores.",
    rating: 5,
  },
  {
    name: "David Leonardo R R",
    source: "Facebook",
    text: "Very good service. The quality of the work gives you full confidence in your vehicle.",
    textEs: "Muy buen servicio. La calidad del trabajo le da plena confianza en su vehículo.",
    rating: 5,
  },
];
