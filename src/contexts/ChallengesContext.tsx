import {createContext, ReactNode, useEffect, useState} from 'react'
import cookies from 'cookies-js'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body ' | 'eye';
    description: string;
    amount: number;

}
interface ChallengesContextData {
    level:number;
    currentExperience:number;
    challengesCompleted:number;
    activeChallenge: Challenge;
    levelUp:()=> void;
    startNewChallenge: ()=> void;
    resetChallenge: ()=> void;
    experienceToNextLevel:number;
    completeChallenge:()=> void;
    CloseLevelUpModal:() => void;
    
}

interface ChallengesProviderProps{
    children:ReactNode;
    level: number;
    currentExperience:number;
    challengesCompleted:number;
    
}
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
}:ChallengesProviderProps){
    
    const [level,setLevel] = useState(rest.level ?? 1)
    const[currentExperience,setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted,setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

    const[activeChallenge,setActiveChallenge] = useState(null)
    const[isActiveLevelUpModal,setActiveLevelUpModal] = useState(false)
    useEffect(() =>{
        Notification.requestPermission()
    },[])
    
    useEffect(() =>{
        cookies.set('level',String(level))
        cookies.set('currentExperience',String(currentExperience))
        cookies.set('challengesCompleted',String(challengesCompleted))
    },[currentExperience,level,challengesCompleted])
    

    const experienceToNextLevel = Math.round(Math.pow((level +1)* 4,2))

    function CloseLevelUpModal(){
        setActiveLevelUpModal(false)
    }

    function levelUp(){
        setLevel(level +1)
        setActiveLevelUpModal(true)
        new Audio('/levelUpSom.mp3').play()
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
       const challenge = challenges[randomChallengeIndex];

       setActiveChallenge (challenge)
     
    }

    function resetChallenge(){
        setActiveChallenge(null)
        
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const {amount} = activeChallenge;
        let finalExperience = currentExperience + amount;
        
        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience -experienceToNextLevel
            levelUp()
        }

        setActiveChallenge(null)
        setCurrentExperience(finalExperience)
        setChallengesCompleted(challengesCompleted +1)
    }

    return(
        <ChallengesContext.Provider 
        value={{
            level,
            currentExperience,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            CloseLevelUpModal
            }}>

            {children}
           { isActiveLevelUpModal  &&<LevelUpModal/>}

        </ChallengesContext.Provider>


    )
}