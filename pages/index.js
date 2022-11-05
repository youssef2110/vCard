import React, { useState } from 'react'
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import { Animated } from 'react-animated-css';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { hasCookie } from 'cookies-next';

export default function Home() {
    const [visibility , setVisibility] = useState(true)
    return (
        <div>
            <Head>
                <title>vCard</title>
                <meta name="description" content="vCard" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
            </Head>
            <div className={styles.LoginAppContainer}>
                <div className={styles.LoginImageContainer}>
                    
                </div>
                <div className={styles.LoginContainer}>
                    <div className={styles.Middle}>
                        <Animated className={!visibility && styles.displayNo} animationIn="fadeInDown" animationOut="fadeOutUp" animationInDuration={800} animationOutDuration={400}  isVisible={visibility}>
                            <LoginForm changeVisibility={() => setVisibility(false)} />
                        </Animated>
                        <Animated className={visibility && styles.displayNo} animationIn="fadeInDown" animationOut="fadeOutUp" animationInDuration={800} animationOutDuration={400}  isVisible={!visibility}>
                            <SignupForm changeVisibility={() => setVisibility(true)} />
                        </Animated>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { res, req } = context
    const session = hasCookie('access_token',{ req, res }); 
    if (session) {
        res.writeHead(302, {
            Location: '/profile',
        })
        res.end();
        return {
            props: {

            },
        }
    }
    return {
        props: {
        },
    }
}