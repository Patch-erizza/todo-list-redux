import classes from "./TodoItem.module.css"
import {ITodoItem} from "../../models/ITodoItem.ts";
import {FC, FormEvent, useRef, useState} from "react";
import {clsx} from "clsx";

export interface TodoItemProps {
    item: ITodoItem,
    onCheckedChanged: (value: ITodoItem) => void,
    todoItemDelete: (value: ITodoItem) => void,
    onItemIsEdited?: (value: ITodoItem, newTitle: string) => void,
    className?: string
}

export const TodoItem: FC<TodoItemProps> = (
    {
        item,
        onCheckedChanged,
        todoItemDelete,
        onItemIsEdited,
        className
    }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const inputFieldRef = useRef<HTMLInputElement>(null);
    const [inputChanged, setInputChanged] = useState<string>(item.title)
    const handleChecked = () => {
        onCheckedChanged(item)
    }
    const handleClicked = () => {
        todoItemDelete(item)
    }
    const editItem = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputFieldRef.current?.focus()
        }, 0);
    }
    const onInputChanged = (event: FormEvent<HTMLInputElement>) => {
        setInputChanged(event.currentTarget.value)
    }
    const handleKeyUp = (event: any) => {
        if (event.key === 'Enter') {
            setIsEditing(false);
            if (onItemIsEdited) {
                onItemIsEdited(item, inputChanged)
            }
        }
    }
    //сделать состояние пустого списка
    return (
        <div className={clsx(classes.todoItem, className)}>

            <div className={classes.itemData}>
                <input
                    className={classes.itemCheckbox}
                    type='checkbox'
                    checked={item.isChecked}
                    onChange={handleChecked}/>
                {
                    isEditing
                        ?
                        <input className={classes.inputText}
                            type='text'
                            value={inputChanged}
                            ref={inputFieldRef}
                            onChange={onInputChanged}
                            onKeyUp={handleKeyUp}/>
                        : <span className={clsx({[classes.strikeThrough]: item.isChecked}, classes.itemTitle)}
                            onClick={editItem}>{item.title}</span>
                }
            </div>

            <button
                className={classes.itemDel}
                onClick={handleClicked}>x
            </button>
        </div>
    );
};