import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import fireimage from '../assets/FireImage.png'


function HeroSection() {

  const navigate = useNavigate()
  const forward = () =>{
    const storedEmail = localStorage.getItem('GetEmail')
    console.log(storedEmail);
    

    if(storedEmail === null){
      navigate("/login")

    }
    else{
      navigate('/userspage')
    }
  }
    return (
      <div className="container py-5 " style={{marginTop:'50px'}} >
        <div className="row align-items-center">
          <div className="col-md-6 " >
            <h1 className="fw-bold mb-3 display-5">
              Advanced Fire Monitoring & <br /> Verification System
            </h1>
            <p className="text-muted mb-4">
              Comprehensive fire safety management with real-time monitoring, document verification,
              and instant alerts for both administrators and users.
            </p>
            <button className="btn me-2 text-light backgroundColour" onClick={forward}>Get Started</button>
            <button className="btn btn-outline-dark">Request Demo</button>
          </div>
          <div className="col-md-6">
            <div className="bg-light rounded-3 d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
              <img src={fireimage} className='rounded' alt="Placeholder" width="100%" />
            </div>
          </div>
        </div>

      </div>
    );
  }
  
  export default HeroSection;
  