import AppConstants from '@/AppConstants';
import Topics from '@/enums/Topics';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export interface TalkState {
  topic: z.infer<typeof Topics>;
  talkLength: (typeof AppConstants.talkLengthOptions)[number];
}

const initialState: TalkState = {
  topic: 'Software Engineering',
  talkLength: 30,
};

export const talkSlice = createSlice({
  name: 'talk',
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<z.infer<typeof Topics>>) => {
      state.topic = action.payload;
    },
    setTalkLength: (
      state,
      action: PayloadAction<(typeof AppConstants.talkLengthOptions)[number]>,
    ) => {
      state.talkLength = action.payload;
    },
  },
});

export const { setTalkLength, setTopic } = talkSlice.actions;

export default talkSlice;
