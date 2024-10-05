import classes from "./App.module.css"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TodoList} from "./Components/TodoList/TodoList.tsx";
import {NotificationList} from "./Components/NotificationList/NotificationList.tsx";
import {NawBar} from "./Components/NawBar/NawBar.tsx";
import "@theme-toggles/react/css/Classic.css"
import {clsx} from "clsx";
import {useAppSelector} from "./hooks.ts";
import {selectIsDarkTheme} from "./Slices/ThemeSlice.ts";

function App() {
    const theme = useAppSelector(selectIsDarkTheme);
    return (
<>
        <NawBar/>
    <div className={clsx(classes.root, {[classes._isDark]: theme})}>
        <TodoList/>
        <NotificationList/>
        <ToastContainer/>
    </div>
</>
)
}

export default App
