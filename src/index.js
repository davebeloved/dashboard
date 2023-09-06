import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { loadUsers } from './store/authSlice'
import { StateContextProvider } from './context/contextProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
store.dispatch(loadUsers)
root.render(
    <Provider store={store}>
        <StateContextProvider>
            <App />
        </StateContextProvider>
    </Provider>
)
