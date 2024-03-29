import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailAside } from "../cmps/EmailAside";
import { Outlet, useParams } from "react-router-dom";
import { EmailMain } from "../cmps/EmailMain";
import EmailCompose from "../cmps/EmailCompose";

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const params = useParams()

    useEffect(() => {
        // setFilterBy
        loadEmails();
    }, [filterBy, params])

    async function loadEmails() {
        const emails = await emailService.query(filterBy)
        // להוסיף את מספר המילים
        // const {emails, totalCount} = await emailService.query(filterBy)
        // setInboxCount(totalCount)
        setEmails(emails);
    }

    async function onRemoveEmail(emailId) {
        try {
            let userConfirmed
            if (false) {
                // if (params.folder === 'trash') {
                userConfirmed = await confirmAsync('Are you sure to remove this email forever?');
                if (userConfirmed) await emailService.remove(emailId);
            }
            else {
                userConfirmed = confirm('Are you sure to remove this email?');
                if (userConfirmed) {
                    const emailToRemove = await emailService.getById(emailId);
                    emailToRemove.removedAt = Date.now();
                    await emailService.save(emailToRemove);
                }
            }
            if (userConfirmed)
                setEmails(prevEmails => {
                    return prevEmails.filter(email => email.id !== emailId)
                })
        } catch (error) {
            console.log('Had issues removing email', error);
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
            <EmailAside></EmailAside>
            <EmailMain>
                <EmailFilter filterBy={filterBy.txt} onSetFilter={onSetFilter} />

                {params.emailId ? <Outlet context={{ onUpdateEmail: onUpdateEmail, onRemoveEmail: onRemoveEmail }} />
                    : <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onUpdateEmail={onUpdateEmail} />}

            </EmailMain>
            <EmailCompose/>
        </section>
    )
}