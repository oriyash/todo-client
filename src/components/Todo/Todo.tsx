import { ITodo } from "../../types/todo";

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
                checked={todo.done}
                onChange={() => handleToggle(todo.id, index)}
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
            <button type="button" onClick={() => handleEditClick(index)}>
                Edit
            </button>{" "}
            <button type="button" onClick={() => handleDelete(todo.id, index)}>
                Delete
            </button>
        </>
    );
}

export default Todo;
