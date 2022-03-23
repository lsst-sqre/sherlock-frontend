import useSWR from "swr";
import Link from "next/link";

import Service from "../components/service";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const path = require("path");

export default function Environment(props) {
  const detailsUrl = path.join("/", props.name);
  const statusUrl = path.join("/api", props.name);
  const { data, error } = useSWR(statusUrl, fetcher);

  if (error) {
    return (
      <div>
        {props.name} failed to contact at {statusUrl} {error.status}
      </div>
    );
  }

  if (!data) return <div>{props.name} loading...</div>;
  if (!Array.isArray(data))
    return <div>{props.name} did not return an array</div>;

  const errored = data.filter((s) => s.status != "normal");
  const services = props.all ? data : errored;
  const status = errored.length == 0 ? "✅" : "❌";

  return (
    <div>
      <Link href={detailsUrl} passHref>
        <h1>
          {status} <a>{props.name}</a> {props.url}
        </h1>
      </Link>

      {services.map((item) => (
        <div key={item.name}>
          <Service name={item.name} status={item.status} url={props.url} />
        </div>
      ))}
    </div>
  );
}
