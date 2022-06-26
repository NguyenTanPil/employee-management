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
      name: 'phoneNumber',
      status: 'asc',
    },
    {
      name: 'team',
      status: 'asc',
    },
  ],
});
