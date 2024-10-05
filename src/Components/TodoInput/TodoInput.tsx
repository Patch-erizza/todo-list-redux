import classes from "./TodoInput.module.css";
import {FC, FormEvent, useState} from "react";
import {useAppSelector} from "../../hooks.ts";
import {selectLanguage} from "../../Slices/LanguageSlice.ts";

export interface TodoInputProps {
    inputChanged: (value: string) => void
}

export const TodoInput: FC<TodoInputProps> = (
    {
        inputChanged
    }) => {
    const [inputValue, setInputValue] = useState<any>('');

    const language = useAppSelector(selectLanguage);

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    };
    const handleKeyUp = (event: any) => {
        if (event.key === 'Enter') {
            inputChanged(inputValue)
            setInputValue('')
        }
    }

    return (
        <>
            <input
                className={classes.inputText}
                value={inputValue}
                onChange={handleChange}
                placeholder={language === 'ENG'
                    ? 'Add new item...'
                    : 'Добавить задачу'}
                onKeyUp={handleKeyUp}/>
        </>
    );
};