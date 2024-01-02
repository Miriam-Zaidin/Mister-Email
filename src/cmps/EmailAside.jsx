import { Link, useSearchParams } from "react-router-dom";
import { EmailFolderList } from "./EmailFolderList";

export function EmailAside() {
  const [searchParams, setSearchParams] = useSearchParams()
  function openCompose() {
    setSearchParams("compose=new")
  }
  return (
    <aside className="aside">
      <img className="gmail-img" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_rtl_r5.png" alt="gmail logo" />
      <button className="btn-open-compose" onClick={openCompose} >
      <i className="fa fa-pencil"></i>
         Compose</button>
      <EmailFolderList />
    </aside>
  );
}
