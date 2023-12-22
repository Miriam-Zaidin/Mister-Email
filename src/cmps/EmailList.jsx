import { Link } from "react-router-dom";
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onUpdateEmail}) {
    
    console.log("emails in EmailList", emails);
    return (
        <section className="email-list">
            {emails.map(email =>
                <EmailPreview key={email.id} email={email} onRemoveEmail={onRemoveEmail}
                onUpdateEmail={onUpdateEmail} />
                // <td><button onClick={() => onRemoveEmail(email.id)}>X</button></td>
            )}
        </section>
    )
}
