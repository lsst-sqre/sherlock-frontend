import { useRouter } from 'next/router'

import { getEnvironments, getEnvironmentData } from '../lib/environments'
import Environment from '../components/environment'
import LogTable from '../components/logtable'

export default function EnvironmentStatus({environment}) {
  return (
    <div>
      <Environment name={environment.environment} url={environment.url} all='y' />
      <LogTable url={environment.url} />
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: getEnvironments(),
    fallback: false
  }
}

export async function getStaticProps({params}) {
  return {
    props: {
      environment: getEnvironmentData(params.environment)
    }
  }
}
