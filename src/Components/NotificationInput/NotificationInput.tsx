import classes from "./NotificationInput.module.css";
import {FC, FormEvent, useState} from "react";
import {INotificationItem} from "../../models/INotificationItem.ts";
import {useAppSelector} from "../../hooks.ts";
import {selectLanguage} from "../../Slices/LanguageSlice.ts";

export interface NotificationInputProps {
    notificationInputChanged: (value: INotificationItem) => void
}

//handle - обработать
export const NotificationInput: FC<NotificationInputProps> = (
    {
        notificationInputChanged
    }) => {
    const [inputValue, setInputValue] = useState<any>('');
    const [selectedDate, setSelectedDate] = useState<any>('')

    const language = useAppSelector(selectLanguage);
    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    };
    const handleDateChange = (event: FormEvent<HTMLInputElement>) => {
        setSelectedDate(event.currentTarget.value);
    }
    const onSave = () => {
        const parsedDate = new Date(selectedDate);
        const newNotificationItem: INotificationItem = {title: inputValue, date: parsedDate, isExpired: false}
        notificationInputChanged(newNotificationItem)
    }

    return (
        <div className={classes.inputBody}>
            <input
                type='text'
                className={classes.inputText}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={language === 'ENG'
                    ? 'Add new notification...'
                    :'Добавить уведомление'}/>
            <input
                className={classes.inputDate}
                type='datetime-local'
                value={selectedDate}
                onChange={handleDateChange}/>
            <button
                className={classes.saveButton}
                onClick={onSave}>
                {language === 'ENG'
                    ?
                    'Save'
                    : 'Сохранить'}
            </button>
        </div>
    );
};