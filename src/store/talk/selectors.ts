import { createSelector } from 'reselect';
import type { RootState } from '..';

export const selectTalkState = (state: RootState) => state.talk;

export const selectTalkLength = createSelector(
  selectTalkState,
  state => state.talkLength,
);

export const selectTopic = createSelector(
  selectTalkState,
  state => state.topic,
);
