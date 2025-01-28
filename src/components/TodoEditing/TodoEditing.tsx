import "./TodoEditing.css";
import { ITodo } from "../../types/todo";
import { Dispatch, KeyboardEvent, SetStateAction } from "react";

interface IProps {
    todo: ITodo;
    index: number;
    handleEdit: (
        e: KeyboardEvent<HTMLInputElement>,
        id: number,
        index: number
    ) => void;
    currentEdit: string | null;
    setCurrentEdit: Dispatch<SetStateAction<string | null>>;
}

function TodoEditing({
    todo,
    index,
    currentEdit,
    setCurrentEdit,
    handleEdit,
}: IProps) {
    return (
        <>
            <p>
                {todo.id}:{" "}
                <input
                    type="text"
                    className="edit-input"
                    value={currentEdit as string}
                    onChange={(e) => setCurrentEdit(e.target.value)}
                    onKeyUp={(e) => handleEdit(e, todo.id, index)}
                />{" "}
                created at - {todo.created_at}
            </p>
        </>
    );
}

export default TodoEditing;
