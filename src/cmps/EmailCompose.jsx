import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function EmailCompose({ onSendEmail }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const newCompose = { to: '', subject: '', body: '' }
  const [emailCompose, setEmailCompose] = useState(getSearchParams())

  useEffect(() => {
    setEmailCompose(getSearchParams())
  }, [searchParams])

  function getSearchParams() {
    const compose = searchParams.get('compose')
    if (compose) {
      return compose === 'new' ? newCompose : compose
    }
    else return null
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setEmailCompose((prevData) => ({ ...prevData, [name]: value }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    await onSendEmail(emailCompose)
    setEmailCompose(null)
  }

  if (!searchParams.get('compose')) return <></>
  if (!emailCompose) return <div>Loading...</div>
  return (
    <article className="article">
      <form onSubmit={onSubmit}>
        <label>To:
          <input value={emailCompose.to} onChange={handleChange} type="text" name="to" />
        </label>
        <label>Subject:
          <input value={emailCompose.subject} onChange={handleChange} type="text" name="subject " />
        </label>
        <label>Body:
          <textarea value={emailCompose.body} onChange={handleChange} name="body">
            <pre />
          </textarea></label>
        <button type="submit">Send Email</button>
      </form>
    </article>
  )
}
