
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";


const Home = () => {
    return (
        <div className="container mx-auto">
         <Navbar></Navbar>
         <Outlet></Outlet>
        </div>
    );
};

export default Home;