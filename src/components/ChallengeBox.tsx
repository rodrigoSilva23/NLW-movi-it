 import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CoutdownContext'
import styles from '../styles/components/ChallengeBox.module.css'
 
 export function ChallengeBox(){
   const  {activeChallenge,resetChallenge,completeChallenge } = useContext(ChallengesContext)
   const {resetCountdown} = useContext(CountdownContext)

   function handleChallengeSuceeded(){
       completeChallenge()
   
       resetCountdown()
   }
    

   function handleChallengeFailed(){
    
    resetCountdown()
    resetChallenge()
    
}
  
   
    return(
        <div className={styles.ChallengeBoxContainer}>
                
                {activeChallenge ?(

                    <div className={styles.ChallengeBoxActive}>
                        <header>Ganhe {activeChallenge.amount} xp</header>

                        <main>
                            <img src={`./icons/${activeChallenge.type}.svg`} alt={activeChallenge.type !="eye" ?"Corpo":"olhos"}/>
                            <h1>Exercite-se</h1>
                            <p>{activeChallenge.description} </p>
                        </main>

                        <footer>
                            <button type="button"
                             className={styles.ChallengeFailedButton}
                             onClick={handleChallengeFailed} 
                             >
                                Falhei
                            </button>

                            <button type="button"
                             className={styles.ChallengeSucceededButton}
                             onClick={handleChallengeSuceeded}
                             >
                               Completei
                            </button>
                        </footer>

                    </div>

                ):(
                
                    <div className={styles.ChallengeBoxNotActive}>
                        <strong>Inicie um ciclo <br/> para receber desafios a <br/> serem completados</strong>
                    <div>
                        <img src="./icons/level-up.svg" alt=""/>
                        <span>Complete-os e ganhe <br/>experiencia e avance de level.</span>
                    </div>

                    </div>
                    
                )}

        </div>
    )
 }