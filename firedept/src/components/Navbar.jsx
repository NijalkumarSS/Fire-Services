import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'



function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom shadow-sm sticky-top backgroundColour">
      <div className="container-fluid ">
        <Link className="navbar-brand fw-bold text-dark textstyle" to="/">
          <i className='fa-solid fa-fire-extinguisher me-2 text-light'></i>
          FireGuard
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end  " id="navContent">
          <ul className="navbar-nav me-5 mb-3 mb-lg-0 " >
            <li className="nav-item me-3"><Link className="nav-link text-light" to="/">Home</Link></li>
            <li className="nav-item me-3"><Link className="nav-link text-light" to="/features">Features</Link></li>
            <li className="nav-item me-3"><Link className="nav-link text-light" to="/about">About</Link></li>
            <li className="nav-item me-3"><Link className="nav-link text-light" to="/contact">Contact</Link></li>
            </ul>
            <div className=" d-flex justify-content-end  ms-5" id="navContent2"> 
            <ul className="navbar-nav ms-5 mb-3 mb-lg-0">
            {/* <li className="nav-item">
              <Link to="/login" className="btn btn-outline-light me-2">Log In</Link>
            </li> */}
            <div className='dropdown'>
            <button className='btn me-4 text-white' data-bs-toggle="dropdown" >Log In
            </button>
            <ul className='dropdown-menu bg-light'>
              <li ><Link to="/login" className="dropdown-item me-2">
                <i className="bi bi-person-circle me-2 textColour"></i> User</Link></li>
              <li><Link to="/adminlogin" className="dropdown-item">
              <i className="bi bi-shield-lock-fill me-2 textColour"></i>Admin</Link></li>
            </ul>
            </div>
            {/* <Link to="/signup">
            <button className='btn btn-outline-light me-2'>Sign In
            </button></Link> */}
          </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
//  export const AdminNavbar = () => {
  
//   return (
//     <>
    
//     {/* <Adminpage visible={visible}/> */}
// </>
//  )}


export default NavbarComponent;
