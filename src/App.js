import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from 'react';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect } from 'react';

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

  // Initial state for tasks
  const [tasks, setTasks] = useState([]);

  // // To fetch the data from db (mock seerver) as soon as the page is loaded, useEffect is used with an empty array dependency
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;

    // fetchTasks funtion is not used directly inside useEffect as this is needed for many other requirements too. So, getTasks is called inside useEffect that calls fetchTasks.
  };

  // Add Task
  // To add a task not only to UI, but to the server too:
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json(); // new task added

    setTasks([...tasks, data]); // new data is added to the existing tasks.

    // BEFORE BACKEND
    /*const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1;
        const newTask = { id, ...task };
        setTasks([...tasks, newTask]);

        // addTask takes 'task' parameter which is the form input. This contains text, day, and reminer. But, id will be missing. So, a unique id is generated for each new task added. Then, the new task will be this new id and all the other properties from from input. This new task will be added to the tasks lisk using setTasks method which displays the current tasks followed by the new task added.

        // This adds the tasks to UI, not to the server and with page refresh the added task would disappear.
    }; */
  };

  // Delete Task
  const deleteTask = async (id) => {
    // To delete a task from the server (not only from UI) when clicked on 'x':
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

    // When clicked on delete icon of a task, if the id is matching with the one which is clicked, then it will be removed from the UI:
    setTasks(tasks.filter((task) => task.id !== id));

    // Display the tasks whose id is not as same as the id of the task whose 'x' is clicked. So, doesn't display the task whose 'x' is clicked.

    // BEFORE BACKEND:
    /*  const deleteTask = (id) => {
      // When clicked on delete icon of a task, if the id is matching with the one which is clicked, then it will be removed from the UI:
      setTasks(tasks.filter((task) => task.id !== id));

      // This deletes the tasks from UI, not from the server and with page refresh the deleted task would re-appear.
    } */
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
    <Router>
      <div className="App">
        <div className="container">
          <Header
            title="TT"
            onAddClick={() => setShowAddTask(!showAddTask)}
            showAddTaskValue={showAddTask}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <>
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
              </>
            )}
          />

          <Route path="/about" component={About} />
          <Footer />
        </div>
      </div>
    </Router>

    // This completes the UI. If this is enough, "npm run build" can be run to get the production build and deploy. If a backend is to be connect to get the data, "json-server" is used to mock backend and access data from it with db.json file instead of having data in App component.
  );
}

export default App;
