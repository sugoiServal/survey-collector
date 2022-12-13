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
      {user &&
        <div className="container-lg" id='info'>
          <div className="d-flex flex-column">
              <p className="lead align-self-end">{`Login as ${user.authType}:`} <u>{`${user.uid}`}</u></p>
          </div>
        </div>
      }
      {surveyList &&
        <div className='bg-light'>
            <div class="container-lg text-center">
              <h2 className='m-4'>Your dashboard</h2>
              <p class="lead text-muted">Active Surveys</p>
            </div>
            <div className="container-lg m-auto">
              <div className="row my-5 align-items-center justify-content-center g-1" >
                {surveyList && surveyList.map(survey => (
                  <div class="col-8 my-2">
                    <div className="card shadow-sm" key={survey._id}>
                      <div className="card-body">
                        <div className="d-flex flex-column">
                            <h3 className='fs-2 display-6'>{survey.title}</h3>
                            <h6 className='card-subtitle text-muted' >{survey.body}</h6>
                            <span className='align-self-end'>{`Sent On: ${survey.dateSent.slice(0,survey.dateSent.indexOf('T'))}`}</span>
                            <hr/>
                        </div>
                            <span className="fs-6 text-warning d-inline">{`YES :${survey.yes}`}</span>
                            <span className="fs-6 text-warning d-inline ms-3">{`NO :${survey.no}`}</span>
                      </div>

                    </div>
                  </div>
                ))}
              </div> 
            </div>  
        </div>
      }
      <button onClick={handleNewServeyIcon}>CreateNew</button>
    </>
  )
}
