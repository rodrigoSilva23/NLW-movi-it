import Head from 'next/head'
import React from 'react'
import {GetServerSideProps} from 'next'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExeprienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'

import {CoutdownProvider} from '../contexts/CoutdownContext'
import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../contexts/ChallengesContext'
import { LevelUpModal } from '../components/LevelUpModal'

interface HomeProps{
  level: number;
  currentExperience:number;
  challengesCompleted:number
}

export default function Home(props :HomeProps) {
  
  return (

    <ChallengesProvider
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    
    >

    
    
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>

      
    <ExeprienceBar/>

    <CoutdownProvider>


          <section>
            <div>
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>

            </div>

          <div>
            <ChallengeBox/>


          </div>
          </section>
      
    </CoutdownProvider>
   
  </div>
  </ChallengesProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
 
  const {level,currentExperience,challengesCompleted }= ctx.req.cookies

  return {
    props:{
      level:Number(level),
      currentExperience:Number(currentExperience),
      challengesCompleted:Number(challengesCompleted)

    }
  }
}