import { store } from './store';

// action creator
export const onChangeSearchContent = (content) => {
  store.searchContent = content;
};

export const chooseTeamName = (teamName) => {
  store.teamName = teamName;
};
