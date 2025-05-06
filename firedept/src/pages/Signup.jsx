import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import login from '../assets/login.jpg'

export default function SignUp() {

  const navigate =useNavigate();

  const[postValue,setPostValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  })

  const[data,setData] = useState('')

  const handleValue = (event) => {
    setPostValue({...postValue,[event.target.name]:event.target.value})
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

     if(postValue.password == postValue.confirmpassword){
      const response = await axios.post("http://localhost:8080/project/Signup",postValue)
      if(response.data === 'Email exists'){
        alert('Email already exists')
      }
      else{
        if(postValue.username == "" || postValue.email == "" || postValue.password == "" || postValue.confirmpassword == ""){
          alert("Please fill all the fields");  
        }
        else{
          alert("Register Successfull")
          navigate("/login")
        }
      }
    }
    else {
      alert("Passwords do not match");
    }
  }

 
  return (
    <>
  <div className="container-fluid mt-0" 
    style={{
      backgroundImage: `url(${login})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height:'100vh',
    }}>
    <div className="d-flex justify-content-center " >
     
      <div className="border rounded p-4 shadow bg-white mt-5 " style={{ width: "400px"}}>
        <h3 className="mb-3 fw-bold textstyle">Sign Up</h3>
        <p className="text-muted">Create your account to get started</p>


        <form onSubmit={handleSubmit} className="mt-4">
        <label className="form-label textstyle">Full Name<span className="text-danger">{postValue.username === ''?'*':''}</span></label>
          <div className="mb-3 input-group">
            <span className="input-group-text"><i class="bi bi-person-circle"></i></span>
            <input type="text" className="form-control" 
            placeholder="Enter your name" 
            name="username"
            onChange={handleValue}/>
          </div>

          <label className="form-label textstyle">Email<span className="text-danger">{postValue.email === ''?'*':''}</span></label>
          <div className="mb-3 input-group">
            <span className="input-group-text"><i class="bi bi-person-vcard"></i></span>
            <input type="email" className="form-control " placeholder="Enter your email" 
            name="email"
            onChange={handleValue}/>
          </div>

          <label className="form-label textstyle">Password<span className="text-danger">{postValue.password === ''?'*':''}</span></label>
          <div className="mb-3 input-group">
          <span className="input-group-text"><i class="bi bi-shield-lock-fill"></i></span>
            <input type="password" className="form-control " 
            placeholder="********" 
            name="password"
            onChange={handleValue}/>
          </div>

          <label className="form-label textstyle">Confirm Password<span className="text-danger">{postValue.confirmpassword === ''?'*':''}</span></label>
          <div className="mb-3 input-group">
            <span className="input-group-text "><i class="bi bi-shield-lock-fill"></i></span>
            <input type="password" className="form-control" 
            placeholder="********" 
            name="confirmpassword"
            onChange={handleValue}/>
          </div>

          <button type="submit" className="btn btn-dark w-100">Sign Up</button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account? <Link to="/login">Login</Link>
          </small>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { auth } from "../firebase"; // Import auth
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import login from "../assets/login.jpg";

// export default function SignUp() {
//   const navigate = useNavigate();

//   const [postValue, setPostValue] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//   });

//   const handleValue = (event) => {
//     setPostValue({ ...postValue, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const { username, email, password, confirmpassword } = postValue;

//     if (!username || !email || !password || !confirmpassword) {
//       alert("Please fill all the fields");
//       return;
//     }

//     if (password !== confirmpassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       // Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Send data to backend if Firebase signup is successful
//       const response = await axios.post("http://localhost:8080/project/Signup", {
//         username,
//         email,
//         password,
//       });

//       if (response.data === "Email exists") {
//         alert("Email already exists");
//       } else {
//         navigate("/login");
//       }
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         alert("Email already in use in Firebase");
//       } else {
//         alert("Firebase signup failed: " + error.message);
//       }
//     }
//   };

//   return (
//     <div
//       className="container-fluid mt-0"
//       style={{
//         backgroundImage: `url(${login})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         height: "100vh",
//       }}
//     >
//       <div className="d-flex justify-content-center">
//         <div className="border rounded p-4 shadow bg-white mt-5" style={{ width: "400px" }}>
//           <h3 className="mb-3 fw-bold textstyle">Sign Up</h3>
//           <p className="text-muted">Create your account to get started</p>

//           <form onSubmit={handleSubmit} className="mt-4">
//             <label className="form-label textstyle">
//               Full Name
//               <span className="text-danger">{postValue.username === "" ? "*" : ""}</span>
//             </label>
//             <div className="mb-3 input-group">
//               <span className="input-group-text">
//                 <i className="bi bi-person-circle"></i>
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter your name"
//                 name="username"
//                 onChange={handleValue}
//               />
//             </div>

//             <label className="form-label textstyle">
//               Email
//               <span className="text-danger">{postValue.email === "" ? "*" : ""}</span>
//             </label>
//             <div className="mb-3 input-group">
//               <span className="input-group-text">
//                 <i className="bi bi-person-vcard"></i>
//               </span>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 name="email"
//                 onChange={handleValue}
//               />
//             </div>

//             <label className="form-label textstyle">
//               Password
//               <span className="text-danger">{postValue.password === "" ? "*" : ""}</span>
//             </label>
//             <div className="mb-3 input-group">
//               <span className="input-group-text">
//                 <i className="bi bi-shield-lock-fill"></i>
//               </span>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="********"
//                 name="password"
//                 onChange={handleValue}
//               />
//             </div>

//             <label className="form-label textstyle">
//               Confirm Password
//               <span className="text-danger">{postValue.confirmpassword === "" ? "*" : ""}</span>
//             </label>
//             <div className="mb-3 input-group">
//               <span className="input-group-text">
//                 <i className="bi bi-shield-lock-fill"></i>
//               </span>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="********"
//                 name="confirmpassword"
//                 onChange={handleValue}
//               />
//             </div>

//             <button type="submit" className="btn btn-dark w-100">
//               Sign Up
//             </button>
//           </form>

//           <div className="text-center mt-3">
//             <small className="text-muted">
//               Already have an account? <Link to="/login">Login</Link>
//             </small>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
