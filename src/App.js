import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //3
  const [todosPerPage, setTodosPerPage] = useState(10); //10
  const totalPages = Math.ceil(todos.length / todosPerPage); //20
  const totalPagesOfTodos = [...Array(totalPages + 1).keys()].slice(1);
  const todoLastIndex = currentPage * todosPerPage;
  const todoStartingIndex = todoLastIndex - todosPerPage;
  const visibleTodos = todos.slice(todoStartingIndex, todoLastIndex);
  const onClickNext = () => setCurrentPage(currentPage + 1);
  const onClickPrevious = () => setCurrentPage(currentPage - 1);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);
  return (
    <>
      <h1>Turing Test</h1>
      <select
        onChange={(e) => setTodosPerPage(e.target.value)}
        value={todosPerPage}
      >
        <option value="10"> 10 </option>
        <option value="20"> 20 </option>
        <option value="40"> 40 </option>
      </select>
      <div className="App">
        {visibleTodos.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
        <button disabled={currentPage < 2} onClick={onClickPrevious}>
          Prev
        </button>
        {totalPagesOfTodos.map((page) => (
          <span
            className={currentPage === page ? "active" : null}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {` ${page} | `}
          </span>
        ))}
        <button disabled={currentPage === totalPages} onClick={onClickNext}>
          Next
        </button>
      </div>
    </>
  );
}

