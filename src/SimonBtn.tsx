import { useCallback } from "react";

interface SimonBtnProps {
    color: string;
    light:string;
    onClick: (colorPick:string) => void;
}

export default function SimonBtn({color, light, onClick}: SimonBtnProps){    
    
    const lightClass = light==="On"?" light": ""
    const handleClickSelection = useCallback((colorPick:string)=>{
        onClick(colorPick);
      }, [onClick])

    return (
    <div className={"button " + color + lightClass} onClick={() => handleClickSelection(color)} id={color}>
    </div>
  )
}