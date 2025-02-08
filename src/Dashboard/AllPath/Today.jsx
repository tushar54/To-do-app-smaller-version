import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, completeTask, setPriority } from '../../Storage/Taskslice';

const Today = () => {
  const [taskText, setTaskText] = useState('');
  const { tasks, completedTasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // Add a new task
  const handleAddTask = () => {
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        priority: 'Medium', // Default priority
      };
      dispatch(addTask(newTask));
      setTaskText('');
    }
  };

  // Mark task as complete
  const handleCompleteTask = (id) => {
    dispatch(completeTask(id));
  };

  // Delete a task
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  // Update task priority
  const handlePriorityChange = (id, priority) => {
    dispatch(setPriority({ id, priority }));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Todays Tasks</h2>
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600"
        >
          Add Task
        </button>
      </div>

      {/* Task Input */}
      <div className="mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a new task"
          className="p-2 border rounded w-full mb-2 focus:outline-green-500"
        />
      </div>

      {/* Active Tasks */}
      <h3 className="text-lg font-bold mb-4">Active Tasks</h3>
      {tasks.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center py-4 px-2 bg-white rounded-md shadow-sm hover:shadow-lg mb-3"
            >
              {/* Task Info */}
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  onChange={() => handleCompleteTask(task.id)}
                  className="w-5 h-5 text-green-500 rounded focus:ring-green-400"
                />
                <span className="text-gray-700 text-lg">{task.text}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                  className="p-1 border rounded bg-gray-100 focus:outline-green-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No active tasks available. Start adding tasks!</p>
      )}

      {/* Completed Tasks */}
      <h3 className="text-lg font-bold mt-6 mb-4">Completed Tasks</h3>
      {completedTasks.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center py-4 px-2 bg-gray-100 rounded-md shadow-sm hover:shadow-md mb-3"
            >
              {/* Task Info */}
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="w-5 h-5 text-green-500 rounded"
                />
                <span className="text-gray-500 line-through text-lg">{task.text}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No completed tasks yet.</p>
      )}
    </div>
  );
};

export default Today;
