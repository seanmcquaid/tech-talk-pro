import type TalkLengths from '@/enums/TalkLengths';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { z } from 'zod';
import type TalkCategories from '@/enums/TalkCategories';

export interface TalkState {
  talkCategory: z.infer<typeof TalkCategories>;
  talkLength: z.infer<typeof TalkLengths>;
}

const initialState: TalkState = {
  talkCategory: 'Software Engineering',
  talkLength: 30,
};

export const talkSlice = createSlice({
  name: 'talk',
  initialState,
  reducers: {
    setTopic: (
      state,
      action: PayloadAction<z.infer<typeof TalkCategories>>,
    ) => {
      state.talkCategory = action.payload;
    },
    setTalkLength: (
      state,
      action: PayloadAction<z.infer<typeof TalkLengths>>,
    ) => {
      state.talkLength = action.payload;
    },
  },
});

export const { setTalkLength, setTopic } = talkSlice.actions;

export default talkSlice;
