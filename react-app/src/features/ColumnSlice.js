import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CustomRequest from '../utils/customRequest.jsx';


export const fetchColumns=createAsyncThunk("fetch/board/columns", async (slug, { rejectWithValue })=>{
  try{
    const resp = await CustomRequest.get(`/dashboard/board/${slug}/columns`);
    return await resp.data.columns;
  }catch(err){
    if (err.response) {
      // The server responded with a status code that falls out of the range of 2xx
      return rejectWithValue(err.response.data);
    } else if (err.request) {
      // The request was made but no response was received
      return rejectWithValue('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      return rejectWithValue('Request error:' + err.response.data.msg);
    }
  }

})


const initialState= {
        list:[],
        status:"idle",
        errors:[]
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
  },
  extraReducers(builder){
      builder.addCase(fetchColumns.pending, (state, action)=>{
            state.status="pending";
      })
      .addCase(fetchColumns.fulfilled, (state, action)=>{
        state.list=action.payload;
        state.status="success";
  })
  .addCase(fetchColumns.rejected, (state, action)=>{
    state.status="failed";
    state.errors.push(action.error.message)
})
  }
});

export const {setColumnsList, insertTaskInColumn} = ColumnSlice.actions;
export const selectColumnsList= state => state.columns.list;

export default ColumnSlice.reducer;