import { createSlice } from "@reduxjs/toolkit";
import { Arry } from "./Data";

const getFromLocalStorage = () => {
    let filter = localStorage.getItem('filter')
    if (filter) {
        return JSON.parse(localStorage.getItem('filter'))
    }
    else {
        return [...Arry]
    }
}

const initialState = {
    filtered_M: getFromLocalStorage(),
    all_M: getFromLocalStorage(),
    isLoading: false,
    emplyee: [],
    all_E: [],
    id: '',
    manager: ''
}

const freature = createSlice({
    name: 'feature',
    initialState,
    reducers: {
        updateLoading: (state, action) => {
            state.isLoading = true;
        },
        getEmployee: (state, action) => {
            state.emplyee = action.payload
            state.all_E = action.payload
        },
        updateEmployee: (state, action) => {
            let arr = JSON.parse(localStorage.getItem('filter'))
            let newEmployee = arr.find((item)=>item.id == state.id)
            if (newEmployee) {
                newEmployee.Employee.push(action.payload)
                localStorage.setItem('filter', JSON.stringify(arr)); 
            }
        },
        getId: (state, action) => {
            state.id = action.payload
        },
        getManger: (state, action) => {
            state.manager = action.payload
        },
        filter: (state, action) => {
            let query = action.payload
            let newItems = [...state.filtered_M]
            if (query) {
                newItems = newItems.filter((item) => {
                    return item.manager.toUpperCase().startsWith(query.toUpperCase())
                })
                state.filtered_M = newItems

            }
            else {
                state.filtered_M = state.all_M
            }
        },
        filterE: (state, action) => {
            let query = action.payload
            let newItems = [...state.emplyee]
            if (query) {
                newItems = newItems.filter((item) => {
                    return item.employee.toUpperCase().startsWith(query.toUpperCase())
                })
                state.emplyee = newItems
            }
            else {
                state.emplyee = state.all_E
            }
        },
        pushManager: (state, action) => {
            let newManager = action.payload
            state.filtered_M = [...state.filtered_M, newManager]
            localStorage.setItem('filter', JSON.stringify(state.filtered_M))
        }
    }
})

export const { getEmployee, getManger, filter, filterE, pushManager, updateEmployee, updateLoading, getId } = freature.actions
export default freature.reducer