import { useState } from 'react';

const Tasks = () => {
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

  return (
    <div>
      {tasks.map((task) => (
        <h3 key={task.id}>{task.text}</h3>
      ))}
    </div>
  );
};

export default Tasks;
