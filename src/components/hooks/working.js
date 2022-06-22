import { useQuery, useQueryClient, useMutation } from 'react-query';

export const useGetWorkingData = ({ title, employeeId, fetchFn }) =>
  useQuery(`get${title}`, () => fetchFn(employeeId));

export const useCreateNewItem = (title, createFn) => {
  const queryClient = useQueryClient();

  return useMutation(createFn, {
    onSuccess(newItem) {
      queryClient.setQueryData(`get${title}`, (prev) => [...prev, newItem]);
    },
  });
};

export const useDeleteItem = (title, deleteFn) => {
  const queryClient = useQueryClient();

  return useMutation(deleteFn, {
    onSuccess(deleteItem) {
      queryClient.setQueryData(`get${title}`, (prev) =>
        prev.filter((item) => item.id !== deleteItem.id)
      );
    },
  });
};
