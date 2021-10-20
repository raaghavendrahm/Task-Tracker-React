import { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text || !day) {
      alert('Please enter task and day');
      return;
    }

    // onAdd
    onAdd({ text, day, reminder }); // corresponding values are considered for text, day, and reminder (this is simplifed due to ES6. Else, it would be text: text, day: day, reminder: reminder).

    // Clearing form
    setText('');
    setDay('');
    setReminder(false); // false is the default value for reminder and for this state, the checkbox should not be checked. This is ensured by 'checked={reminder}' property in Set Reminder input which means the box should be checked if the value is true.
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      {/* onSubmit is called first to perform input validation, followed by onAdd */}

      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text} // value of the typed text
          onChange={(e) => setText(e.target.value)} // fires off as soon as anything is typed and value of the text will be assigned to the value typed.
        />
      </div>

      <div className="form-control">
        <label>Day</label>
        <input
          type="text"
          placeholder="Add Day"
          value={day} // value of the typed day
          onChange={(e) => setDay(e.target.value)} // fires off as soon as anything is typed and value of the day will be assigned to the value typed.
        />
      </div>

      <div className="form-control form-control-check">
        {/* Additional className of 'form-control-check' makes the text and checkbox align horizonatally */}

        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder} // is a short-form conditional that says if true, box to be checked
          value={reminder} // true if checked
          onChange={(e) => setReminder(e.currentTarget.checked)} // considers true if checked
        />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
