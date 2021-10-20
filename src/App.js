import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from 'react';

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
