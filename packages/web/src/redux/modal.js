import { createSelector } from "reselect";

// action types

export const NEXT_MODAL = "NEXT_MODAL";
export const RESTART_MODAL = "RESTART_MODAL";

// action creators

export const nextModal = (modal) => ({
  type: NEXT_MODAL,
  payload: modal,
});

export const resetModal = () => ({
  type: RESTART_MODAL,
});

// reducer

export const initialState = {
  currentModal: 0,
};

const ModalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NEXT_MODAL: {
      return {
        ...state,
        currentModal: payload,
      };
    }
    case RESTART_MODAL: {
      return {
        currentModal: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export const selectModalState = (state) => state.entities.modal;

export const modalSelector = createSelector([selectModalState], (modal) => modal);

export default ModalReducer;
