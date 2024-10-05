import classes from './NawBar.module.css';
import {FormEvent} from "react";
import {Classic} from "@theme-toggles/react"
import {Language} from "../../models/Language.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectLanguage, setLanguage} from "../../Slices/LanguageSlice.ts";
import {selectIsDarkTheme, setIsDarkTheme} from "../../Slices/ThemeSlice.ts";

export const NawBar = () => {
    const language = useAppSelector(selectLanguage);
    const theme = useAppSelector(selectIsDarkTheme);
    const dispatch = useAppDispatch();

    const languageChanged = (event: FormEvent<HTMLSelectElement>) => {
        dispatch(setLanguage(event.currentTarget.value as Language));
    }
    const isDarkThemeChanged = (value: boolean) => {
        dispatch(setIsDarkTheme(value));
    }
    return (
        <div className={classes.nawBar}>
            <div className={classes.logoText}>ToDo & Notifications</div>
            <div>
                <div className={classes.currentUser}></div>
                {
                    <Classic
                        placeholder=''
                        onPointerEnterCapture=''
                        onPointerLeaveCapture=''
                        toggled={theme}
                        onToggle={isDarkThemeChanged}
                        duration={750}/>
                }
                {
                    language
                        ?
                        <select
                            className={classes.language}
                            value={language}
                            onChange={languageChanged}>
                            <option value='RUS'>RUS</option>
                            <option value='ENG'>ENG</option>
                        </select>
                        : null
                }
            </div>
        </div>
    );
};