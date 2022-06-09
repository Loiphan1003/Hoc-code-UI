import { createSlice } from "@reduxjs/toolkit";

const createTestSlice = createSlice({
    name: 'createTest',
    initialState: {
        questions:[]
    },
    reducers: {
        addQuestion: (state, action) => {

            state.questions = [...state.questions,...action.payload]
            let score = (10/state.questions.length);
            score = Math.floor(score * 100) / 100;
            state.questions.forEach( item => item.diem = score);
        },
        deleteQuestion: (state,action) => {
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
            let score = (10/state.questions.length);
            score = Math.floor(score * 100) / 100;
            state.questions.forEach( item => item.diem = score);
        },
        clearQuestion: (state,action) => {
            state.questions = action.payload;
        }
    }
})

export default createTestSlice;