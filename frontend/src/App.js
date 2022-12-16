import {BrowserRouter, Routes, Route, Navigate, Redirect} from 'react-router-dom'
// pages
import LandingPg from './pages/LandingPg'  
import DashboardPg from './pages/Survey/DashboardPg'  
import CreateSurveyPg from './pages/Survey/CreateSurveyPg'  
import PaySuccessPg from './pages/Payment/PaySuccessPg'  
import NotFoundPg from './pages/NotFoundPg' 
import LoginPg from './pages/LoginPg' 
// components
import Header from './components/Header'
import { useSubscribeAuthContext } from './hooks/useSubscribeAuthContext'
require ('./configs/env.js')
function App() {
  const { user, authIsReady } = useSubscribeAuthContext()
  return (
    <div className="App">
      {authIsReady  &&
          <BrowserRouter>
            <Header />
            <div className="page">
              <Routes>
              <Route 
                  path="/"
                  element={!user ? <LandingPg /> : <Navigate to="/surveys"/>} 
                />

              <Route 
                  path="/surveys"
                  element={user ? <DashboardPg /> : <Navigate to="/" />} 
                />  
              <Route 
                  path="/surveys/new"
                  element={user ? <CreateSurveyPg /> : <Navigate to="/" />} 
                />  
                
              <Route path="/checkout/success"
                element={<PaySuccessPg/>}
              /> 
              <Route path="/login"
                element={!user ? <LoginPg/>:<Navigate to="/"/>}
              /> 
              LoginPg
              <Route path="/404"
                element={<NotFoundPg/>}
              />   

              <Route path="*"
                element={<Navigate to="/404"/> }
              />   

              </Routes>
            </div>
          
          </BrowserRouter>
        }
    </div>
  );
}

export default App;
