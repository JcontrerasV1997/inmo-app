import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from '../routes/AppRouter'
import {store} from '../redux/store/store'
export const InmoApp = () => {
    return (
        <div>
        <Provider store={store}>
            <AppRouter></AppRouter>
        </Provider>
        </div>
    )
}
