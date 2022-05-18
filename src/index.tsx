import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './store'

export const store = configureStore({ reducer: rootReducer })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
