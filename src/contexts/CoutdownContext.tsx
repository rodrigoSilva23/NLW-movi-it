import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";
interface CountdownContextData{
    minutes:number;
    seconds:number;
    isFinished:boolean;
    isActive:boolean;
    starCountdown:() => void;
    resetCountdown:() => void;


}
interface CountdownContextProps{
    children:ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CoutdownProvider({children}:CountdownContextProps) {
    const [time, setTime ] = useState(0.1*60);

    const [isActive, setIsActive]= useState(false)
    const [isFinished, setFinished]= useState(false)
    const {startNewChallenge} = useContext(ChallengesContext)
  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function starCountdown(){
        setIsActive(true);
        
      }
    
     
      useEffect(()=>{
        if (isActive && time > 0){
          
          setTimeout(()=>{
            setTime(time -1)
          },1000)
          
        }else if ( isActive && time === 0){            
          
          setFinished(true)  // caso o isActive apresente falso o time irá volta para o valor padrão
          startNewChallenge()
          
        }else{
          setTime(0.1*60);

          
        }
        
      },[isActive,time])
      
      
      function resetCountdown(){
        setIsActive(false);
        setFinished(false)

        console.log("teste")
       
       
    
      }

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            isFinished,
            isActive,
            starCountdown,
            resetCountdown
        }}>
    

            {children}
        </CountdownContext.Provider>
    )


}