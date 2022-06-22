import { useQuery, useMutation, useQueryClient } from 'react-query';
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
