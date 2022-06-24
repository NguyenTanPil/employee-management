import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createNewEmployee,
  fetchEmployeeByTeamId,
  fetchEmployeeData,
} from '../../api/employeeApi';

export const useGetEmployeeListBySearchContent = ({
  page,
  searchContent,
  pageLimit,
}) =>
  useQuery(
    ['getEmployeeData', page + '', searchContent, pageLimit],
    () =>
      fetchEmployeeData({
        pageParam: page,
        limit: pageLimit,
        searchContent,
      }),
    {
      keepPreviousData: true,
    }
  );

export const useGetEmployeeListByTeamName = (teamName) =>
  useQuery(
    ['getEmployeeByFilter', teamName],
    () => fetchEmployeeByTeamId(teamName),
    {
      enabled: !!teamName,
    }
  );

export const useDeleteEmployeeBySelected = ({
  deleteFn,
  page,
  searchContent,
}) => {
  const queryClient = useQueryClient();

  return useMutation(deleteFn, {
    onSuccess() {
      queryClient.invalidateQueries([
        'getEmployeeData',
        page + '',
        searchContent,
      ]);
    },
  });
};

export const useCreateNewEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation(createNewEmployee, {
    onSuccess() {
      queryClient.invalidateQueries(['getEmployeeData']);
    },
  });
};
