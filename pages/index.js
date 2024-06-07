import dynamic from 'next/dynamic';
// import { BrowserRouter } from 'react-router-dom';
const LandingPage = dynamic(() => import('./LandingPage'), { ssr: false });

export default function Home() {
  return (
    <LandingPage />
  );
}
