import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { AppAside } from "../cmps/AppAside";
import { Outlet, useParams } from "react-router-dom";

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    // const { } = useParams()
    const params = useParams()

    useEffect(() => {
        loadEmails();
    }, [filterBy])

    async function loadEmails() {
        const emails = await emailService.query(filterBy)
        setEmails(emails);
        // console.log("emails: ", emails)
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => {
                return prevEmails.filter(email => email.id !== emailId)
            })
        } catch (error) {
            console.log('Had issues removing email', err);
        }
    }

    async function onUpdateEmail(emailToUpdate) {
        try {
            const savedEmail = await emailService.save(emailToUpdate)
            setEmails((prevEmails) => prevEmails.map(email => email.id === emailToUpdate.id ? savedEmail : email))
        } catch (err) {
            console.log('Had issues saving email', err);
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            <AppAside></AppAside>
            <EmailFilter filterBy={filterBy.txt} onSetFilter={onSetFilter} />
            
            {params.emailId ? <Outlet context={{ onUpdateEmail: onUpdateEmail }}/>
            :<EmailList emails={emails} onRemoveEmail={onRemoveEmail} onUpdateEmail={onUpdateEmail} />}
        </section>
    )
}