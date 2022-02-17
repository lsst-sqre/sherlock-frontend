import { useRouter } from 'next/router'

import { getEnvironments, getEnvironmentData } from '../lib/environments'
import Environment from '../components/environment'

export default function EnvironmentStatus({environment}) {
  return (
    <Environment name={environment.environment} url={environment.url} all='y' />
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
