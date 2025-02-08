import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Storage/Authslice";
import { FaReact } from "react-icons/fa";


const Navbar = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const handleOut = () => {
        dispatch(logout())
    }
  

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                   
                    <p className="text-green-600 font-bold text-xl px-5 flex justify-center items-center gap-2"> <span><FaReact></FaReact></span> DoIt </p>
                </div>

                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                    </button>

                    {isAuthenticated ? <button onClick={handleOut} className="btn">Logout</button> : <Link to={'login'}><button className="btn">log in</button></Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;