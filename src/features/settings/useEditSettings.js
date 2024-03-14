import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettings } from "../../services/apiSettings";

export function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: editSettings, isLoading: isEditing } = useMutation({
    mutationFn: ({ editedSetting }) => updateSettings(editedSetting),
    onSuccess: () => {
      toast.success("Settings is updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });

  return { isEditing, editSettings };
}
