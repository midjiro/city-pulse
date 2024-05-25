import { createSlice, nanoid } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    draftList: [],
};

const draftsSlice = createSlice({
    name: 'drafts',
    initialState: INITIAL_STATE,
    reducers: {
        addDraft: (state, action) => {
            state.draftList.push({ _id: nanoid(), ...action.payload });
        },
        removeDraft: (state, action) => {
            state.draftList = state.draftList.filter(
                (draft) => draft._id !== action.payload
            );
        },
    },
});

export default draftsSlice.reducer;
export const { addDraft, removeDraft } = draftsSlice.actions;
