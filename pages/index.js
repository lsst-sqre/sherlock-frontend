import Head from 'next/head'
import Environment from '../components/environment'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sherlock Status</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Sherlock</h1>
        <div>
          <Environment name="minikube" url="https://minikube.lsst.codes/sherlock/status" />
        </div>
      </main>
    </div>
  )
}
