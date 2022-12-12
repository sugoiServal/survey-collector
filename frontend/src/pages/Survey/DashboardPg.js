import { useSubscribeAuthContext } from '../../hooks/useSubscribeAuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DashboardPg() {
  const { user, authIsReady } = useSubscribeAuthContext()
  const [ surveyList, setSurveyList ] = useState('')
  useEffect(() => {
    // fetch all campaign from server
    const getSurveys = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/surveys/`, {
        method: "GET",
        credentials: 'include' ,
      })
      if (res.ok) {
        const msg = await res.json()
        if(msg.status === 'ok') {
          setSurveyList(msg.userSurvey)
        }
      } else { 
        console.log("ERROR!!", res);
      }
    }
    getSurveys()
  }, [])

  const navigate = useNavigate();
  const handleNewServeyIcon = () => {
    navigate('/surveys/new')
  }
  return (
    <>
      <button onClick={handleNewServeyIcon}>CreateNew</button>
      {surveyList &&
        <div className='bg-light mt-5'>
            <div class="container-lg text-center">
              <h2>Your dashboard</h2>
              <p class="lead text-muted">Active Surveys</p>
            </div>
            <div className="row my-5 align-items-center justify-content-center g-1">
              {surveyList && surveyList.map(survey => (
                <div class="col-8 col-lg-4 col-xl-3">
                  <div className="card border-1 border-primary" key={survey._id}>
                    <p>{survey.title}</p>
                    <p>{survey.body}</p>
                    <p>{`Sent On::${survey.dateSent.slice(0,survey.dateSent.indexOf('T'))}`}</p>
                    <span>{`YES:${survey.yes}`}</span>
                    <span>{`NO:${survey.no}`}</span>
                  </div>
                </div>
              ))}
            </div>   
        </div>
      }
    </>
  )
}
