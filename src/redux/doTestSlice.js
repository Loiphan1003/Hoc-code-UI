import { createSlice } from "@reduxjs/toolkit";

const doTestSlice = createSlice({
    name: 'doTest',
    initialState: {
        answer:[]
    },
    reducers: {
        addAnswer: (state, action) => {
            const ans = state.answer.find(element => element.id === action.payload.id&&element.loaiCauHoi===action.payload.loaiCauHoi)
          
            if(!!ans === false)
            {
                //them moi
                state.answer = [...state.answer,action.payload]
            }
            else{
                //sua lai gia tri 
                const index = state.answer.indexOf(ans);
                state.answer = state.answer.map((item , i) =>{
                    if(i === index)
                        return action.payload
                    else
                        return item
                })
            }
        }
    }
})

export default doTestSlice;