import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import {
  HiMiniArrowRightOnRectangle,
  HiArrowUpOnSquare,
} from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  STATUS_CHECKED_IN,
  STATUS_CHECKED_OUT,
  STATUS_UNCONFIRMED,
} from "../../utils/constants";
import { useCheckingOut } from "../check-in-out/useCheckingOut";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

function BookingRow({
  booking: {
    id: bookingId,
    start_date: startDate,
    end_date: endDate,
    num_nights: numNights,
    total_price: totalPrice,
    status,
    guests: { full_name, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { isChecking, checkOut } = useCheckingOut();
  const { isDeleting, doDeleteBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckout() {
    checkOut(bookingId);
  }

  function handleDelete() {
    doDeleteBooking(bookingId);
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{full_name}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <ButtonDiv>
        <TbListDetails
          size={"24px"}
          cursor={"pointer"}
          onClick={() => navigate(`/bookings/${bookingId}`)}
        />
        {status === STATUS_UNCONFIRMED && (
          <HiMiniArrowRightOnRectangle
            size={"24px"}
            cursor={"pointer"}
            color="blue"
            onClick={() => navigate(`/check-in/${bookingId}`)}
          />
        )}

        {status === STATUS_CHECKED_IN && (
          <HiArrowUpOnSquare
            size={"24px"}
            cursor={"pointer"}
            color="green"
            onClick={() => handleCheckout()}
          />
        )}

        {status === STATUS_CHECKED_OUT && (
          <MdDelete
            size={"24px"}
            cursor={"pointer"}
            color="red"
            onClick={() => handleDelete()}
          />
        )}
      </ButtonDiv>
    </Table.Row>
  );
}

export default BookingRow;
