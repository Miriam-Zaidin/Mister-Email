import { Link, useSearchParams } from "react-router-dom";
import { EmailFolderList } from "./EmailFolderList";

export function AppAside() {
  const [searchParams, setSearchParams] = useSearchParams()
  function openCompose() {
    setSearchParams("compose=new")
  }
  return (
    <aside className="aside">
      <button onClick={openCompose} className="email-compose">Compose</button>
      <EmailFolderList />
    </aside>
  );
}
