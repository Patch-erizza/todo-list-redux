import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ThemeSliceState {
    isDarkTheme: boolean
}
const initialState: ThemeSliceState = {
    isDarkTheme: false
}
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setIsDarkTheme: (state, action: PayloadAction<boolean>) => {
            state.isDarkTheme = action.payload;
        }
    },
    selectors: {
        selectIsDarkTheme: state => state.isDarkTheme
    }
})
export const {setIsDarkTheme} = themeSlice.actions;
export const {selectIsDarkTheme} = themeSlice.selectors;