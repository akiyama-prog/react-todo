import React, { useState, useEffect } from "react";
import axios from "axios";

const todoDataUrl = "http://localhost:3100/todos";//ローカルのモックサーバーのURL

const TodoTitle = ({ title, as }) => {
    if (as === 'h1') return <h1>{title}</h1>;
    if (as === 'h2') return <h2>{title}</h2>;
    return <p>{title}</p>;
};

const TodoItem = ({ todo }) => {
    return (
        <li>
            {todo.content}
            <button>{todo.done ? '未完了' : '完了'}</button>
            <button>Del</button>
        </li>
    );
};

const TodoList = ({ todoList }) => {
    return (
        <ul>
            {todoList.map((todo) => (
                <TodoItem todo={todo} key={todo.id}></TodoItem>
            ))}
        </ul>
    )
}

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
            <TodoTitle title='Todoリスト' as='h1'></TodoTitle>
            <textarea></textarea>
            <button>+ add</button>
            <TodoTitle title='未完了タスク' as='h2'></TodoTitle>
            <TodoList todoList={inCompletedList}></TodoList>

            <TodoTitle title='完了タスク' as='h2'></TodoTitle>
            <TodoList todoList={completedList}></TodoList>

        </>
    );
}
export default App;