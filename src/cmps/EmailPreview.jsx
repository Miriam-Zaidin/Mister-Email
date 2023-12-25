import { Link, useNavigate } from "react-router-dom";

export function EmailPreview({ email, onRemoveEmail, onUpdateEmail }) {
    function onToggle(ev) {
        const { name: field } = ev.target
        const updatedEmail = { ...email, [field]: !email[field] }
        onUpdateEmail(updatedEmail)
    }

    let starClass = email.isStarred ? 'is-starred' : '';
    let starIcon = email.isStarred ? "fa fa-star" : "fa fa-star-o";
    let isReadIcon = email.isRead ? "fa fa-envelope-open-o" : "fa fa-envelope-o";
    let sentAt = new Date(email.sentAt).toLocaleString()
    return (

        <Link to={`/email/${email.id}`}>

            <article className="email-preview">
                <button onClick={onToggle} name="isStarred" className={starClass}>
                    <i className={starIcon}></i>
                </button>
                <span>{email.from}</span>
                <span><b>{email.subject}</b> - {email.body}</span>

                <span className="span-sent-at">{sentAt}</span>
                <div className="email-actions">
                    <button onClick={onToggle} name="isRead">
                        <i className={isReadIcon}></i>
                    </button>
                    <button onClick={() => onRemoveEmail(email.id)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </article>
        </Link >

    )
}
