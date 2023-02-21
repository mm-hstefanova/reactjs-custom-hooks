import { useState, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [task, setTask] = useState(null);

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  // no need of useCallback because this function will be called only when we execute enterTaskHandler
  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    setTask(createdTask);

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://reactjs-http-eb2df-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { text: taskText },
      },
      // with .bind we configure our function to accept more arguments
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
