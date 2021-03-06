import { useContext} from 'react';
import { CountdownContext } from '../contexts/CoutdownContext';

import styles from '../styles/components/Countdown.module.css'

export function Countdown(){
  const {minutes,seconds,isActive,isFinished,resetCountdown,starCountdown} = useContext(CountdownContext)
  
  
 
  
  const [minuteLeft,minuteRight]= String(minutes).padStart(2,'0').split('');
  const [secondsLeft,secondsRight]= String(seconds).padStart(2,'0').split('');

 
    return(
        

        <div>
            
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>

                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>
              
            {isFinished ?
                (<button 
                  type="button" 
                  className={styles.countdownButtonFinished}  
                  onClick={starCountdown} 
                  >
                
                    <span>Ciclo Terminou!!</span>
                  <img src="icons/check.png" alt="img-inicio"/>
                  
                </button>
                ):(

                <>
                  {isActive?(

                      <button 
                        type="button" 
                        className={styles.countdownButton}  
                        onClick={resetCountdown} 
                      >

                        Abandonar Ciclo
                        <img src="icons/close.svg" alt="img-inicio"/>
                        
                      </button>


                      ):(

                      <button 
                        type="button" 
                        className={styles.countdownButtonActive}  
                        onClick={starCountdown} 
                      >

                        Ativa ciclo 
                        <img src="icons/play_arrow.svg" alt="img-inicio"/>
                        
                      </button>

                      )
                      }

                  
                  
                  
                  </>

                )}      
        </div>
    );
}