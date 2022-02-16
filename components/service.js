import Link from 'next/link'

export default function Service(props) {
  return (
    <Link href="/logs">
    <a><div>{props.name}: {props.status}</div></a>
    </Link>
  );
}
