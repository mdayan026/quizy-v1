import '../styles/globals.css';
import Head from 'next/head';
import NewGameForm from '../components/Form/NewGameForm';
import { Poppins } from 'next/font/google';
import { Chakra_Petch } from 'next/font/google';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-chakra-petch',
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#297fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <NewGameForm />
      <style jsx global>{`
        html {
          font-family: ${chakraPetch.style.fontFamily}, ${poppins.style.fontFamily}, sans-serif;
        }
      `}</style>
    </>
  );
}