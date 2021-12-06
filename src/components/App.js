import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";
import { TodoAdd } from "./TodoAdd";

const TodoTitle = ({ title, as }) => {
    if (as === 'h1') return <h1>{title}</h1>;
    if (as === 'h2') return <h2>{title}</h2>;
    return <p>{title}</p>;
};

const TodoItem = ({ todo, toggleTodoListItemStatus, deleteTodoListItem }) => {
    //todoの状態を反転させる関数を実行させる関数
    const handleToggleTodoListItemStatus = () => toggleTodoListItemStatus(todo.id, todo.done);
    const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);
    return (
        <li>
            { todo.content}
            < button onClick={handleToggleTodoListItemStatus} >
                {todo.done ? '未完了リストへ' : '完了リスト'}
            </button>
            <button onClick={handleDeleteTodoListItem}>削除</button>
        </li>
    );
};

const TodoList = ({ todoList, toggleTodoListItemStatus, deleteTodoListItem }) => {
    return (
        <ul>
            {todoList.map((todo) => (
                <TodoItem todo={todo} key={todo.id} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem}></TodoItem>
            ))}
        </ul>
    );
};



function App() {
    const {
        todoList,//現在のtodoの状態
        addTodoListItem,//新規タスクの追加
        toggleTodoListItemStatus,//todoを反転させて更新する
        deleteTodoListItem
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

            <TodoAdd inputEl={inputEl} handleAddTodoListItem={handleAddTodoListItem} buttonText="+ todoを追加" />

            <TodoTitle title='未完了タスク' as='h2'></TodoTitle>
            <TodoList todoList={inCompletedList}
                toggleTodoListItemStatus={toggleTodoListItemStatus}
                deleteTodoListItem={deleteTodoListItem}
            />

            <TodoTitle title='完了タスク' as='h2'></TodoTitle>
            <TodoList todoList={completedList} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem} />

        </>
    );
}
export default App;