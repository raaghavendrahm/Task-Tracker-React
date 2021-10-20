import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from 'react';
import AddTask from './components/AddTask';

function App() {
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
        <Header title="TT" />
        <AddTask onAdd={addTask} />
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
