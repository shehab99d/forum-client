import { useContext, useState } from 'react';
import { AuthContext } from '../Router/Authentication/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router';

const JoinUs = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const { googleSignIn, createUser, signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || '/';


    // ✅ Google Sign In
    const handleGoogleLogin = async () => {
        try {
            await googleSignIn();
            Swal.fire({
                title: 'Login Successful',
                text: 'You have been logged in successfully.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay',
            });
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Google login failed.',
                icon: 'error',
            });
        }
    };

    // ✅ Register new user
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUser(email, password);
            Swal.fire({
                title: 'Account Created!',
                text: 'Your account has been created successfully.',
                icon: 'success',
            });
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: 'Registration Failed',
                text: err.message || 'Something went wrong.',
                icon: 'error',
            });
        }
    };

    // ✅ Sign in user
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInUser(loginEmail, loginPassword);
            Swal.fire({
                title: 'Login Successful',
                text: 'Welcome back!',
                icon: 'success',
            });
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: 'Login Failed',
                text: err.message || 'Invalid credentials.',
                icon: 'error',
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    return (
        <div className="lg:py-0 py-36 md:py-44 flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 px-4">
            <div className="relative flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[600px] rounded-2xl shadow-xl overflow-hidden bg-white">
                {/* Registration Form */}
                {!showLogin && (
                    <div className="w-full md:w-1/2 p-10">
                        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Create Account</h2>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <input onChange={(e) => setName(e.target.value)} type="text" required placeholder="Full Name" className="input w-full bg-white text-black border border-gray-300" />
                            <input onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email" className="input w-full bg-white text-black border border-gray-300" />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Password" className="input w-full bg-white text-black border border-gray-300" />

                            {/* File Upload */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">Upload Profile Picture</label>
                                <input
                                    type="file"
                                    required
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input rounded-md border border-black file-input-bordered w-full bg-white text-black"
                                />
                                {selectedFile && (
                                    <p className="text-sm mt-2 text-green-600">
                                        Selected: {selectedFile.name}
                                    </p>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary w-full">Register</button>
                        </form>
                        <div className="divider text-black before:bg-black after:bg-black">OR</div>

                        <button
                            onClick={handleGoogleLogin}
                            className="btn w-full border border-gray-300 bg-white text-black hover:bg-gray-100 rounded-full"
                        >
                            <FcGoogle className="text-2xl mr-2" /> Continue with Google
                        </button>
                    </div>
                )}

                {/* Login Form */}
                {showLogin && (
                    <div className="w-full md:w-1/2 p-10 bg-white z-10">
                        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Sign In</h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input onChange={(e) => setLoginEmail(e.target.value)} required type="email" placeholder="Email" className="input w-full bg-white text-black border border-gray-300" />
                            <input onChange={(e) => setLoginPassword(e.target.value)} required type="password" placeholder="Password" className="input w-full bg-white text-black border border-gray-300" />
                            <button type="submit" className="btn btn-primary w-full">Login</button>
                        </form>
                        <div className="divider text-black before:bg-black after:bg-black">OR</div>
                        <button
                            onClick={handleGoogleLogin}
                            className="btn w-full border border-gray-300 bg-white text-black hover:bg-gray-100 rounded-full"
                        >
                            <FcGoogle className="text-2xl mr-2" /> Continue with Google
                        </button>
                        <p className="mt-6 text-black text-center text-sm">
                            Don't have an account?{' '}
                            <button
                                onClick={() => setShowLogin(false)}
                                className="text-blue-600 font-semibold"
                            >
                                Register here
                            </button>
                        </p>
                    </div>
                )}

                {/* Right Panel */}
                <div className={`w-full md:w-1/2 p-10 flex flex-col justify-center items-center ${showLogin ? 'bg-blue-600' : 'bg-blue-600'} text-white rounded-b-2xl md:rounded-none md:rounded-l-2xl`}>
                    {showLogin ? (
                        <>
                            <h2 className="text-3xl font-bold mb-4 text-center">Don't have an account?</h2>
                            <p className="mb-6 text-center">Click below to register now</p>
                            <button
                                onClick={() => setShowLogin(false)}
                                className="btn bg-white text-blue-600 hover:bg-gray-200 font-semibold"
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold mb-4 text-center">Already have an account?</h2>
                            <p className="mb-6 text-center">Click below to sign in</p>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="btn bg-white text-blue-600 hover:bg-gray-200 font-semibold"
                            >
                                Sign In
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
