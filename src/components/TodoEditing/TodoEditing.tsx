import { ITodo } from "../../types/todo";
import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { IEdit } from "../../types/edit";

interface IProps {
    todo: ITodo;
    index: number;
    handleEdit: (index: number) => void;
    handleKeyUpEdit: (e: KeyboardEvent<HTMLInputElement>) => void;
    editing: IEdit;
    setEditing: Dispatch<SetStateAction<IEdit | null>>;
}

function TodoEditing({
    todo,
    index,
    handleEdit,
    handleKeyUpEdit,
    editing,
    setEditing,
}: IProps) {
    return (
        <>
            <p>
                {todo.id}:{" "}
                <input
                    type="text"
                    value={editing.text}
                    onChange={(e) =>
                        setEditing({ ...editing, text: e.target.value })
                    }
                    onKeyUp={handleKeyUpEdit}
                />{" "}
                created at - {todo.created_at}{" "}
                <button onClick={() => handleEdit(index)}>Confirm</button>{" "}
                <button onClick={() => setEditing(null)}>Cancel</button>
            </p>
        </>
    );
}

export default TodoEditing;
