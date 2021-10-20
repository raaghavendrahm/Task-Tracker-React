import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from 'react';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  /* 
  - showAddTask state is used to decide whether or not to display AddTask component.
  - Value of showAddTask is false by default and that doesn't display AddTask component.
  - The true and false value of showAddTask is toggle by click on Add button.
  - This will be false by default and when clicked, its value will change to true and the AddTask component will be displayed.
  - onAddClick prop uses setShowAddTask method to toggle the current boolean value of showAddTask. This happens with click on Add button. This prop is passed from App to Header.
  - If the state of showAddTask is true, using the conditional, the AddTask component will be displayed.
  - showAddTaskValue prop holds the current boolean value of showAddTask. If true, the AddTask component will be displayed, text of the button will be 'Close', and its color will be red. If false, the AddTask component will not be displayed, text of the button will be 'Add', and its color will be green.
  - All the above props are embedded in the return function.
  
  */

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Task One',
      day: 'Day One',
      reminder: true,
    },

    {
      id: 2,
      text: 'Task Two',
      day: 'Day Two',
      reminder: true,
    },

    {
      id: 3,
      text: 'Task Three',
      day: 'Day Three',
      reminder: false,
    },
  ]);

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);

    // addTask takes 'task' parameter which is the form input. This contains text, day, and reminer. But, id will be missing. So, a unique id is generated for each new task added. Then, the new task will be this new id and all the other properties from from input. This new task will be added to the tasks lisk using setTasks method which displays the current tasks followed by the new task added.
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));

    // Display the tasks whose id is not as same as the id of the task whose 'x' is clicked. So, doesn't display the task whose 'x' is clicked.
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );

    // Toggle the boolean value of reminder of the task which is double clicked. A green left border is added to it which is styled in Task component by adding 'reminder' class.
  };

  return (
    <div className="App">
      <div className="container">
        <Header
          title="TT"
          onAddClick={() => setShowAddTask(!showAddTask)}
          showAddTaskValue={showAddTask}
        />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          'No Tasks To Show'
        )}
      </div>
    </div>
  );
}

export default App;
