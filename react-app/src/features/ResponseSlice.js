import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages:[],
    errors:[]
}

const ResponseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    genResp:(state, action)=>{
        if(action.payload.type=='err'){
            state.errors.push(action.payload.body);  
        }
        if(action.payload.type=="msg"){
            state.messages.push(action.payload.body);
        }

    },
    resetResp:(state, action)=>{
             state.messages=new Array();
             state.errors= new Array();
    }
  }
});

export const {genResp, resetResp} = ResponseSlice.actions;
export const SelectMessages= state => state.response.messages;
export const SelectErrors= state => state.response.errors;

export default ResponseSlice.reducer;