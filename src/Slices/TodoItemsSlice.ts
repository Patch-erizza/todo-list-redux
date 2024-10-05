import {ITodoItem} from "../models/ITodoItem.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TodoItemsSlice {
    value: ITodoItem[] | null,
    completed: ITodoItem[] | null
}
const initialState: TodoItemsSlice = {
    value: null,
    completed: null
}
export const todoItemsSlice = createSlice({
    name: 'todoItems',
    initialState,
    reducers: {
        addTodoItem: (state, action: PayloadAction<ITodoItem>) => {
            if (state.value === null) {
                return
            }
            state.value = [...state.value, action.payload];
        },
        setTodoItemsFromLS: (state) => {
            const todoListFromLS = localStorage.getItem('todoList');
            if (todoListFromLS) {
                const retrievedTodoList = JSON.parse(todoListFromLS);
                state.value = retrievedTodoList;
            } else {
                state.value = [];
            }
        },
        setCompletedTodoItemsFromLS: (state) => {
            const completedTodoListFromLS = localStorage.getItem('completedTodoList');
            if (completedTodoListFromLS) {
                const retrievedCompletedTodoList = JSON.parse(completedTodoListFromLS);
                state.completed = retrievedCompletedTodoList;
            } else {
                state.completed = [];
            }
        },
        deleteTodoItem: (state, item: PayloadAction<ITodoItem>) => {
            if (state.value === null) {
                return
            }
            const searchIndexItemToDelete = state.value.findIndex((todoItem) => item.payload.title === todoItem.title);
            state.value.splice(searchIndexItemToDelete, 1);
        },
        deleteCompletedTodoItem: (state, item: PayloadAction<ITodoItem>) => {
            if (state.completed === null) {
                return
            }
            const searchIndexItemToDelete = state.completed.findIndex((completeTodoItem) => item.payload.title === completeTodoItem.title);
            state.completed.splice(searchIndexItemToDelete, 1);
        },
        checkedItem: (state, item: PayloadAction<ITodoItem>) => {
            if (state.value === null || state.completed === null) {
                return
            }
            const searchedTodoItem = state.value.findIndex((todoItem) => item.payload.title === todoItem.title);
            if (searchedTodoItem > -1) {
                state.value.splice(searchedTodoItem, 1);
                item.payload.isChecked = !item.payload.isChecked;
                state.completed.push(item.payload);
            }
        },
        completedCheckedItem: (state, item: PayloadAction<ITodoItem>) => {
            if (state.completed === null || state.value === null) {
                return
            }
            const searchedTodoItem = state.completed.findIndex((todoItem) => item.payload.title === todoItem.title);
            if (searchedTodoItem > -1) {
                state.completed.splice(searchedTodoItem, 1);
                item.payload.isChecked = !item.payload.isChecked;
                state.value.push(item.payload);
            }
        },
        editTodoItem: (state, itemValue: PayloadAction<{item: ITodoItem, newTitle: string}>) => {
            if (state.value === null) {
                return
            }
            const newPayload = itemValue.payload;
            const searchItemForEditing = state.value.find((editedItem) => newPayload.item.title === editedItem.title);
            if (searchItemForEditing) {
                searchItemForEditing.title = newPayload.newTitle;
            }
        }
    },
    selectors: {
        selectTodoItems: state => state.value,
        completedTodoItem: state => state.completed
    }
})
export const {
    selectTodoItems,
    completedTodoItem} = todoItemsSlice.selectors;
export const {
    addTodoItem,
    setTodoItemsFromLS,
    setCompletedTodoItemsFromLS,
    deleteTodoItem,
    checkedItem,
    completedCheckedItem,
    deleteCompletedTodoItem,
    editTodoItem} = todoItemsSlice.actions;