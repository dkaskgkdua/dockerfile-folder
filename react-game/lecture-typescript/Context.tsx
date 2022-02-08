import React from 'react';
import { createContext, ReactElement, FC } from 'react';
import { userStore, postStore } from './storeMobx';
export const storeContext = React.createContext({
    userStore,
    postStore,
});
interface Props {
    children: ReactElement
}
export const StoreProvider: FC<Props> = ({children})=> {
    return (
        <storeContext.Provider value={{ userStore, postStore }}>
            {children}
        </storeContext.Provider>
    )
}