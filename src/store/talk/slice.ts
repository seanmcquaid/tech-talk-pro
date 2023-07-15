import type TalkLengths from '@/enums/TalkLengths';
import type Topics from '@/enums/Topics';
import type { PayloadAction} from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { z } from 'zod';

export interface TalkState {
  topic: z.infer<typeof Topics>;
  talkLength: z.infer<typeof TalkLengths>;
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
      action: PayloadAction<z.infer<typeof TalkLengths>>,
    ) => {
      state.talkLength = action.payload;
    },
  },
});

export const { setTalkLength, setTopic } = talkSlice.actions;

export default talkSlice;
