import { proxy } from 'valtio';

export const store = proxy({
  searchContent: '',
  teamName: '',
  employeePerPage: 3,
  sortBy: 'fullName',
  columns: [
    {
      name: 'fullName',
      status: 'asc',
    },
    {
      name: 'phone',
      status: 'asc',
    },
    {
      name: 'team',
      status: 'asc',
    },
  ],
});
