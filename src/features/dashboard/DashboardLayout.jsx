import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStay } from "./useRecentStay";
import { useQueryCabin } from "../cabins/useQueryCabin";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isRecentBookingLoading } = useRecentBooking();
  const {
    confirmedStays,
    isLoading: isStaysLoading,
    numDays,
  } = useRecentStay();
  const { cabins, isLoading: isCabinsLoading } = useQueryCabin();

  if (isRecentBookingLoading || isStaysLoading || isCabinsLoading)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today's activities</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
