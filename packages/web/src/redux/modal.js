import { createSelector } from "reselect";

// action types

export const NEXT_MODAL = "NEXT_MODAL";

// action creators

export const nextModal = (modal) => ({
  type: NEXT_MODAL,
  payload: modal,
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
    default: {
      return state;
    }
  }
};

export const selectModalState = (state) => state.entities.modal;

export const modalSelector = createSelector([selectModalState], (modal) => modal);

export default ModalReducer;
