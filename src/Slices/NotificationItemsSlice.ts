import {INotificationItem} from "../models/INotificationItem.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface NotificationItemsSlice {
    value: INotificationItem[] | null,
}
const initialState: NotificationItemsSlice = {
    value: null,
}
export const notificationItemsSlice = createSlice({
    name: 'notificationItems',
    initialState,
    reducers: {
        addNotificationItem: (state, action: PayloadAction<INotificationItem>) => {
            if (state.value === null) {
                state.value = [action.payload]
            } else {
                state.value = [...state.value, action.payload];
            }
        },
        editNotificationItem: (state, itemValue: PayloadAction<{item: INotificationItem, newTitle: string}>) => {
            if (state.value === null) {
                return
            }
            const newPayload = itemValue.payload;
            const searchItemForEditing = state.value.find((editedItem) => newPayload.item.title === editedItem.title);
            if (searchItemForEditing) {
                searchItemForEditing.title = newPayload.newTitle;
            }
        },
        deleteNotificationItem: (state, item: PayloadAction<INotificationItem>) => {
            if (state.value === null) {
                return
            }
            const searchIndexItemToDelete = state.value.findIndex((notificationItem) => item.payload.title === notificationItem.title);
            state.value.splice(searchIndexItemToDelete, 1);
        },
        setNotificationItemFromLS: (state) => {
            const notificationItemFromLS = localStorage.getItem('notificationList');
            if (notificationItemFromLS) {
                const retrievedNotificationList = JSON.parse(notificationItemFromLS);
                const parsedDate = retrievedNotificationList.map((item: any) => {
                    const toReturn: INotificationItem = {
                        title: item.title, date: new Date(item.date), isExpired: item.isExpired
                    }
                    return toReturn
                })
                state.value = parsedDate;
            } else {
                state.value = [];
            }
        },
        setItemWithTitleExpired: (state, action: PayloadAction<string>) => {
            if (state.value === null) {
                return
            }
            const searchItemToExpired = state.value.find((expiredItem) => action.payload === expiredItem.title);
            if (searchItemToExpired) {
                searchItemToExpired.isExpired = true;
            }
        }
    },
    selectors: {
        selectNotificationItems: state => state.value,
    }
})
export const {
    selectNotificationItems} = notificationItemsSlice.selectors;
export const {
    addNotificationItem,
    editNotificationItem,
    deleteNotificationItem,
    setNotificationItemFromLS,
    setItemWithTitleExpired} = notificationItemsSlice.actions