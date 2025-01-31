import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import { ITodo } from "../../types/todo";
import { cleanInput } from "../../utils/cleanInput";
import { TodoManager } from "../../utils/TodoManager";

interface IProps {
    todos: ITodo[];
    setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

function InputTodo({ todos, setTodos }: IProps) {
    const [inputField, setInputField] = useState<string>("");

    const handleAdd = () => {
        const cleanBody: string = cleanInput(inputField);

        if (!cleanBody.length) {
            return;
        }

        TodoManager.getInstance()
            .addTodo(cleanBody)
            .then((res) => {
                todos.push(res);
                setTodos(Array.from(todos));
                setInputField("");
            });
    };

    const handleEnterInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAdd();
        }
    };

    return (
        <>
            <input
                type="text"
                onChange={(e) => setInputField(e.target.value)}
                onKeyUp={handleEnterInput}
                value={inputField}
            />{" "}
            <button type="button" onClick={handleAdd}>
                Add Todo
            </button>
        </>
    );
}

export default InputTodo;
