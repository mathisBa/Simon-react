import { useEffect, useState } from 'react';
import './App.css'
import SimonBtn from './SimonBtn'
import { BeforeInstallPromptEvent } from './types';

function App() { 
  const [colorIdx, setColorIdx] = useState(0);
  const [colors, setColors] = useState<string[]>(["blue"]);
  const [playTime, setPlayTime] = useState(false);
  const [dlEvent, setDLEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [bestScores, setBestScores] = useState<number[]>([]);
  const [voiceColor, setVoiceColor] = useState("")
  const installButton = document.querySelector("#installBTN");
  const grammar = "#JSGF V1.0; grammar colors; public <color> =  yellow | blue | red | green"
  const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const SpeechGrammarList = window.SpeechGrammarList || (window as any).webkitSpeechGrammarList;
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = "en-US";

  const sendNotification = (content:string) => {
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications.");
      return;
    }

    // If permission is already granted, create a notification
    if (Notification.permission === "granted") {
      new Notification("Simon!", {
        body: content,
      });
    } else if (Notification.permission !== "denied") {
      // Otherwise, request permission from the user
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Hello!", {
            body: content,
          });
        }
      });
    }
  };

  const updateBestScores = (newScore: number) => {
    const updatedScores = [...bestScores, newScore];
    updatedScores.sort((a, b) => b - a);
    const topFive = updatedScores.slice(0, 5);
    setBestScores(topFive);
  };

  useEffect(() => {
    const storedScores = localStorage.getItem('bestScores');
    if (storedScores) {
      setBestScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bestScores', JSON.stringify(bestScores));
  }, [bestScores]);

  useEffect(()=>{
    if(!playTime){
      setTimeout(function(){
        const utterance = new SpeechSynthesisUtterance(colors[colorIdx]);
        speechSynthesis.speak(utterance);
        if(colorIdx<colors.length -1 && !playTime){
          setColorIdx(colorIdx+1)
        }else{
          setColorIdx(0)
          setPlayTime(true)
        }
      }, 1000);
    }
  }, [colors, colorIdx, playTime])

  function arrayRandom() {
    const a = ["blue", "red", "green", "yellow"]
    return a[Math.floor(Math.random() * a.length)];
  }

  const handleClickButton = (colorPick:string)=>{
    if(playTime){
      if(colors[colorIdx]===colorPick){
        if(colorIdx>=colors.length -1){
          const arr = colors;
          arr.push(arrayRandom());
          setColorIdx(0);
          setPlayTime(false);
          setColors(arr);
        }else{
          setColorIdx(colorIdx+1);
        }
      }else{
        if ("vibrate" in navigator) {
          navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
        }
        updateBestScores(colors.length)
        sendNotification("Tu as perdu la partie");
        setColorIdx(0);
        setPlayTime(false);
        setColors([arrayRandom()]);
      }
    }
  }

  useEffect(()=>{
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches
    if(isInstalled){
      installButton?.classList.add("hidden");
      return
    }else{
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        if(installButton){
          installButton.removeAttribute("hidden");
        }
        setDLEvent(event);
      });
    }
  }, [dlEvent])

  const handleInstallClick = async () => {
    if (!dlEvent) {
      return;
    }
    await dlEvent.prompt();
    const result = await dlEvent.userChoice;
    if(result.outcome==="accepted"){
      installButton?.classList.add("hidden");
    }
  };

  const startVoice = () => {
    recognition.onresult = (event) => {
      console.log("Reading voice");
      const color = event.results[0][0].transcript;
      setVoiceColor(color);
    };
  
    recognition.onerror = (event) => {
      console.error("Recognition error", event);
    };
  
    console.log("Start voice");
    recognition.start();
    };
  
  const endVoice = () => {
    console.log("End voice")
    recognition.stop();
  };

  useEffect(()=>{
    console.log("Color changed")
    if(voiceColor != ""){
      const btn = document.getElementById(voiceColor)
      btn?.click()
    }
  }, [voiceColor])

  return (
    <>
      <h1>{playTime?"A ton tour":"Regarde bien la suite"}</h1>
      <div className='simonGame'>
      <SimonBtn color={"green"} light={colors[!playTime?colorIdx:colorIdx-1]==="green"?"On":"Off"} onClick={handleClickButton} ></SimonBtn>
      <SimonBtn color={"red"} light={colors[!playTime?colorIdx:colorIdx-1]==="red"?"On":"Off"} onClick={handleClickButton}></SimonBtn>
      <SimonBtn color={"yellow"} light={colors[!playTime?colorIdx:colorIdx-1]==="yellow"?"On":"Off"} onClick={handleClickButton}></SimonBtn>
      <SimonBtn color={"blue"} light={colors[!playTime?colorIdx:colorIdx-1]==="blue"?"On":"Off"} onClick={handleClickButton}></SimonBtn>
      </div>
      <button onClick={startVoice} onMouseLeave={endVoice}>
          Dire le résultat
      </button>
      <p>Couleur entendue : {voiceColor}</p>
      <div className='result'>
        {colors.map((color, index) => (
          <p key={index}> {color};</p>
        ))}
      </div>
      <h3>Meilleurs scores</h3>
        <ul>
          {bestScores.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </ul>
      <button onClick={handleInstallClick} id='installBTN'>
          Installer la PWA
      </button>
    </>
  )
}

export default App
