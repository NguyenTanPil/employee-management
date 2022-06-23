import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
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
