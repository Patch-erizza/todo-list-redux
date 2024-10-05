import {Language} from "../models/Language.ts";
import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"

export interface LanguageSliceState {
    value: Language
}
const initialState: LanguageSliceState = {
    value: "RUS"
}
export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            //payload - "полезная нагрузка" (необходимые данные)
            state.value = action.payload;
        }
    },
    selectors: {
        selectLanguage: state => state.value,
    }
})
export const {setLanguage} = languageSlice.actions;
export const {selectLanguage} = languageSlice.selectors;