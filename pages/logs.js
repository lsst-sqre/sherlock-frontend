import { useRouter } from "next/router";

import LogTable from "../components/logtable";

export default function LogViewer() {
  const router = useRouter();
  const { title, url } = router.query;

  return (
    <div>
      <h1>
        {title} at {url}
      </h1>
      <LogTable url={url} />
    </div>
  );
}
