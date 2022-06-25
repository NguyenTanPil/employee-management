import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createNewEmployee,
  fetchEmployeeByTeamId,
  fetchEmployeeData,
  updateEmployeeAvatar,
} from '../../api/employeeApi';

export const useGetEmployeeListBySearchContent = ({
  page,
  searchContent,
  pageLimit,
  sortCondition,
}) => {
  return useQuery(
    ['getEmployeeData', page + '', searchContent, pageLimit, sortCondition],
    () =>
      fetchEmployeeData({
        pageParam: page,
        limit: pageLimit,
        searchContent,
        sortCondition,
      }),
    {
      keepPreviousData: true,
    },
  );
};

export const useGetEmployeeListByTeamName = (teamName) =>
  useQuery(
    ['getEmployeeByFilter', teamName],
    () => fetchEmployeeByTeamId(teamName),
    {
      enabled: !!teamName,
    },
  );

export const useDeleteEmployeeBySelected = ({ deleteFn }) => {
  const queryClient = useQueryClient();

  return useMutation(deleteFn, {
    onSuccess() {
      queryClient.invalidateQueries(['getEmployeeData']);
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

export const useUpdateEmployeeAvatar = (employeeId) => {
  const queryClient = useQueryClient();

  return useMutation(updateEmployeeAvatar, {
    onSuccess() {
      queryClient.invalidateQueries(['getEmployee', employeeId]);
    },
  });
};
