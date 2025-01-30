import "./TodoEditing.css";
import { ITodo } from "../../types/todo";
import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { IEdit } from "../../types/edit";

interface IProps {
    todo: ITodo;
    index: number;
    handleEdit: (id: number, index: number) => void;
    handleEnterEdit: (
        e: KeyboardEvent<HTMLInputElement>,
        id: number,
        index: number
    ) => void;
    editing: IEdit;
    setEditing: Dispatch<SetStateAction<IEdit | null>>;
}

function TodoEditing({
    todo,
    index,
    handleEdit,
    handleEnterEdit,
    editing,
    setEditing,
}: IProps) {
    return (
        <>
            <p>
                {todo.id}:{" "}
                <input
                    type="text"
                    className="edit-input"
                    value={editing.text}
                    onChange={(e) =>
                        setEditing({ ...editing, text: e.target.value })
                    }
                    onKeyUp={(e) => handleEnterEdit(e, todo.id, index)}
                />{" "}
                created at - {todo.created_at}{" "}
                <button onClick={() => handleEdit(todo.id, index)}>
                    Confirm
                </button>
            </p>
        </>
    );
}

export default TodoEditing;
