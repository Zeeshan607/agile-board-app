import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  viewTaskModal: false,
  createNewTaskModal:false,
  createNewColumnModal:false,
  selectWorkspaceModal: false,
  createBoardModal: false,
  sendInvitationModal:false,
  createWorkspaceModal:false,
};

// Create a slice of state
const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openViewTaskModal: (state) => {
      state.viewTaskModal = true;
    },
    closeViewTaskModal: (state) => {
      state.viewTaskModal = false;
    },
    openCreateNewTaskModal:(state)=>{
      state.createNewTaskModal=true;
    },
    closeCreateNewTaskModal:(state)=>{
      state.createNewTaskModal=false;
    },
    openCreateNewColumnModal:(state)=>{
      state.createNewColumnModal=true;
    },
    closeCreateNewColumnModal:(state)=>{
      state.createNewColumnModal=false;
    },
    openSelectWorkspaceModal: (state) => {
      state.selectWorkspaceModal = true;
    },
    closeSelectWorkspaceModal: (state) => {
      state.selectWorkspaceModal = false;
    },
    openCreateBoardModal: (state) => {
      state.createBoardModal = true;
    },
    closeCreateBoardModal: (state) => {
      state.createBoardModal = false;
    },
    openSendInvitationModal:(state)=>{
      state.sendInvitationModal=true;
    },
    closeSendInvitationModal:(state)=>{
      state.sendInvitationModal=false;
    },
    openCreateWorkspaceModal:(state)=>{
      state.createWorkspaceModal=true;
    },
    closeCreateWorkspaceModal:(state)=>{
      state.createWorkspaceModal=false;
    },


  },
});

// Export actions
export const {
  openViewTaskModal,
  closeViewTaskModal,
  openCreateNewTaskModal,
  closeCreateNewTaskModal,
  openCreateNewColumnModal,
  closeCreateNewColumnModal,
  openSelectWorkspaceModal,
  closeSelectWorkspaceModal,
  openCreateBoardModal,
  closeCreateBoardModal,
  openSendInvitationModal,
  closeSendInvitationModal,
  openCreateWorkspaceModal,
  closeCreateWorkspaceModal
} = modalSlice.actions;

// Export reducer
export default modalSlice.reducer;

// Export selectors
export const selectViewTaskModal = (state) => state.modals.viewTaskModal;
export const selectCreateNewTaskModal=(state)=>state.modals.createNewTaskModal;
export const selectSelectWorkspaceModal = (state) => state.modals.selectWorkspaceModal;
export const selectCreateBoardModal = (state) => state.modals.createBoardModal;
export const selectSendInvitationModal=(state)=>state.modals.sendInvitationModal;
export const selectCreateWorkspaceModal=(state)=>state.modals.createWorkspaceModal;
export const selectCreateNewColumnModal=(state)=>state.modals.createNewColumnModal;
// Global methods
export const modalMethods = {
    openViewTaskModal: () => (dispatch) => {
      dispatch(openViewTaskModal());
    },
    closeViewTaskModal: () => (dispatch) => {
      dispatch(closeViewTaskModal());
    },
    openCreateNewTaskModal:()=>(dispatch)=>{
      dispatch(openCreateNewTaskModal());
    },
    closeCreateNewTaskModal:()=>(dispatch)=>{
      dispatch(closeCreateNewTaskModal());
    },
    openCreateNewColumnModal:()=>(dispatch)=>{
      dispatch(openCreateNewColumnModal());
    },
    closeCreateNewColumnModal:()=>(dispatch)=>{
      dispatch(closeCreateNewColumnModal());
    },
    openSelectWorkspaceModal: () => (dispatch) => {
      dispatch(openSelectWorkspaceModal());
    },
    closeSelectWorkspaceModal: () => (dispatch) => {
      dispatch(closeSelectWorkspaceModal());
    },
    openCreateBoardModal: () => (dispatch) => {
      dispatch(openCreateBoardModal());
    },
    closeCreateBoardModal: () => (dispatch) => {
      dispatch(closeCreateBoardModal());
    },
    openSendInvitationModal:()=>(dispatch)=>{
      dispatch(openSendInvitationModal());
    },
    closeSendInvitationModal:()=>(dispatch)=>{
      dispatch(closeSendInvitationModal());
    },
    openCreateWorkspaceModal:()=>(dispatch)=>{
      dispatch(openCreateWorkspaceModal());
    },
    closeCreateWorkspaceModal:()=>(dispatch)=>{
      dispatch(closeCreateWorkspaceModal());
    }
  };