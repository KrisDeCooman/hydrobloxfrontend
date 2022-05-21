import Head from 'next/head'
import Web3 from 'web3'
import { hydroContract } from '../blockchain/hydro'
import { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import styles from '../styles/hydro.module.css'

const hydroblox = () => {
    const [error, setError] = useState('')
    const [amountOfTokens, setAmountOfTokens] = useState('')
    let web3

    useEffect(() => {
        getAmountOfTokensHandler()
    })

    const getAmountOfTokensHandler = async () => {
        /* Reading from blockchain is .call(), no ether to send.
        Writing to blockchain use .send() and you need to send ether along to pay for the transaction.
        */
        const amountOfTokens = await hydroContract.methods.store().call()
        setAmountOfTokens(amountOfTokens)
    }

    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" })
                web3 = new Web3(window.ethereum)
            } catch (err) {
                setError(err.message)
            }

        } else {
            console.log("Please install MetaMask")
        }
    }
    return (
        <div className={styles.main}>
            <Head>
                <title>HydroBlox App</title>
                <meta name="description" content="HydroBlox Blockchain Project" />
            </Head>
            <nav className="navbar mt-4 mb-4">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>HydroBlox Application</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
                    </div>
                </div>
            </nav>
            <section>
                <div className="container">
                    <h2>Tokens to divide: {amountOfTokens}</h2>
                </div>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>
            </section>
        </div>
    )
}

export default hydroblox