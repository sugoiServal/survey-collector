import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LandingPg from './pages/LandingPg'  
import DashboardPg from './pages/DashboardPg'  
import CreateSurveyPg from './pages/CreateSurveyPg'  
import Header from './components/Header'
import { useSubscribeAuthContext } from './hooks/useSubscribeAuthContext'
// require ('./configs/env.js')
function App() {
  const { user, authIsReady } = useSubscribeAuthContext()
  authIsReady && console.log(user)
  console.log(process.env.REACT_APP_API_URL)
  return (
    <div className="App">
      {authIsReady &&
        <BrowserRouter>
          <Header />
          <div className="page">
            <Routes>
            <Route 
                path="/"
                element={<LandingPg />} 
              />

            <Route 
                path="/surveys"
                element={user ? <DashboardPg /> : <Navigate to="/" />} 
              />  
            <Route 
                path="/surveys/new"
                element={user ? <CreateSurveyPg /> : <Navigate to="/" />} 
              />  

            </Routes>
          </div>
        
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
