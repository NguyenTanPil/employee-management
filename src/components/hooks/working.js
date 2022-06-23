import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useGetWorkingData = ({
  title,
  employeeId,
  field = 'hours',
  fetchFn,
}) => {
  const result = useQuery([`get${title}`, employeeId], () =>
    fetchFn(employeeId)
  );

  let total = 0;
  if (result.status === 'success') {
    total = result?.data.reduce((sum, curr) => sum + curr[field], 0);
  }

  return { ...result, total };
};

export const useCreateNewItem = ({ title, employeeId, createFn }) => {
  const queryClient = useQueryClient();

  return useMutation(createFn, {
    onSuccess(newItem) {
      queryClient.setQueryData([`get${title}`, employeeId], (prev) => [
        ...prev,
        newItem,
      ]);
    },
  });
};

export const useDeleteItem = ({ title, employeeId, deleteFn }) => {
  const queryClient = useQueryClient();

  return useMutation(deleteFn, {
    onSuccess(deleteItem) {
      queryClient.setQueryData([`get${title}`, employeeId], (prev) =>
        prev.filter((item) => item.id !== deleteItem.id)
      );
    },
  });
};
