import { useEffect, useState } from 'react';
import './App.css'
import SimonBtn from './SimonBtn'

function App() { 
  const [colorIdx, setColorIdx] = useState(0)
  const [colors, setColors] = useState<string[]>(["blue"]);
  const [playTime, setPlayTime] = useState(false)

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
          setColorIdx(0)
          setPlayTime(false)
          const arr = colors
          arr.push(arrayRandom())
          setColors(arr)
        }else{
          setColorIdx(colorIdx+1)
        }
      }else{
        setColorIdx(0)
        setPlayTime(false)
        setColors([arrayRandom()])
      }
    }
  }

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
    </>
  )
}

export default App
