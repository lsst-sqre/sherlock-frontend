import Link from 'next/link'

export default function LogLink(props) {
  const data = {
    pathname: '/logs',
    query: {
      title: props.title,
      url: props.url
    }
  }

  return (
    <Link href={data}><a>{props.label}</a></Link>
  );
}
