import { useEffect, useState, KeyboardEvent } from "react";
import "./App.css";
import { ITodo } from "./types/todo";
import axios from "axios";

function App() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [inputField, setInputField] = useState<string>("");
    const [editing, setEditing] = useState<number | null>(null);
    const [currentEdit, setCurrentEdit] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get<ITodo[]>("http://localhost:8000/api/todos/fetch/all")
            .then((res) => {
                setTodos(res.data);
            });
    }, []);

    const handleAdd = () => {
        const cleanBody: string = inputField.trim();

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

    const handleEdit = (
        e: KeyboardEvent<HTMLInputElement>,
        id: number,
        index: number
    ) => {
        if (e.key !== "Enter") {
            return;
        }

        const cleanBody: string = currentEdit as string;

        if (!cleanBody.length) {
            return;
        }

        axios
            .put<ITodo>(`http://localhost:8000/api/todos/edit/${id}`, {
                body: cleanBody,
            })
            .then((res) => {
                todos.splice(index, 1, res.data);
                setTodos(Array.from(todos));
                setEditing(null);
                setCurrentEdit(null);
            });
    };

    const handleToggle = (id: number, index: number) => {
        axios
            .put<ITodo>(`http://localhost:8000/api/todos/toggle/${id}`)
            .then((res) => {
                todos.splice(index, 1, res.data);
                setTodos(Array.from(todos));
            });
    };

    const handleDelete = (id: number, index: number) => {
        axios
            .delete(`http://localhost:8000/api/todos/delete/${id}`)
            .then(() => {
                todos.splice(index, 1);
                setTodos(Array.from(todos));
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

    return <></>;
}

export default App;
