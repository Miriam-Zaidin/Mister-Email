import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function EmailPreview({ email, onRemoveEmail, onUpdateEmail}) {
    const [currentEmail, setCurrentEmail] = useState(email);

    useEffect(() => {
      // Update the component's state when the email prop changes
      setCurrentEmail(email);
    }, [email]);
    
    let starClass = currentEmail.isStarred ? 'is-starred' : '';
    let starIcon = currentEmail.isStarred ? "fa fa-star" : "fa fa-star-o";
    let isReadIcon = currentEmail.isRead ? "fa fa-envelope-o" : "fa fa-envelope-open-o";

    async function onToggle(ev) {
        const { name: field } = ev.target
        const updatedEmail = { ...currentEmail, [field]: !currentEmail[field] }
        onUpdateEmail(updatedEmail)
    }
    return (
        <article className="email-preview">
            <Link to={`/email/${currentEmail.id}`}>
                <button onClick={onToggle} name="isStarred" className={starClass}>
                    <i className={starIcon}></i>
                </button>
                <h2>{currentEmail.from}</h2>
                <p>{currentEmail.subject}</p>
                <button onClick={onToggle} name="isRead">
                    <i className={isReadIcon}></i>
                </button>

                <button onClick={()=>onRemoveEmail(currentEmail.id)}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </Link>
        </article>
    )
}
