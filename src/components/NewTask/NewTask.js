import { useState, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [task, setTask] = useState(null);

  const httpOptions = {
    method: 'POST',
    body: JSON.stringify({ text: task.text }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const [data, isLoading, error] = useHttp(
    'https://reactjs-http-eb2df-default-rtdb.firebaseio.com/tasks.json',
    httpOptions
  );

  const enterTaskHandler = (taskText) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    setTask(createdTask);

    props.onAddTask(createdTask);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
