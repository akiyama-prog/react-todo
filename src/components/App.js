import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";

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
    );
};

const TodoAdd = ({ inputEl, handleAddTodoListItem }) => {
    return (
        <>
            <textarea ref={inputEl} />
            <button onClick={handleAddTodoListItem}>+ todoを追加</button>
        </>
    );
};

function App() {
    const {
        todoList,//現在のtodoの状態
        addTodoListItem,//新規タスクの追加
    } = useTodo();

    const inputEl = useRef(null);//refオブジェクトを作成
    //入力フォームで入力された文字列を新しいtodoに登録するための関数
    const handleAddTodoListItem = () => {
        if (inputEl.current.value === "") return;
        addTodoListItem(inputEl.current.value);
        inputEl.current.value = "";
    };
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

            <TodoAdd inputEl={inputEl} handleAddTodoListItem={handleAddTodoListItem} />

            <TodoTitle title='未完了タスク' as='h2'></TodoTitle>
            <TodoList todoList={inCompletedList}></TodoList>

            <TodoTitle title='完了タスク' as='h2'></TodoTitle>
            <TodoList todoList={completedList}></TodoList>

        </>
    );
}
export default App;