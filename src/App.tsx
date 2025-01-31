import "./App.css";
import { useEffect, useState } from "react";
import { ITodo } from "./types/todo";
import TodoList from "./components/TodoList/TodoList";
import InputTodo from "./components/InputTodo/InputTodo";
import { TodoManager } from "./utils/TodoManager";

function App() {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        TodoManager.getInstance()
            .getAllTodos()
            .then((res) => {
                setTodos(res);
            });
    }, []);

    const handleDeleteAll = () => {
        TodoManager.getInstance()
            .deleteAllTodos()
            .then(() => setTodos([]));
    };

    return (
        <>
            <h1>Todo App</h1>
            <h2>Add Todo</h2>
            <InputTodo todos={todos} setTodos={setTodos} />
            <h2>Todos</h2>
            {todos.length ? (
                <TodoList todos={todos} setTodos={setTodos} />
            ) : (
                <h4>No todos to show</h4>
            )}
            <button type="button" onClick={handleDeleteAll}>
                Delete All
            </button>
        </>
    );
}

export default App;
