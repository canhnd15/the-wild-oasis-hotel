import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckingOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isChecking } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked-out successfully!`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/bookings");
    },
    onError: (err) => {
      toast.error(`Check-out error: ${err.message}`);
    },
  });

  return { isChecking, checkOut };
}
