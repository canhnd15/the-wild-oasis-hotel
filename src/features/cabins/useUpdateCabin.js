import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ editedCabinData, id }) =>
      createUpdateCabin(editedCabinData, id),
    onSuccess: () => {
      toast.success("Cabin is updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { isEditing, editCabin };
}
