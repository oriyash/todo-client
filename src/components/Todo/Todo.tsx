import { ITodo } from "../../types/todo";
import "./Todo.css";

interface ITodoProps {
    todo: ITodo;
    index: number;
    handleEditClick: (index: number) => void;
    handleToggle: (id: number, index: number) => void;
    handleDelete: (id: number, index: number) => void;
}

function Todo({
    todo,
    index,
    handleToggle,
    handleDelete,
    handleEditClick,
}: ITodoProps) {
    return (
        <p>
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.done}
                onClick={() => handleToggle(todo.id, index)}
            />{" "}
            {todo.id}: {todo.body} created at {todo.created_at}{" "}
            <TodoControls
                todo={todo}
                index={index}
                handleEditClick={handleEditClick}
                handleDelete={handleDelete}
            />
        </p>
    );
}

interface ITodoControlsProps {
    todo: ITodo;
    index: number;
    handleEditClick: (index: number) => void;
    handleDelete: (id: number, index: number) => void;
}

function TodoControls({
    todo,
    index,
    handleEditClick,
    handleDelete,
}: ITodoControlsProps) {
    return (
        <>
            <button
                type="button"
                className="todo-btn"
                onClick={() => handleEditClick(index)}
            >
                Edit
            </button>{" "}
            <button
                type="button"
                className="todo-btn"
                onClick={() => handleDelete(todo.id, index)}
            >
                Delete
            </button>
        </>
    );
}

export default Todo;
