import { ITodo } from "../types/todo";
import axios from "axios";

export class TodoManager {
    private static instance: TodoManager;
    private BASE_URL: string;

    private constructor() {
        this.BASE_URL = "http://localhost:8000";
    }

    public static getInstance(): TodoManager {
        if (!TodoManager.instance) {
            TodoManager.instance = new TodoManager();
        }

        return TodoManager.instance;
    }

    public getAllTodos(): Promise<ITodo[]> {
        return new Promise((resolve) => {
            axios
                .get<ITodo[]>(`${this.BASE_URL}/api/todos/fetch/all`)
                .then((res) => resolve(res.data));
        });
    }

    public deleteAllTodos(): Promise<void> {
        return new Promise((resolve) => {
            axios.delete(`${this.BASE_URL}/api/todos/delete/all`).then(() => {
                resolve();
            });
        });
    }

    public addTodo(body: string): Promise<ITodo> {
        return new Promise((resolve) => {
            axios
                .post<ITodo>(`${this.BASE_URL}/api/todos/insert`, {
                    body,
                    done: false,
                })
                .then((res) => {
                    resolve(res.data);
                });
        });
    }

    public toggleTodo(id: number): Promise<ITodo> {
        return new Promise((resolve) => {
            axios
                .put<ITodo>(`${this.BASE_URL}/api/todos/toggle/${id}`)
                .then((res) => {
                    resolve(res.data);
                });
        });
    }

    public editTodo(id: number, body: string): Promise<ITodo> {
        return new Promise((resolve) => {
            axios
                .put<ITodo>(`${this.BASE_URL}/api/todos/edit/${id}`, {
                    body,
                })
                .then((res) => {
                    resolve(res.data);
                });
        });
    }

    public deleteTodo(id: number): Promise<void> {
        return new Promise((resolve) => {
            axios.delete(`${this.BASE_URL}/api/todos/delete/${id}`).then(() => {
                resolve();
            });
        });
    }
}
