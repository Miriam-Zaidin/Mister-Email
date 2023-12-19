import { Link } from "react-router-dom";
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail }) {
    return (
        <section className="email-list">
            {emails.map(email =>
                <EmailPreview key={email.id} email={email} />
                // <td><button onClick={() => onRemoveEmail(email.id)}>X</button></td>
            )}
        </section>
    )
}
