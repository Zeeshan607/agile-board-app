import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  viewTaskModal: false,
  selectWorkspaceModal: false,
  createBoardModal: false,
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
  },
});

// Export actions
export const {
  openViewTaskModal,
  closeViewTaskModal,
  openSelectWorkspaceModal,
  closeSelectWorkspaceModal,
  openCreateBoardModal,
  closeCreateBoardModal,
} = modalSlice.actions;

// Export reducer
export default modalSlice.reducer;

// Export selectors
export const selectViewTaskModal = (state) => state.modals.viewTaskModal;
export const selectSelectWorkspaceModal = (state) => state.modals.selectWorkspaceModal;
export const selectCreateBoardModal = (state) => state.modals.createBoardModal;
// Global methods
export const modalMethods = {
    openViewTaskModal: () => (dispatch) => {
      dispatch(openViewTaskModal());
    },
    closeViewTaskModal: () => (dispatch) => {
      dispatch(closeViewTaskModal());
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
  };