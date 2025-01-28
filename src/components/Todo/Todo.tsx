import { ITodo } from "../../types/todo";
import "./Todo.css";

function Todo({ todo }: { todo: ITodo }) {
    return (
        <span>
            <input type="checkbox" checked={todo.done} onClick={handleToggle} />{" "}
            {todo.id}: {todo.body} created at {todo.created_at}
        </span>
    );
}
