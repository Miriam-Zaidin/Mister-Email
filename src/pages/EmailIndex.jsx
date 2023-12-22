import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { AppAside } from "../cmps/AppAside";

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState()

    useEffect(() => {
        loadEmails();
    }, [])

    async function loadEmails() {
        const emails = await emailService.query(filterBy)
        setEmails(emails);
        console.log("emails: ", emails)
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

    if (!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            {/* <RobotFilter filterBy={{ model, minBatteryStatus }} onSetFilter={onSetFilter} /> */}
            <AppAside></AppAside>
            {/* <EmailFilter /> */}


            <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onUpdateEmail={onUpdateEmail} />
        </section>
    )
}

// -------------------

// export function RobotIndex() {

//     const [robots, setRobots] = useState(null)
//     const [filterBy, setFilterBy] = useState(robotService.getDefaultFilter())

//     useEffect(() => {
//         loadRobots()
//     }, [filterBy])

//     function onSetFilter(filterBy) {
//         setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
//     }

//     if (!robots) return <div>Loading...</div>
//     const { model, minBatteryStatus } = filterBy
//     return (
//         <section className="robot-index">
//             <h1>Welcome! this is our robots</h1>
//             <RobotFilter filterBy={{ model, minBatteryStatus }} onSetFilter={onSetFilter} />
//             <RobotList robots={robots} onRemoveRobot={onRemoveRobot} />
//         </section>
//     )
// }
