import React, { useState, useEffect } from "react";
import axios from "axios";

const todoDataUrl = "http://localhost:3100/todos";//ローカルのモックサーバーのURL

function App() {
    const [todoList, setTodoList] = useState([]);
    useEffect(() => {
        //非同期処理
        const fetchData = async () => {
            const response = await axios.get(todoDataUrl);

            setTodoList(response.data);
        };
        fetchData();
    }, []);

    return (
        <>
            <h1>Todoリスト</h1>
            <textarea></textarea>
            <button>+ add</button>

            <ul>
                {todoList.map((todo) => (
                    <li key={todo.id}>{todo.content}({todo.done ? 'done' : 'not yet'})</li>
                ))}
            </ul>
        </>
    );
}
export default App;