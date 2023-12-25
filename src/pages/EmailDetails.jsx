import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { emailService } from "../services/email.service"
import { useEffect, useState } from "react"

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const { onUpdateEmail } = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
        
    }, [])
    // }, [params.emailId])


    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
            if(!email.isRead) onUpdateEmail({ ...email, isRead: true })
        } catch (error) {
            console.log('error:', error)
        }
    }

    async function onRemoveEmail() {
        await emailService.remove(email.id);
        onBack()
    }

    function onBack() {
        navigate('/email')
    }

    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details">
            <h1>email Details</h1>
            <h3>subject: {email.subject}</h3>
            <h3>body: {email.body}</h3>
            <button onClick={onRemoveEmail}>
                Remove
                <i className="fa fa-trash-o"></i>
            </button>
            <button onClick={onBack}>Back</button>
        </section>
    )

}