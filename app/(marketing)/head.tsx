import heroImage from '@/assets/hero-workshop.jpg';

export default function Head() {
  return (
    <>
      <link rel="preload" as="image" href={heroImage.src} />
    </>
  );
}
