import { fetchEmployeeById, updateEmployee } from '../../api/employeeApi';
import { useQueryClient, useQuery, useMutation } from 'react-query';

export const useGetEmployeeById = (employeeId, page) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['getEmployee', employeeId],
    () => fetchEmployeeById(employeeId),
    {
      enable: !!employeeId && !!page,
      initialData: () => {
        return queryClient
          .getQueryData(['getEmployeeData', page])
          ?.data.find((e) => e.id === employeeId);
      },
    }
  );
};

export const useUpdateEmployeeById = (page) => {
  const queryClient = useQueryClient();

  return useMutation(updateEmployee, {
    onSuccess(newEmployee) {
      // update this employee
      queryClient.setQueryData(['getEmployee', newEmployee.id], newEmployee);

      // update employee list with new employee
      queryClient.setQueryData(['getEmployeeData', page, ''], (prev) => ({
        ...prev,
        data: prev.data.map((item) => {
          if (item.id === newEmployee.id) {
            return {
              ...item,
              ...newEmployee,
            };
          }
          return item;
        }),
      }));
    },
  });
};
