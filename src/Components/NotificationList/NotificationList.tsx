import {useEffect} from "react";
import {INotificationItem} from "../../models/INotificationItem.ts";
import {toast} from "react-toastify";
import classes from "./NotificationList.module.css";
import {NotificationInput} from "../NotificationInput/NotificationInput.tsx";
import {NotificationItem} from "../NotificationItem/NotificationItem.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectLanguage} from "../../Slices/LanguageSlice.ts";
import {
    addNotificationItem,
    deleteNotificationItem,
    editNotificationItem,
    selectNotificationItems, setItemWithTitleExpired,
    setNotificationItemFromLS
} from "../../Slices/NotificationItemsSlice.ts";

export const NotificationList = () => {
    const notificationList = useAppSelector(selectNotificationItems);
    const dispatch = useAppDispatch();
    const language = useAppSelector(selectLanguage);

    useEffect(() => {
        if (notificationList === null) {
            return
        }
        localStorage.setItem('notificationList', JSON.stringify(notificationList));
    }, [notificationList]);

    useEffect(() => {
        dispatch(setNotificationItemFromLS());
    }, []);

    useEffect(() => {
        const timeToNotification = setInterval(() => {
            if (notificationList) {
                const currentDate = new Date();
                for (let item of notificationList) {
                    const itemDate = item.date;
                    if ((currentDate.getTime() >= itemDate.getTime()) && !item.isExpired) {
                        dispatch(setItemWithTitleExpired(item.title))
                        toast(item.title)
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(timeToNotification)
        };
    }, [notificationList])

    const notificationInputTextChanged = (newNotificationItem: INotificationItem) => {
        dispatch(addNotificationItem(newNotificationItem))
    }
    const notificationItemEditing = (item: INotificationItem, newTitle: string) => {
        dispatch(editNotificationItem({item, newTitle}))
    }
    const itemDeleted = (item: INotificationItem) => {
        dispatch(deleteNotificationItem(item))
    }

    return (
        <>
            <div className={classes.notificationWrapper}>
                <span className={classes.spanNames}>
                    {language === 'ENG'
                        ?
                        'Your notifications:'
                        : 'Список ваших уведомлений:'}
                </span>
                <NotificationInput notificationInputChanged={notificationInputTextChanged}/>
                {
                    notificationList?.length
                        ?
                        notificationList
                            .map((item) =>
                                <NotificationItem
                                    key={item.title}
                                    item={item}
                                    notificationItemDelete={itemDeleted}
                                    onItemIsEdited={notificationItemEditing}/>)
                        : <span className={classes.isEmpty}>Notification list is empty</span>
                }
            </div>
        </>
    );
};