import React, { useRef } from "react";
import { useTodo } from "../hooks/useTodo";
import { TodoAdd } from "./TodoAdd";
import { TodoTitle } from "./TodoTitle";
import { TodoList } from "./TodoList";

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

            <TodoList todoList={inCompletedList}
                toggleTodoListItemStatus={toggleTodoListItemStatus}
                deleteTodoListItem={deleteTodoListItem}
                title='未完了タスク' as='h2'
            />

            <TodoList todoList={completedList} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem} title='完了タスク' as='h2' />

        </>
    );
}
export default App;