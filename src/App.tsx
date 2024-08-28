import { useState, useEffect } from 'react';
import { useLocalStorage } from './localStorage';
import './App.css';
import './todolist.css'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [nextId, setNextId] = useState(1);
  const [taskText, setTaskText] = useState('');

  // Initialiser nextId à 1 si aucune tâche n'est présente
  useEffect(() => {
    setNextId(1);
  }, []);

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (taskText.trim()) {
      const newTask: Task = { id: nextId, text: taskText, completed: false };
      setTasks([...tasks, newTask]);
      setTaskText('');
      setNextId(nextId + 1);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditTask = (id: number) => {
    const newText = prompt('Modifier la tâche', tasks.find(task => task.id === id)?.text);
    if (newText !== null && newText.trim()) {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      ));
    }
  };

  return (
    <>
      <h1>Liste des tâches</h1>
      
      <form onSubmit={handleAddTask}>
        <input
          placeholder="Ajouter une nouvelle tâche"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? 'Marquer comme non terminé' : 'Terminer'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
            <button onClick={() => handleEditTask(task.id)}>Modifier</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;