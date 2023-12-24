import { useNavigate, useParams } from "react-router-dom"
import { emailService } from "../services/email.service"
import { useEffect, useState } from "react"

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [])
    // }, [params.emailId])

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (error) {
            console.log('error:', error)
        }
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
            {/* <h3>Battery: {email.batteryStatus}</h3> */}
            {/* link is better */}
            <button onClick={onBack}>Back</button>
        </section>
    )

}