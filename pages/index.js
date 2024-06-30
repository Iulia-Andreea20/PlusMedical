import dynamic from 'next/dynamic';

const LandingPage = dynamic(() => import('./LandingPage'), { ssr: false });
export default function Home() {
  return (
    <LandingPage />
  );
}
