import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isNewVentaModalOpen: false,
    isNewCompraModalOpen: false,
    isInfoModalOpen: false,
    isBtnRenovarActive: false,
    isAddFacturaModalOpen: false,
  },
  reducers: {
    onOpenVentaModal: (state) => {
      state.isNewVentaModalOpen = true;
    },
    onCloseVentaModal: (state) => {
      state.isNewVentaModalOpen = false;
    },
    onOpenCompraModal: (state) => {
      state.isNewCompraModalOpen = true;
    },
    onCloseCompraModal: (state) => {
      state.isNewCompraModalOpen = false;
    },
    onOpenInfoModal: (state) => {
      state.isInfoModalOpen = true;
    },
    onCloseInfoModal: (state) => {
      state.isInfoModalOpen = false;
    },
    onActiveBtnRenovar: (state, {payload}) => {
      if(payload.count>0){
        state.isBtnRenovarActive = true;
      } else {
        state.isBtnRenovarActive = false;
      }
    },
    onOpenModalAddFactura: (state) => {
      state.isAddFacturaModalOpen = true;
    },
    onCloseModalAddFactura: (state) => {
      state.isAddFacturaModalOpen = false;
    }
  }
})

export const {
  onOpenVentaModal,
  onCloseVentaModal,
  onOpenCompraModal,
  onCloseCompraModal,
  onOpenInfoModal,
  onCloseInfoModal,
  onActiveBtnRenovar,
  onOpenModalAddFactura,
  onCloseModalAddFactura
} = uiSlice.actions

