import { useEffect, useState } from 'react';
import './App.css'
import SimonBtn from './SimonBtn'
import { BeforeInstallPromptEvent } from './types';

function App() { 
  const [colorIdx, setColorIdx] = useState(0);
  const [colors, setColors] = useState<string[]>(["blue"]);
  const [playTime, setPlayTime] = useState(false);
  const [dlEvent, setDLEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const installButton = document.querySelector("#installBTN");

  useEffect(()=>{
    if(!playTime){
      setTimeout(function(){
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
        setColorIdx(0);
        setPlayTime(false);
        setColors([arrayRandom()]);
      }
    }
  }

  useEffect(()=>{
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      if(installButton){
        installButton.removeAttribute("hidden");
      }
      setDLEvent(event);
    });
  }, [dlEvent])

  const handleInstallClick = async () => {
    if (!dlEvent) {
      return;
    }
    console.log(dlEvent)
    await dlEvent.prompt();
    const result = await dlEvent.userChoice;
    if(result.outcome==="accepted"){
      installButton?.classList.add("hidden");
    }
  };

  return (
    <>
    <h1>{playTime?"A ton tour":"Regarde bien la suite"}</h1>
    <div className='simonGame'>
    <SimonBtn color={"green"} light={colors[!playTime?colorIdx:colorIdx-1]==="green"?"On":"Off"} onClick={handleClickButton}></SimonBtn>
    <SimonBtn color={"red"} light={colors[!playTime?colorIdx:colorIdx-1]==="red"?"On":"Off"} onClick={handleClickButton}></SimonBtn>
    <SimonBtn color={"yellow"} light={colors[!playTime?colorIdx:colorIdx-1]==="yellow"?"On":"Off"} onClick={handleClickButton}></SimonBtn>
    <SimonBtn color={"blue"} light={colors[!playTime?colorIdx:colorIdx-1]==="blue"?"On":"Off"} onClick={handleClickButton}></SimonBtn>
    </div>
    <div className='result'>
      {colors.map((color, index) => (
        <p key={index}> {color};</p>
      ))}
    </div>
    <button onClick={handleInstallClick} id='installBTN'>
        Installer la PWA
      </button>
    </>
  )
}

export default App
