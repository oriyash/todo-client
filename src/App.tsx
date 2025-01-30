import "./App.css";
import { useEffect, useState, KeyboardEvent } from "react";
import axios from "axios";
import { ITodo } from "./types/todo";
import { cleanInput } from "./utils/cleanInput";
import TodoList from "./components/TodoList/TodoList";

function App() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [inputField, setInputField] = useState<string>("");

    useEffect(() => {
        axios
            .get<ITodo[]>("http://localhost:8000/api/todos/fetch/all")
            .then((res) => {
                setTodos(res.data);
            });
    }, []);

    const handleAdd = () => {
        const cleanBody: string = cleanInput(inputField);

        if (!cleanBody.length) {
            return;
        }

        axios
            .post<ITodo>("http://localhost:8000/api/todos/insert", {
                body: cleanBody,
                done: false,
            })
            .then((res) => {
                todos.push(res.data);
                setTodos(Array.from(todos));
                setInputField("");
            });
    };

    const handleDeleteAll = () => {
        axios
            .delete("http://localhost:8000/api/todos/delete/all")
            .then(() => setTodos([]));
    };

    const handleEnterInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAdd();
        }
    };

    return (
        <>
            <h1>Todo App</h1>
            <h2>Todos</h2>
            <h3>Add Todo</h3>
            <input
                type="text"
                onChange={(e) => setInputField(e.target.value)}
                onKeyUp={handleEnterInput}
                value={inputField}
                className=""
            />{" "}
            <button type="button" className="todo-btn" onClick={handleAdd}>
                Add Todo
            </button>
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
