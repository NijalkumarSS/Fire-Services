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



function App() {
  const [count, setCount] = useState(0)

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
        <Route path='/uploaddocument' element={<UploadDocument/>}/>
        <Route path='/usercontent' element={<UserContent/>} />
        <Route path='/uploadcontent' element={<UploadContent/>} />
        <Route path='/licenseupload' element={<LicenseUpload/>} />
        <Route path='/overview' element={<Overview/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
