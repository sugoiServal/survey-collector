import {useState, useEffect} from 'react'
import { useSubscribeAuthContext } from '../../hooks/useSubscribeAuthContext'
import { useNavigate } from 'react-router-dom';
import testEmail from './utils/validateEmails'

export default function CreateSurveyPg() {
  const { user, authIsReady } = useSubscribeAuthContext()
  const navigate = useNavigate();

  const [ title, setTitle ] = useState('')
  const [ subject, setSubject ] = useState('')
  const [ body, setBody ] = useState('')
  const [ recipients, setRecipients ] = useState('')

  const [ formError, setFormError ] = useState('')
  const [ creditError, setCreditError ] = useState('')
  const [ infoMessage, setInfoMessage] = useState('')
  const [ isFinalize, setIsFinalize ] = useState(false)
  const [ isSuccess, setIsSuccess ] = useState(false)

  // test states

  const handleNext = (e) => {
    e.preventDefault();
    console.log("next");
    const emailsError = testEmail(recipients)
    if (emailsError) {
      setFormError(emailsError)
      return
    } 
    setFormError('')
    setIsFinalize(true)
  }

  const handleSendSurvey = async () => {
    console.log("handleSendSurvey");
    const message = {
      title,
      subject,
      body,
      "recipients":recipients.split(',').map((email)=>(email.trim()))
    }
    console.log(message);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/surveys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
       },
      credentials: 'include' ,
      body: JSON.stringify({message})
    });
    if (res.ok) {
      console.log('ok')
      const jsonMsg = await res.json()
      setInfoMessage(jsonMsg.message)
      setIsSuccess(true)
      //  redirect to dashboard in three sec
      await new Promise(r => setTimeout(r, 3000));
      navigate('/surveys')
      navigate(0)
    
    } else {
      // handle credit error: pls top up
      const errorMsg = await res.json()
      console.log(errorMsg.error)
      setCreditError(errorMsg.error)
      return 
    }
  }

  return (
    <div>
        { !isFinalize && 
          <form onSubmit={handleNext}>
            <div className="create-form">
              <h3>Create a new Project</h3>

              <div className="form-field">
                <label htmlFor="Title">Campaign Title:</label>
                <input type="text" id="Title" required
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}/>
              </div>

              <div className="form-field">
                <label htmlFor="subject">Subject Line:</label>
                <input type="text" id="subject" required
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)}/>
              </div>

              <div className="form-field">
                <label htmlFor="body">Email Body:</label>
                <input type="text" id="body" required
                        value={body}
                        onChange={(e)=>setBody(e.target.value)}/>
              </div>

              
              <div className="form-field">
                <label htmlFor="recipients">{"Recipient List(separate by ','):"}</label>
                <input type="text" id="recipients" required
                        value={recipients}
                        onChange={(e)=>setRecipients(e.target.value)}/>
              </div>
              { formError && <p>{formError}</p> }
              <button type="button" onClick={()=>{navigate('/surveys')}}>Cancel</button>
              <button>Next</button>
            </div> 
          </form>
        }

        { isFinalize && 
          <div >
            <h2>Please confirm your entries</h2>
            <h3>Campaign Title</h3>
            <p>{title}</p>
            <h3>Subject Line</h3>
            <p>{subject}</p>
            <h3>Email Body</h3>
            <p>{body}</p>
            <h3>Recipient List</h3>
            <p>{recipients}</p>
            { creditError && <p>{creditError}</p> }
            { infoMessage && <p>{infoMessage}</p> }
            { isSuccess && <p>{'redirect to your dashboard in 3 seconds.'}</p>}
            <button type="button" onClick={()=>{setIsFinalize(false)}}>Back</button>
            <button type="button" onClick={handleSendSurvey}>SEND SURVEY</button>
          </div>


        }

    </div>
  )
}
