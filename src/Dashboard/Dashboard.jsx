import { useSelector } from "react-redux";
import { CiCalendar, CiMemoPad, CiStar } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const { tasks, completedTasks } = useSelector((state) => state.tasks);

    // Calculate percentages for the donut chart
    const totalTasks = tasks.length + completedTasks.length;
    const completedPercentage = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;
    const pendingPercentage = 100 - completedPercentage;

    if (!user) {
        return <div></div>;
    }

    return (
        <div className="flex h-screen">
            {/* Left Sidebar */}
            <div className="w-3/12 min-h-screen p-6 border-r border-gray-200">
                {/* User Info */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="https://i.ibb.co/x3WJSDj/img.jpg"
                        alt="User"
                        className="w-[100px] h-[100px] rounded-full mb-4"
                    />
                    <p className="text-lg font-bold text-gray-800">Hey, {user?.username}</p>
                </div>

                {/* Navigation */}
                <div className="space-y-6 mb-8">
                    <p className="flex items-center gap-3 text-gray-700 font-semibold hover:bg-gray-100 p-3 rounded cursor-pointer">
                        <CiMemoPad className="text-xl" /> All Tasks
                    </p>
                    <Link to={'today'} className="flex items-center gap-3 font-semibold p-3 rounded cursor-pointer">
                        <CiCalendar className="text-xl" /> Today
                    </Link>
                    <p className="flex items-center gap-3 text-gray-700 font-semibold hover:bg-gray-100 p-3 rounded cursor-pointer">
                        <CiStar className="text-xl" /> Important
                    </p>
                    <p className="flex items-center gap-3 text-gray-700 font-semibold hover:bg-gray-100 p-3 rounded cursor-pointer">
                        <FaBookOpen className="text-xl" /> Planned
                    </p>
                    <p className="flex items-center gap-3 text-gray-700 font-semibold hover:bg-gray-100 p-3 rounded cursor-pointer">
                        <MdAssignmentInd className="text-xl" /> Assigned to Me
                    </p>
                </div>

                {/* Add Task Section */}
                <div className="mb-8">
                    <p className="text-gray-700 font-semibold text-center cursor-pointer hover:underline">
                        + Add List
                    </p>
                </div>

                {/* Today Tasks */}
                <div className="mb-6">
                    <p className="text-lg font-bold text-gray-700">Today Tasks</p>
                    <div className="flex items-center mt-2 gap-2">
                        <p className="text-2xl font-bold text-gray-700">{tasks.length}</p>
                        <button
                            title="Task Details"
                            className="text-gray-500 hover:text-gray-800"
                        >
                            ⓘ
                        </button>
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="w-44 h-44 mx-auto pb-7 relative">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#d1d5db"
                            strokeWidth="4"
                        />
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="4"
                            strokeDasharray={`${completedPercentage}, ${pendingPercentage}`}
                            transform="rotate(-90 18 18)"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-semibold text-gray-700">
                        <p>{Math.round(completedPercentage)}%</p>
                        <p>Completed</p>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-4 flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span> Completed
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-gray-400 rounded-full"></span> Pending
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="w-9/12 bg-white p-6">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
