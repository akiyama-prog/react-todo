import { useState, useEffect } from "react";
import { ulid } from "ulid";
import * as todoData from "../api/todos";

export const useTodo = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        //useEffectの使用でコンポーネントのマウント後またはアンマウント後に処理を実行する

        todoData.getAllTodosData().then((todo) => {
            setTodoList([...todo].reverse());//reversで追加した順に表示されるように並べ替え。元の配列には影響しない
        });
    }, []);

    //更新
    const toggleTodoListItemStatus = (id, done) => {
        //findで特定のタスクを見つけ出す
        const todoItem = todoList.find((item) => item.id === id);
        //doneを反転させる
        const newTodoItem = { ...todoItem, done: !done };
        //反転させたものを更新して、todoLiistの状態も更新する
        todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
            const newTodoList = todoList.map((item) => item.id !== updatedTodo.id ? item : updatedTodo);
            setTodoList(newTodoList);
        });
    };

    //新規todoを追加。
    const addTodoListItem = (todoContent) => {
        const newTodoItem = {
            content: todoContent,
            id: ulid(),
            done: false
        };
        return todoData.addTodoData(newTodoItem).then((addTodo) => {
            setTodoList([addTodo, ...todoList]);
        });
    };

    //削除
    const deleteTodoListItem = (id) => {
        todoData.deleteTodoData(id).then((deleteListItemId) => {
            const newTodoList = todoList.filter(
                //削除したidと一致しないtodoをフィルタリングして新しい配列を返す
                (item) => item.id !== deleteListItemId
            );
            setTodoList(newTodoList);
        });
    };
    return {
        todoList,
        toggleTodoListItemStatus,
        addTodoListItem,
        deleteTodoListItem
    };
};