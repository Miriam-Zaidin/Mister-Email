export function EmailFolderList() {
    return (
        <section>
            <button className="folder-button"><i className="fa fa-fw fa-envelope"></i>Inbox</button>
            <button className="folder-button"><i className="fa fa-fw fa-envelope"></i>Starred</button>
            <button className="folder-button"><i className="fa fa-fw fa-envelope"></i>Sent</button>
            <button className="folder-button"><i className="fa fa-fw fa-envelope"></i>Draft</button>
            <button className="folder-button"><i className="fa fa-fw fa-envelope"></i>Trash</button>
        </section>
    )
}