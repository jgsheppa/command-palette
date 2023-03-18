import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function About() {
  return (
    <>
      <Head>
        <title>Command Palette</title>
        <meta name="description" content="A command palette" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">
          About
        </h1>
      </main>
    </>
  )
}
