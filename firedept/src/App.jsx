import { useState } from 'react'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import './App.css'
import LoginPage from './Loginpage'
import Signup from './pages/Signup'
import Home from './components/Home'
import About from './About'
import Contact from './components/Contact'
import Adminpage from './components/Adminpage'
import Building from './components/Building'
import FeaturesPage from './pages/FeaturesPage'
import AdminSignUp from './pages/AdminSignUp'
import AdminLogin from './pages/AdminLogin'
import UsersPage from './pages/UsersPage'
import UploadDocument from './components/UploadDocument'
import UserContent from './components/UserContent'
import UploadContent from './components/UploadContent'
import LicenseUpload from './components/LicenseUpload'
import Overview from './components/Overview'
import UploadSuccess from './components/UploadSuccess'
import Documents from './components/Documents'
import NotificationsPanel from './pages/NotificationsPanel'
import NotificationHistory from './components/NotificationHistory'
import VerifyOTP from './components/VerifyOTP'
import VerifySignup from './components/VerifySignup'
import NocPreview from './pages/NocPreview'
import NocCertificate from './pages/NocCertificate'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import VerifyForgotPassword from './components/VerifyForgotPassword'




function App() {
   

  return (
    <> 
     
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/adminpage' element={<Adminpage/>}/>
        <Route path='/building' element={<Building/>}/>
        <Route path='/features' element={<FeaturesPage/>}/>
        <Route path='/adminsignup' element={<AdminSignUp/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>} />
        <Route path='/userspage' element={<UsersPage/>} /> 
        <Route path='/usercontent' element={<UserContent/>} />
        <Route path='/uploadcontent' element={<UploadContent/>} />
        <Route path='/licenseupload' element={<LicenseUpload/>} />
        <Route path='/overview' element={<Overview/>}/>
        <Route path='/uploaddocument' element={<UploadDocument/>}></Route>
        <Route path='/uploadsuccess' element={<UploadSuccess/>}/>
        <Route path='documents' element={<Documents/>}/>
        <Route path='/notificationpanel' element={<NotificationsPanel/>}/>
        <Route path="/notifications" element={<NotificationHistory />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path='/verifysignup' element = {<VerifySignup/>}/>
        <Route path='/preview' element = {<NocPreview/>}/>
        <Route path='/certificate' element ={<NocCertificate/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>}/>
        <Route path='/verifyforgotpass' element={<VerifyForgotPassword/>}/>
      </Routes>
    </BrowserRouter>

    
    </>
  )
}

export default App
