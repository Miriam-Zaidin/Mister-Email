import { Link } from "react-router-dom";

export function EmailPreview({ email }) {
    return (
        <article className="email-preview">
            <Link to={`/email/${email.id}`}>
                <h2>{email.from}</h2>
                <h4>{email.subject}</h4>
            </Link>
        </article>
    )
}
