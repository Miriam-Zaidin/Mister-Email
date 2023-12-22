import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function EmailPreview({ email, onRemoveEmail, onUpdateEmail }) {
    const [currentEmail, setCurrentEmail] = useState(email);

    useEffect(() => {
        // Update the component's state when the email prop changes
        setCurrentEmail(email);
    }, [email]);


    async function onToggle(ev) {
        const { name: field } = ev.target
        const updatedEmail = { ...currentEmail, [field]: !currentEmail[field] }
        onUpdateEmail(updatedEmail)
    }
    let starClass = currentEmail.isStarred ? 'is-starred' : '';
    let starIcon = currentEmail.isStarred ? "fa fa-star" : "fa fa-star-o";
    let isReadIcon = currentEmail.isRead ? "fa fa-envelope-o" : "fa fa-envelope-open-o";
    let sentAt=new Date(currentEmail.sentAt).toLocaleString()
    return (

        <Link to={`/email/${currentEmail.id}`}>
            <article className="email-preview">
                <button onClick={onToggle} name="isStarred" className={starClass}>
                    <i className={starIcon}></i>
                </button>
                <span>{currentEmail.from}</span>
                <span><b>{currentEmail.subject}</b> - {currentEmail.body}</span>

                <span className="span-sent-at">{sentAt}</span>
                <div className="email-actions">
                    <button onClick={onToggle} name="isRead">
                        <i className={isReadIcon}></i>
                    </button>
                    <button onClick={() => onRemoveEmail(currentEmail.id)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </article>
        </Link >

    )
}
