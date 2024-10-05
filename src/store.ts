import {combineSlices, configureStore} from '@reduxjs/toolkit'
import {languageSlice} from "./Slices/LanguageSlice.ts";
import {themeSlice} from "./Slices/ThemeSlice.ts";
import {todoItemsSlice} from "./Slices/TodoItemsSlice.ts";
import {notificationItemsSlice} from "./Slices/NotificationItemsSlice.ts";

const rootReducer = combineSlices(languageSlice, themeSlice, todoItemsSlice, notificationItemsSlice)
export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch