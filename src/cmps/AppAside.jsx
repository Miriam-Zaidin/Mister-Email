import { EmailFolderList } from "./EmailFolderList";

export function AppAside() {
    return (
        <aside className="aside">
            <button className="email-compose" >
                Compose
            </button>
            <EmailFolderList />
        </aside>
    )
}