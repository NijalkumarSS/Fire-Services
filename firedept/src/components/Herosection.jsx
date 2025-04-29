import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import LoginPage from '../Loginpage';

function HeroSection() {
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
            <Link to="/login"><button className="btn me-2 text-light backgroundColour" >Get Started</button></Link>
            <button className="btn btn-outline-dark">Request Demo</button>
            <Link to="/adminpage">Admin</Link>
            <Link to="/building">Building</Link>
          </div>
          <div className="col-md-6">
            <div className="bg-light rounded-3 d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
              <img src="https://www.fire-monitoring.com/wp-content/uploads/2024/02/FMC_Blog_FireAlarmVsFireAlarmMonitoring.png" alt="Placeholder" width="100%" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default HeroSection;
  