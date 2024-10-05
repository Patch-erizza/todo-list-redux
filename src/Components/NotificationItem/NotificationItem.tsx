import {INotificationItem} from "../../models/INotificationItem.ts";
import {FC, FormEvent, useRef, useState} from "react";
import classes from "./NotificationItem.module.css"

export interface NotificationItemProps {
    item: INotificationItem,
    notificationItemDelete: (value: INotificationItem) => void,
    onItemIsEdited?: (value: INotificationItem, newTitle: string) => void
}

export const NotificationItem: FC<NotificationItemProps> = (
    {
        item,
        notificationItemDelete,
        onItemIsEdited
    }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const inputFieldRef = useRef<HTMLInputElement>(null);
    const [notificationInputChanged, setNotificationInputChanged] = useState<string>(item.title);

    const editItem = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputFieldRef.current?.focus()
        }, 0);
    }
    const onInputChanged = (event: FormEvent<HTMLInputElement>) => {
        setNotificationInputChanged(event.currentTarget.value)
    }
    const handleKeyUp = (event: any) => {
        if (event.key === 'Enter') {
            setIsEditing(false);
            if (onItemIsEdited) {
                onItemIsEdited(item, notificationInputChanged)
            }
        }
    }
    const handleClicked = () => {
        notificationItemDelete(item)
    }

    return (
        <div>
            <div className={classes.itemData}>
                {
                    isEditing
                        ?
                        <input
                            type='text'
                            value={notificationInputChanged}
                            ref={inputFieldRef}
                            onChange={onInputChanged}
                            onKeyUp={handleKeyUp}/>
                        : <div>
                            <span onClick={editItem}>{item.title}{}</span>
                            <span>{item.date.toString()}</span>
                        </div>
                }
            </div>

            <button
                className={classes.itemDel}
                onClick={handleClicked}>x
            </button>
        </div>
    )
        ;
};