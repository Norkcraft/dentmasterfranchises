export interface Review {
  name: string;
  source: "Google" | "Facebook";
  text: string;
  rating: 5;
}

export const reviews: Review[] = [
  {
    name: "Samuel Esteban Osorio González",
    source: "Google",
    text: "Excellent service and perfect attention from Mr. Mario. 100% recommended.",
    rating: 5,
  },
  {
    name: "James Perez",
    source: "Facebook",
    text: "Excellent work, great attention, and reliable service. My vehicle looked like new. Very satisfied.",
    rating: 5,
  },
  {
    name: "Luis Valencia",
    source: "Facebook",
    text: "Highly recommended. Very professional service and great results.",
    rating: 5,
  },
  {
    name: "Alex Albarracín",
    source: "Facebook",
    text: "Very good work, totally recommended. Fast and professional service.",
    rating: 5,
  },
  {
    name: "John Carlos P.E.",
    source: "Facebook",
    text: "Excellent service — the best of the best.",
    rating: 5,
  },
  {
    name: "David Leonardo R R",
    source: "Facebook",
    text: "Very good service. The quality of the work gives you full confidence in your vehicle.",
    rating: 5,
  },
];
