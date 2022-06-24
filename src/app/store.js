import { proxy } from 'valtio';

export const store = proxy({
  searchContent: '',
  teamName: '',
  employeePerPage: 3,
});
