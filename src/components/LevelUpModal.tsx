import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal(){

    const {level,CloseLevelUpModal } = useContext(ChallengesContext)

    
    return(
        <div className={styles.overlay}>
            <div className={styles.LevelUpModalContainer}>
                <header>{level}</header>
            <strong>Parabéns</strong>

            <span>você alcançou um novo level.</span>
            <button type="button" onClick={CloseLevelUpModal}><img src="/icons/close.svg" alt=""/></button>
            {/*<button type="button">Compartilhar no twitter<img src="/icons/twitter.svg" alt=""/></button>*/}
            </div>


        </div>
    )


}