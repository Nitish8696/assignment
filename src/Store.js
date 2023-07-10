import { configureStore } from '@reduxjs/toolkit'
import freature from './Feature'

export const store = configureStore({
    reducer : {
        emp : freature
    }
})