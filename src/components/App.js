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

    //未完了のタスクをもつ配列作成
    const inCompletedList = todoList.filter((todo) => {
        return !todo.done;
    })
    const completedList = todoList.filter((todo) => {
        return todo.done;
    })

    return (
        <>
            <h1>Todoリスト</h1>
            <textarea></textarea>
            <button>+ add</button>
            <h2>未完了タスク</h2>
            <ul>
                {inCompletedList.map((todo) => (
                    <li key={todo.id}>{todo.content}
                        <button>{todo.done ? '未完了にする' : '完了にする'}</button>
                        <button>Del</button>
                    </li>
                ))}
            </ul>

            <h2>完了タスク</h2>
            <ul>
                {completedList.map((todo) => (
                    <li key={todo.id}>{todo.content}
                        <button>{todo.done ? '未完了にする' : '完了にする'}</button>
                        <button>Del</button>
                    </li>
                ))}
            </ul>
        </>
    );
}
export default App;