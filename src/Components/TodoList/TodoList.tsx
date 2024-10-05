import classes from "./TodoList.module.css"
import {useEffect} from "react";
import {ITodoItem} from "../../models/ITodoItem.ts";
import {TodoInput} from "../TodoInput/TodoInput.tsx";
import {TodoItem} from "../TodoItem/TodoItem.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectLanguage} from "../../Slices/LanguageSlice.ts";
import {
    addTodoItem,
    checkedItem,
    completedCheckedItem,
    completedTodoItem,
    deleteCompletedTodoItem,
    deleteTodoItem,
    editTodoItem,
    selectTodoItems,
    setCompletedTodoItemsFromLS,
    setTodoItemsFromLS
} from "../../Slices/TodoItemsSlice.ts";

export const TodoList = () => {
    const todoList = useAppSelector(selectTodoItems);
    const completedTodoList = useAppSelector(completedTodoItem);
    const dispatch = useAppDispatch();

    const language = useAppSelector(selectLanguage);

    useEffect(() => {
        if (todoList === null) {
            return
        }
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    useEffect(() => {
        if (completedTodoList === null) {
            return
        }
        localStorage.setItem('completedTodoList', JSON.stringify(completedTodoList));
    }, [completedTodoList]);

    useEffect(() => {
        dispatch(setTodoItemsFromLS());
        dispatch(setCompletedTodoItemsFromLS())
    }, []);

    const inputTextChanged = (inputText: string) => {
        const newTodoItem: ITodoItem = {title: inputText, isChecked: false};
        dispatch(addTodoItem(newTodoItem))
    }
    const itemIsChecked = (item: ITodoItem) => {
        dispatch(checkedItem(item));
    }
    const itemIsCheckedComplete = (item: ITodoItem) => {
        dispatch(completedCheckedItem(item))
    }
    //найти индекс массива, сплайс по индексу
    const itemDeleted = (item: ITodoItem) => {
        dispatch(deleteTodoItem(item));
    }
    const itemCompleteDeleted = (item: ITodoItem) => {
        dispatch(deleteCompletedTodoItem(item))
    }
    const itemEditing = (item: ITodoItem, newTitle: string) => {
        dispatch(editTodoItem({item, newTitle}))
    }
    return (
        <>
            <div className={classes.todoListWrapper}>
                <span className={classes.spanNames}>
                    {language === 'ENG'
                        ?
                        'Your ToDo list:'
                        :'Список дел:'}
                </span>
                <TodoInput inputChanged={inputTextChanged}/>
                <div>
                    {
                        todoList?.length
                            ?
                            todoList
                                .map((item) =>
                                    <TodoItem
                                        key={item.title}
                                        item={item}
                                        onCheckedChanged={itemIsChecked}
                                        todoItemDelete={itemDeleted}
                                        onItemIsEdited={itemEditing}/>)
                            : <span className={classes.isEmpty}>ToDo list is empty</span>
                    }
                </div>
                {
                    completedTodoList?.length
                        ?
                        <hr/>
                        : null
                }
                <div>
                    {
                        completedTodoList
                            ?
                            completedTodoList
                                .map((item) =>
                                    <TodoItem
                                        key={item.title}
                                        item={item}
                                        onCheckedChanged={itemIsCheckedComplete}
                                        todoItemDelete={itemCompleteDeleted}
                                        className={classes.completedItems}/>)
                            : null
                    }
                </div>
            </div>
        </>
    );
};