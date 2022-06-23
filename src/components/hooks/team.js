import { useQuery, useMutation, useQueryClient } from 'react-query';
import { deleteEmployee } from '../../api/employeeApi';
import { createNewTeam, fetchTeamData } from '../../api/teamApi';

export const useGetTeamList = () => useQuery('getTeamData', fetchTeamData);

export const useCreateNewTeam = () => {
  const queryClient = useQueryClient();

  return useMutation(createNewTeam, {
    onSuccess(newTeam) {
      queryClient.setQueryData('getTeamData', (prev) => [...prev, newTeam]);
    },
  });
};

export const useDeleteEmployeeInTeam = (teamName) => {
  const queryClient = useQueryClient();

  return useMutation(deleteEmployee, {
    onSuccess(deletedEmployee) {
      queryClient.setQueryData(['getEmployeeByFilter', teamName], (prev) =>
        prev.filter((employee) => employee.id !== deletedEmployee.id)
      );

      queryClient.invalidateQueries('getEmployeeData');
    },
  });
};
