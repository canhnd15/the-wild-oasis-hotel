import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <Row>
      <Row type="hor">
        <Heading as="h1">Bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <BookingTable />
      </Row>
    </Row>
  );
}

export default Bookings;
