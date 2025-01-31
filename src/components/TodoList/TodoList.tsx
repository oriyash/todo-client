import { ITodo } from "../../types/todo";
import Todo from "../Todo/Todo";
import TodoEditing from "../TodoEditing/TodoEditing";
import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import { IEdit } from "../../types/edit";
import { cleanInput } from "../../utils/cleanInput";
import { TodoManager } from "../../utils/TodoManager";

interface IProps {
    todos: ITodo[];
    setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

function TodoList({ todos, setTodos }: IProps) {
    const [editing, setEditing] = useState<IEdit | null>(null);

    const handleEditClick = (index: number) => {
        setEditing({ index, text: todos[index].body });
    };

    const handleEdit = (id: number, index: number) => {
        if (!editing) {
            throw new Error(
                "handleEdit is being called with editing being null, this should never happen"
            );
        }

        const cleanBody: string = cleanInput(editing.text);

        if (!cleanBody.length) {
            return;
        }

        if (cleanBody === todos[index].body) {
            setEditing(null);
            return;
        }

        TodoManager.getInstance()
            .editTodo(id, cleanBody)
            .then((res) => {
                todos.splice(index, 1, res);
                setTodos(Array.from(todos));
                setEditing(null);
            });
    };

    const handleToggle = (id: number, index: number) => {
        TodoManager.getInstance()
            .toggleTodo(id)
            .then((res) => {
                todos.splice(index, 1, res);
                setTodos(Array.from(todos));
            });
    };

    const handleDelete = (id: number, index: number) => {
        TodoManager.getInstance()
            .deleteTodo(id)
            .then(() => {
                todos.splice(index, 1);
                setTodos(Array.from(todos));
            });
    };

    const handleKeyUpEdit = (
        e: KeyboardEvent<HTMLInputElement>,
        id: number,
        index: number
    ) => {
        if (e.key === "Enter") {
            handleEdit(id, index);
        } else if (e.key === "Escape") {
            setEditing(null);
        } else {
            return;
        }
    };

    return todos.map((todo: ITodo, index: number) => {
        if (editing?.index === index) {
            return (
                <TodoEditing
                    todo={todo}
                    index={index}
                    handleEdit={handleEdit}
                    handleKeyUpEdit={handleKeyUpEdit}
                    editing={editing}
                    setEditing={setEditing}
                    key={index}
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
                key={index}
            />
        );
    });
}

export default TodoList;
