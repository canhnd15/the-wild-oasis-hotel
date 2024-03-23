import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingById } from "../bookings/useBookingById";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useQuerySettings } from "../settings/useQuerySettings";
import { useChecking } from "./useChecking";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckIn() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBookingById();
  const { settings, isLoading: isLoadingSettings } = useQuerySettings();

  useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking]);

  const moveBack = useMoveBack();
  const { isChecking, checkIn } = useChecking();

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests: { full_name: guestName },
    total_price: totalPrice,
    num_guests: numGuests,
    has_breakfast: hasBreakfast,
    num_nights: numNights,
  } = booking;

  const totalBreakfastPrice = Math.round(
    settings.breakfast_price * numGuests * numNights,
    2
  );

  function handleCheckIn() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extras_price: totalBreakfastPrice,
          total_price: totalPrice + totalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="hor">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Breakfast for <b>{numGuests} persons</b> on
            <b>{numNights} days</b> with total:
            <b>{formatCurrency(Math.round(totalBreakfastPrice))}</b>
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid || isChecking}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isChecking}
          id="confirm"
        >
          I confirm that <b>{guestName}</b> has paid the total amount:
          <b>{formatCurrency(totalPrice)}</b>
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckIn} disabled={!confirmPaid || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckIn;
