import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
  deleteEmployee,
  deleteEmployeeBySelected,
  fetchEmployeeByTeamId,
  fetchEmployeeData,
} from '../../api/employeeApi';

export const useGetEmployeeListBySearchContent = ({
  page,
  searchContent,
  PAGE_LIMIT,
}) =>
  useQuery(
    ['getEmployeeData', page + '', searchContent],
    () =>
      fetchEmployeeData({
        pageParam: page,
        limit: PAGE_LIMIT,
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

export const useDeleteEmployeeById = (page, searchContent = '') => {
  const queryClient = useQueryClient();

  return useMutation(deleteEmployee, {
    onSuccess(deletedEmployee) {
      // update data
      queryClient.setQueryData(
        ['getEmployeeData', page + '', searchContent],
        (prev) => ({
          ...prev,
          data: prev.data.filter((item) => item.id !== deletedEmployee.id),
        })
      );
    },
  });
};

export const useDeleteEmployeeBySelected = (page, searchContent) => {
  const queryClient = useQueryClient();

  return useMutation(deleteEmployeeBySelected, {
    onSuccess(employeeIdList) {
      queryClient.setQueryData(
        ['getEmployeeData', page + '', searchContent],
        (prev) => ({
          ...prev,
          data: prev.data.filter((item) => !employeeIdList.includes(item.id)),
        })
      );
    },
  });
};
