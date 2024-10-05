import {Dispatch, SetStateAction} from "react";

export interface ILanguageContext {
    language: 'ENG' | 'RUS',
    setLanguage: Dispatch<SetStateAction<'ENG' | 'RUS'>>
}