import useSWR from 'swr'
import Service from '../components/service'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Environment(props) {
  const { data, error } = useSWR(props.url, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
    <h3>{props.name} {props.url}</h3>
    {data.map(item => <Service name={item.name} status={item.status} />)}
    </div>
  );
}
