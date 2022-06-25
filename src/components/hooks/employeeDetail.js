import { fetchEmployeeById, updateEmployee } from '../../api/employeeApi';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useGetEmployeeById = ({
  employeeId,
  page,
  searchContent,
  pageLimit,
  sortCondition,
}) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['getEmployee', employeeId],
    () => fetchEmployeeById(employeeId),
    {
      enable: !!employeeId && !!page,
      initialData: () => {
        return queryClient
          .getQueryData([
            'getEmployeeData',
            page,
            searchContent,
            pageLimit,
            sortCondition,
          ])
          ?.data.find((e) => e.id === employeeId);
      },
    },
  );
};

export const useUpdateEmployeeById = () => {
  const queryClient = useQueryClient();

  return useMutation(updateEmployee, {
    onSuccess(newEmployee) {
      // update this employee
      queryClient.setQueryData(['getEmployee', newEmployee.id], newEmployee);

      // update employee list with new employee
      queryClient.invalidateQueries(['getEmployeeData']);
    },
  });
};

export const useDeleteEmployeeDetail = (deleteFn) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(deleteFn, {
    onSuccess() {
      navigate('/');
      queryClient.invalidateQueries(['getEmployeeData']);
    },
  });
};
