import { store } from './store';

// action creator
export const onChangeSearchContent = (content) => {
  store.searchContent = content;
};

export const chooseTeamName = (teamName) => {
  store.teamName = teamName;
};

export const onChangeEmployeePerPage = (page) => {
  store.employeePerPage = page;
};
