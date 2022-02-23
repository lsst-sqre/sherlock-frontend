import Head from "next/head";
import Environment from "../components/environment";

import { getEnvironments } from "../lib/environments";

export default function Home({ environments }) {
  return (
    <div>
      <Head>
        <title>Sherlock Status</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Sherlock</h1>
        <div>
          {environments.map(({ params }) => (
            <Environment
              key={params.environment}
              name={params.environment}
              url={params.url}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      environments: getEnvironments(),
    },
  };
}
