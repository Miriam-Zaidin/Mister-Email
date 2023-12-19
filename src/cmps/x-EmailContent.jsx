import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { emailService } from "../services/email.service"

export function EmailContent() {
    const { emailId } = useParams()
    const [emailContent, setEmailContent] = useState(null)
    useEffect(() => {
        loudEmailContent()
    }, [])
    async function loudEmailContent() {
        const emailContent = await emailService.getById(emailId)
        setEmailContent(emailContent)
    }

    if (!emailContent)
        return <div>Loading...</div>
    return (
        <section>
            body
        </section>
    )
}