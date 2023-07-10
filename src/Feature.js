import { createSlice } from "@reduxjs/toolkit";
import { Arry } from "./Data";


const initialState = {
    filtered_M : [...Arry],
    all_M : [...Arry],
    emplyee: [],
    manager : ''
}

const freature = createSlice({
    name: 'feature',
    initialState,
    reducers: {
        getEmployee: (state, action) => {
            state.emplyee = action.payload
        },
        getManger: (state, action) => {
            state.manager = action.payload
        },
        filter : (state, action) =>{
            let query = action.payload
            let newItems = [...state.filtered_M]
            if (query) {
                newItems = newItems.filter((item)=>{
                   return item.manager.toUpperCase().startsWith(query.toUpperCase())
                })
                state.filtered_M = newItems

            }
            else {
                state.filtered_M = state.all_M
            }
        }
    }
})

export const { getEmployee,getManger,filter } = freature.actions
export default freature.reducer