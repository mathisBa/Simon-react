import { useCallback, useEffect, useState } from 'react';
import './App.css'
import SimonBtn from './SimonBtn'

function App() { 
  const [colorIdx, setColorIdx] = useState(0)
  const [colors, setColors] = useState<string[]>(["blue", "green", "red"]);
  const [playTime, setPlayTime] = useState(false)

  useEffect(()=>{
    if(!playTime){
      setTimeout(function(){
        console.log(colorIdx<colors.length -1, !playTime, colorIdx)
        if(colorIdx<colors.length -1 && !playTime){
          setColorIdx(colorIdx+1)
        }else{
          setColorIdx(0)
          setPlayTime(true)
        }
      }, 1000);
    }
  }, [colors, colorIdx, playTime])

  const handleClickButton = (colorPick:string)=>{
    if(playTime){
      console.log(colorPick)
      if(colors[colorIdx]===colorPick){
        if(colorIdx>=colors.length -1){
          setColorIdx(0)
          setPlayTime(false)
          const arr = colors
          arr.push("green")
          setColors(arr)
        }else{
          setColorIdx(colorIdx+1)
        }
      }else{
        setColorIdx(0)
        setPlayTime(false)
        setColors(["blue", "green", "red"])
      }
    }
  }

  return (
    <>
    <div className='simonGame'>
    <SimonBtn color={"green"} light={colors[colorIdx]==="green"&&!playTime?"On":"Off"} onClick={handleClickButton}></SimonBtn>
    <SimonBtn color={"red"} light={colors[colorIdx]==="red"&&!playTime?"On":"Off"} onClick={handleClickButton}></SimonBtn>
    <SimonBtn color={"yellow"} light={colors[colorIdx]==="yellow"&&!playTime?"On":"Off"} onClick={handleClickButton}></SimonBtn>
    <SimonBtn color={"blue"} light={colors[colorIdx]==="blue"&&!playTime?"On":"Off"} onClick={handleClickButton}></SimonBtn>
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
