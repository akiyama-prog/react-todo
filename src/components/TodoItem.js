export const TodoItem = ({ todo, toggleTodoListItemStatus, deleteTodoListItem }) => {
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
