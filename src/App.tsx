import "./App.css";
import { useEffect, useState, KeyboardEvent } from "react";
import axios from "axios";
import { ITodo } from "./types/todo";
import Todo from "./components/Todo/Todo";
import TodoEditing from "./components/TodoEditing/TodoEditing";
import { IEdit } from "./types/edit";

function App() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [inputField, setInputField] = useState<string>("");
    const [editing, setEditing] = useState<IEdit | null>(null);
    // const [currentEdit, setCurrentEdit] = useState<string | null>(null);

    const cleanInput = (input: string): string => {
        return input.trim().replace(/\s{2,}/g, " ");
    };

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

    const handleEditClick = (index: number) => {
        setEditing({ index, text: todos[index].body });
    };

    const handleEdit = (
        e: KeyboardEvent<HTMLInputElement>,
        id: number,
        index: number
    ) => {
        if (e.key !== "Enter") {
            return;
        }

        const cleanBody: string = cleanInput((editing as IEdit).text);

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
                todos.map((todo: ITodo, index: number) => {
                    if (editing) {
                        return (
                            <TodoEditing
                                todo={todo}
                                index={index}
                                handleEdit={handleEdit}
                                editing={editing}
                                setEditing={setEditing}
                            />
                        );
                    }

                    return (
                        <Todo
                            todo={todo}
                            index={index}
                            handleToggle={handleToggle}
                            handleDelete={handleDelete}
                            handleEditClick={handleEditClick}
                        />
                    );
                })
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
