import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onUpdateEmail }) {
    return (
        <section className="email-list">
            {emails.map(email =>
                <EmailPreview key={email.id} email={email} onRemoveEmail={onRemoveEmail}
                    onUpdateEmail={onUpdateEmail} />
            )}
        </section>
    )
}
