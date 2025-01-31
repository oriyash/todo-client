import { ITodo } from "../../types/todo";

interface ITodoProps {
    todo: ITodo;
    index: number;
    handleEditClick: (index: number) => void;
    handleToggle: (index: number) => void;
    handleDelete: (index: number) => void;
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
                onChange={() => handleToggle(index)}
            />{" "}
            {todo.id}: {todo.body} created at {todo.created_at}{" "}
            <TodoControls
                index={index}
                handleEditClick={handleEditClick}
                handleDelete={handleDelete}
            />
        </p>
    );
}

interface ITodoControlsProps {
    index: number;
    handleEditClick: (index: number) => void;
    handleDelete: (index: number) => void;
}

function TodoControls({
    index,
    handleEditClick,
    handleDelete,
}: ITodoControlsProps) {
    return (
        <>
            <button type="button" onClick={() => handleEditClick(index)}>
                Edit
            </button>{" "}
            <button type="button" onClick={() => handleDelete(index)}>
                Delete
            </button>
        </>
    );
}

export default Todo;
