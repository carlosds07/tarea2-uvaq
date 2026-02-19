import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [search, setSearch] = useState("");

  const addTask = (urgent = false) => {
    if (!title || !dateTime) return;

    const newTask = {
      id: Date.now(),
      title,
      details,
      dateTime,
      completed: false,
    };

    if (urgent) {
      setTasks([newTask, ...tasks]);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDetails("");
    setDateTime("");
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>To Do Application</h1>

      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <textarea
        placeholder="Task Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <br /><br />
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
      <br /><br />
      <button onClick={() => addTask(false)}>Add Task</button>
      <button onClick={() => addTask(true)}>Add Urgent Task</button>

      <h2>Search Task</h2>
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Task List</h2>
      {filteredTasks.map((task) => (
        <div key={task.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{task.title}</h3>
          <p>{task.details}</p>
          <p>{task.dateTime}</p>
          {!task.completed && (
            <button onClick={() => completeTask(task.id)}>Complete</button>
          )}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}

      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
