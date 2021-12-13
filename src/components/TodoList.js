import { List } from "@chakra-ui/react";
import { TodoItem } from "./TodoItem";
import { TodoTitle } from "./TodoTitle";

export const TodoList = ({ fontSize, todoList, toggleTodoListItemStatus, deleteTodoListItem, title, as }) => {
    return (
        <>
            {todoList.length !== 0 && (
                <>
                    {todoList.length !== 0 && (
                        <>
                            <List w="full">
                                {todoList.map((todo) => (
                                    <TodoItem todo={todo} key={todo.id} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem}></TodoItem>
                                ))}
                            </List>
                        </>
                    )}
                </>
            )}
        </>
    );
};
