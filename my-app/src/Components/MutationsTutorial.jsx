import React, { useEffect, useState } from 'react';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import api from '../apis/streams';
import ErrorModal from './ErrorModal';

export default function TailWindTextArea(props) {
  const { textAreaValue, setTextAreaValue } = props;

  return (
    <div className="w-full">
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700">
        Add some details...
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          onChange={(e) => setTextAreaValue(e.target.value)}
          value={textAreaValue}
          name="comment"
          id="comment"
          className="shadow-sm block w-full focus:outline-none border-2 p-0 text-gray-900 placeholder-gray-500 sm:text-sm h-18 min-w-full mt-2"
        />
      </div>
    </div>
  );
}

async function fetchTodos() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return api.get('/todos').then((res) => res.data);
}

async function addTodo({ todoValue, textAreaValue }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return api.post('/todos', { todo: todoValue, details: textAreaValue.trim() });
}

async function fetchTodo(id) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return api.get(`/todos/${id}`).then((res) => res.data);
}

async function patchTodo({ id, todoValue, textAreaValue }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return api
    .patch(`/todos/${id}`, { todo: todoValue, details: textAreaValue })
    .then((res) => res.data);
}

export function PatchTodos({ viewPostId, setViewPostId }) {
  const { isLoading, data, isFetching } = useQuery(
    ['todo', viewPostId],
    async () => {
      return api.get(`/todos/${viewPostId}`).then((res) => res.data);
    },
  );

  const toggleView = () => {
    if (isLoading) return <h1 className="font-bold p-4">Loading...</h1>;
    return (
      <>
        <div className="font-bold text-xl">
          <h1>{data.todo}</h1>
        </div>
        <div className="text-lg">
          <h1>{data.details}</h1>
        </div>
        <EditTodo
          todo={data.todo}
          id={viewPostId}
          setViewPostId={setViewPostId}
          details={data.details}
        />
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-start m-4">
        {isFetching ? <p>Updating...</p> : null}
        {toggleView()}
      </div>
      <button
        className="mt-1 mb-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setViewPostId(false)}>
        Back
      </button>
    </>
  );
}

export function EditTodo({ id, todo, details, setViewPostId }) {
  const [todoValue, setTodoValue] = useState(todo);
  const [textAreaValue, setTextAreaValue] = useState(details);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const queryClient = useQueryClient();

  console.log(todoValue, textAreaValue);

  const { isLoading, isError, mutate, isSuccess, reset } = useMutation(
    patchTodo,
    {
      onSuccess: (data, values) => {
        console.log('values', values, data);
        queryClient.setQueryData(['todo', values.id], data);
        queryClient.invalidateQueries('todos');
      },

      onError: (error) =>
        setErrorModalVisible({
          heading: error.response.data.message,
          close: () => setErrorModalVisible(false),
        }),
    },
  );

  function handleSubmitTodo(e) {
    e.preventDefault();
    mutate({ id, todoValue, textAreaValue });
    setTodoValue('');
    setTextAreaValue('');
    setViewPostId(false);
  }

  return (
    <form onSubmit={handleSubmitTodo}>
      {errorModalVisible && <ErrorModal errorData={errorModalVisible} />}
      <div className="flex flex-col justify-center items-center m-4">
        <div className="m-4 relative border w-full border-gray-300 rounded-md px-3 py-2 shadow-sm ">
          <label
            htmlFor="Title"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
            To-Do
          </label>
          <input
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            onClick={() => reset()}
            type="text"
            name="Title"
            id="Title"
            className="block w-full focus:outline-none border-0 p-0 text-gray-900 placeholder-gray-500 sm:text-sm h-8 min-w-max"
            placeholder="Enter To-Do..."
          />
        </div>
        <TailWindTextArea
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
        />
        <button
          type="submit"
          className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {isError
            ? 'Error!'
            : isLoading
            ? 'Saving...'
            : isSuccess
            ? 'Saved!'
            : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export function CreateTodo() {
  const [todoValue, setTodoValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, isError, mutate, isSuccess, reset } = useMutation(
    addTodo,
    {
      onSuccess: () => queryClient.invalidateQueries('todos'),
      onError: (error) =>
        setErrorModalVisible({
          heading: error.response.data.message,
          close: () => setErrorModalVisible(false),
        }),
    },
  );

  function handleSubmitTodo(e) {
    e.preventDefault();
    mutate({ todoValue, textAreaValue });
    setTodoValue('');
    setTextAreaValue('');
  }

  return (
    <form onSubmit={handleSubmitTodo}>
      {errorModalVisible && <ErrorModal errorData={errorModalVisible} />}
      <div className="flex flex-col justify-center items-center m-4">
        <div className="m-4 relative border w-full border-gray-300 rounded-md px-3 py-2 shadow-sm ">
          <label
            htmlFor="Title"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
            To-Do
          </label>
          <input
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            onClick={() => reset()}
            type="text"
            name="Title"
            id="Title"
            className="block w-full focus:outline-none border-0 p-0 text-gray-900 placeholder-gray-500 sm:text-sm h-8 min-w-max"
            placeholder="Enter To-Do..."
          />
        </div>
        <TailWindTextArea
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
        />
        <button
          type="submit"
          className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {isError
            ? 'Error!'
            : isLoading
            ? 'Saving...'
            : isSuccess
            ? 'Saved!'
            : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export function TodoList() {
  const [viewPostId, setViewPostId] = useState(false);
  const { isLoading, isError, data, isFetching } = useQuery(
    'todos',
    fetchTodos,
  );

  function renderTodos() {
    if (isLoading) return null;
    return data.map((item, index) => {
      return (
        <li
          onClick={() => {
            console.log(item);
            setViewPostId(item);
          }}
          className="mt-1 text-blue-700 mb-1 cursor-pointer"
          key={item.createdAt}>
          {index + 1}. {item.todo}
        </li>
      );
    });
  }

  return (
    <div className="flex flex-col  m-4">
      {/* {isError && <h1>{error.message}</h1>}
      {isLoading && <h1>Loading...</h1>}
      {isFetching && <h1>Updating...</h1>} */}
      <div className="flex flex-row justify-start">
        <span className="font-bold text-2xl underline mb-1 mt-1">To-Do's</span>
        <br></br>
        <span className="font-bold text-2xl mb-1 mt-1">
          {isLoading
            ? '...'
            : isFetching
            ? '...updating'
            : isError
            ? 'error'
            : ':'}
        </span>
      </div>
      <ul>
        {!viewPostId ? (
          <>
            {renderTodos()}
            <CreateTodo />
          </>
        ) : (
          <PatchTodos
            viewPostId={viewPostId.id}
            setViewPostId={setViewPostId}
          />
        )}
      </ul>
    </div>
  );
}
