import { proxy } from 'valtio';
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

export const setSortBy = (name) => {
  store.sortBy = name;
};

export const setColumns = (colName) => {
  store.columns = store.columns.map((col) => {
    if (col.name === colName) {
      if (col.status === 'asc') {
        return proxy({
          ...col,
          status: 'desc',
        });
      } else {
        return proxy({
          ...col,
          status: 'asc',
        });
      }
    } else {
      return col;
    }
  });
};

export const handleChangeColumns = (colName) => {
  const colList = store.columns.map((col) => col.name);

  if (colList.includes(colName)) {
    store.columns = store.columns.filter((col) => col.name !== colName);
  } else {
    store.columns = [...store.columns, proxy({ name: colName, status: 'asc' })];
  }
};
