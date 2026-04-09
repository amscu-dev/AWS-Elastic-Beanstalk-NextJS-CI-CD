import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: "create" | "edit" | "delete" | null;
  channelId: number | null;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  channelId: null,
};

export const modalStateSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpenChannelModal: (
      state,
      action: PayloadAction<{
        channelId: number;
      }>,
    ) => {
      state.isOpen = true;
      state.channelId = action.payload.channelId;
    },
    onCloseChannelModal: (state) => {
      state.isOpen = false;
      state.channelId = null;
    },
  },
});

export const { onOpenChannelModal, onCloseChannelModal } =
  modalStateSlice.actions;
export default modalStateSlice.reducer;
