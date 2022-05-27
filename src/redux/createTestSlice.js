import { createSlice } from "@reduxjs/toolkit";

const createTestSlice = createSlice({
    name: 'createTest',
    initialState: {
        questions:[]
    },
    reducers: {
        addQuestion: (state, action) => {
            state.questions = [...state.questions,action.payload]
        },
        deleteQuestion: (state,action) => {
            console.log(action.payload)
            state.questions = state.questions.filter((item) => {
                if(item.id === action.payload.id)
                {
                    if(item.loaiCauHoi === action.payload.loaiCauHoi)
                        return false
                    else 
                        return true
                }
                return true
            } )
        }
    }
})

export default createTestSlice;