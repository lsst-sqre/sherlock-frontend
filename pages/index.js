import Head from 'next/head'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const { data, error } = useSWR('https://minikube.lsst.codes/sherlock/status', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div>
      <Head>
        <title>Sherlock Status</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Sherlock</h1>
        <div>
        {data.map(item => <div>{item.name}: {item.status}</div>)}
        </div>
      </main>
    </div>
  )
}
