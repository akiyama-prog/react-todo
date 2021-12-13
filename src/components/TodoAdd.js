import { Textarea, Button } from "@chakra-ui/react";

export const TodoAdd = ({ placeholder, leftIcon, buttonText, inputEl, handleAddTodoListItem }) => {
    return (
        <>
            <Textarea placeholder={placeholder} bgColor="white" mt="8" corderColor="gray.400" ref={inputEl} />
            <Button onClick={handleAddTodoListItem} colorScheme="blue" lefrIcon={leftIcon}>{buttonText}</Button>
        </>
    );
};