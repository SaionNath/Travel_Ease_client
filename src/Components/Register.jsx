import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const { createUser, loginWithGoogle, setUser} = use(AuthContext);
    const [error, setEror] = useState("")
    const navigate = useNavigate()

    const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const Name = form.name.value;
    const URL = form.url.value;
    const Email = form.email.value;
    const Password = form.password.value;

    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;

    if (Password.length < 6) {
    setEror("Password must be at least 6 characters long.");
    return;
    }

    if (!uppercasePattern.test(Password)) {
    setEror("Password must contain at least one uppercase letter.");
    return;
    }

    if (!lowercasePattern.test(Password)) {
    setEror("Password must contain at least one lowercase letter.");
    return;
    }

    createUser(Email, Password)
    .then((result) => {
      const USER = result.user;
      // console.log(USER);
      updateProfile(USER, {
        displayName: Name,
        photoURL: URL
      })
      .then(() => {
        setUser({...USER});
        navigate("/");
      })
      .catch(err => 
        setEror(err.message));
    })
    .catch((error) => {
      setEror(error.message);
      
    })
    
  };

    const googleLogin = () => {
        loginWithGoogle()
            .then((result) => {
            setUser(result.user);
            navigate("/");
            })
            .catch((err) => alert(err.message));
        };

    useEffect(() => {
    document.title = "Registration";
  }, []);

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister} >
                            <fieldset className="fieldset">
                            {/* name */}
                            <label className="label">Name</label>
                            <input type="text" name='name' className="input" placeholder="Your name" />
                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />
                            {/* photo url */}
                            <label className="label">Photo URL</label>
                            <input type="text" name='url' className="input" placeholder="Your Photo Url" />
                            {/* password */}
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />

                            <div><p className="">Already have an account?<Link to='/login' className="text-blue-500 link link-hover">Login</Link></p></div>
                            
                            {
                                error && <p className='text-red-500 text-sm mb-3'>{error}</p>
                            }
                            <button className="btn btn-neutral mt-4">Register</button>
                            {/* google button */}
                            <button onClick={googleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                            </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;