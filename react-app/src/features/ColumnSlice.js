import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        list:[]
}

const ColumnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
        setColumnsList:(state, action)=>{
            state.list=action.payload.columns;
        },
        insertTaskInColumn:(state, action)=>{
          const newList= []
          state.list.map((c)=> {
            if(c.id==action.payload.task.column_id){
                  c.tasks?.push(action.payload.task);
            }
            newList.push(c);
          });
          state.list=newList;

        }

  }
});

export const {setColumnsList, insertTaskInColumn} = ColumnSlice.actions;
export const selectColumnsList= state => state.columns.list;

export default ColumnSlice.reducer;