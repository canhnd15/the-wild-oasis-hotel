import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  //  1. CREATE NEW CABIN
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      toast.success("New cabin is created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { isCreating, createCabin };
}
