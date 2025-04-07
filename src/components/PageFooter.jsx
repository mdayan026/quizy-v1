import Image from 'next/image'
import playSound from '../helpers/playSound'
import soundOn from '../assets/sound-on.svg'
import soundOff from '../assets/sound-off.svg'
import { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md'
import { GoAlert } from 'react-icons/go'
import { BsFillStarFill } from 'react-icons/bs'

export default function Footer({ alert = false }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [sound, setSound] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Handle the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault(); // Prevent the default browser install banner
      setDeferredPrompt(e); // Save the event for later use
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle the Install App button click
  const handleInstallClick = () => {
    if (deferredPrompt) {
      console.log('Prompting install');
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null); // Clear the deferred prompt
      });
    } else {
      console.log('No deferredPrompt available');
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('sound')) localStorage.setItem('sound', sound);
    else setSound(localStorage.getItem('sound') === 'true');
  }, []);

  useEffect(() => localStorage.setItem('sound', sound), [sound]);

  function handleClick(info = false) {
    info ? setShowInfo(!showInfo) : setSound(!sound);
  }

  function handleSoundON() {
    setSound(true);
    localStorage.setItem('sound', true);
    playSound('switch-on');
  }

  return (
    <footer className="fixed right-4 bottom-3 z-20">
      <nav>
        <ul className="flex gap-4">
          <div className='mw-[200px]'>
          <li>
            <button
              onClick={handleInstallClick}
              className="btn-primary uppercase py-3 px-6 w-full tracking-widest"
            >
              Install App
            </button>
          </li>
          </div>
          <li className="relative">
            <button
              title="Show info"
              className={`align-middle relative z-20 hover:scale-105 p-1.5 bg-white rounded-md ${
                showInfo ? 'scale-110' : ''
              }`}
              onClick={() => handleClick(true)}
            >
              {alert ? (
                <GoAlert className="text-[25px] mx-auto" color="#0f172a" />
              ) : (
                <MdInfo className="text-[25px]" style={{ color: '#1c233a' }} />
              )}
            </button>
            <p
              className={`absolute bottom-full -right-14 sm:bottom-auto sm:top-[2px] whitespace-pre sm:whitespace-nowrap text-sm md:text-base bg-white text-slate-900 rounded-md py-1 px-4 text-left transition-all ${
                showInfo ? 'opacity-100 -right-14  sm:!right-7 ' : 'opacity-0 right-0 pointer-events-none'
              }`}
            >
              {alert ? (
                'The questions made by AI may have errors. \nOnly some questions are made by IA'
              ) : (
                <span>
                  Made with ❤️ by{' '}
                  <a
                    href="https://x.com/THE_SANDF"
                    target="_blank"
                    rel="noreferrer"
                    className={`underline ${showInfo ? '' : 'hidden'}`}
                  >
                    KHALID
                  </a>
                </span>
              )}
            </p>
          </li>
          
          <li>
            <button
              title={sound ? 'Mute' : 'Play music'}
              className="align-middle hover:scale-105 p-1.5 bg-white rounded-md"
            >
              {sound ? (
                <Image
                  src={soundOn}
                  alt=""
                  width={25}
                  height={25}
                  onClick={() => setSound(false)}
                />
              ) : (
                <Image
                  src={soundOff}
                  alt=""
                  width={25}
                  height={25}
                  onClick={handleSoundON}
                />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}