export function EmailFolderList() {
    return (
        <section>
            <button className="folder-button"><i className="fa fa-inbox"></i>Inbox</button>
            <button className="folder-button"><i className="fa fa-star-o"></i>Starred</button>
            <button className="folder-button"><i className="fa fa-send-o"></i>Sent</button>
            <button className="folder-button"><i className="fa fa-file-o"></i>Draft</button>
            <button className="folder-button"><i className="fa fa-trash-o"></i>Trash</button>
        </section>
    )
}