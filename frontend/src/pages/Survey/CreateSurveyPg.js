import {useState, useEffect} from 'react'
import { useSubscribeAuthContext } from '../../hooks/useSubscribeAuthContext'
import { useNavigate } from 'react-router-dom';
import testEmail from './utils/validateEmails'
const authHeaderConfig = require('../../utils/authHeaderConfig')

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
    const message = {
      title,
      subject,
      body,
      "recipients":recipients.split(',').map((email)=>(email.trim()))
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/surveys`, {
      method: 'POST',
      headers: authHeaderConfig(user, {'Content-Type': 'application/json'}),
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
    <div className='container-lg'>
        { !isFinalize && 
          <form className='mt-4' onSubmit={handleNext}>
            <div className="create-form">
              <h3>Create a new Project</h3>

              <div className="form-field my-4">    
                <label className='display-6 fs-4 mb-3' for="Title">Campaign Title:</label>  
                <input type="text" id="Title" required
                        className='form-control'
                        placeholder="eg, Paid user feedback"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}/>
              </div>

              <div className="form-field  my-4">
                <label className='display-6 fs-4 mb-3' htmlFor="subject">Subject Line:</label>
                <input type="text" id="subject" required
                        className='form-control'
                        placeholder="eg, Thank you for choosing SurveyCollector, We want to hear from you!"
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)}/>
              </div>

              <div className="form-field  my-4">
                <label className='display-6 fs-4 mb-3' htmlFor="body">Email Body:</label>
                <input type="text" id="body" required
                        className='form-control'
                        placeholder="eg, We'd like your input!
                        Please answer the following question:"
                        value={body}
                        onChange={(e)=>setBody(e.target.value)}/>
              </div>

              
              <div className="form-field  my-4">
                <label  className='display-6 fs-4 mb-3' htmlFor="recipients">{"Recipient List(separate by ','):"}</label>
                <input type="text" id="recipients" required
                        className='form-control'
                        placeholder="emails"               
                        value={recipients}
                        onChange={(e)=>setRecipients(e.target.value)}/>
              </div>
              { formError && <p>{formError}</p> }
              <button type="button" className='btn btn-lg btn-outline-danger' onClick={()=>{navigate('/surveys')}}>Cancel</button>
              <button className='btn btn-lg btn-outline-primary ms-4'>Next</button>
            </div> 
          </form>
        }

        { isFinalize && 
          <div className='container-lg'>
            <h2 className='display-5 mb-5 mt-4'>Please confirm your entries</h2>
            <h3>Campaign Title</h3>
            <p>{title}</p>
            <br />
            <h3>Subject Line</h3>
            <p>{subject}</p>
            <br />
            <h3>Email Body</h3>
            <p>{body}</p>
            <br />
            <h3>Recipient List</h3>
            <p>{recipients}</p>
            <br />
            { creditError && <p className='alert alert-warning'>{creditError}</p> }
            { infoMessage && <p className='alert alert-success'>{infoMessage}</p> }
            { isSuccess && <p>{'redirect to your dashboard in 3 seconds.'}</p>}
            <button className='btn btn-lg btn-outline-danger' type="button" onClick={()=>{setIsFinalize(false)}}>Back</button>
            <button className='btn btn-lg btn-outline-primary ms-4' type="button" onClick={handleSendSurvey}>SEND SURVEY!</button>
          </div>


        }

    </div>
  )
}
