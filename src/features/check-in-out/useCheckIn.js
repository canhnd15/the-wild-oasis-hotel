import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkIn, isLoading: isChecking } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-in", is_paid: true }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking #${data.id} checked-in successfully!`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/bookings");
    },
    onError: (err) => {
      toast.error(`Check-in error: ${err.message}`);
    },
  });

  return { isChecking, checkIn };
}
