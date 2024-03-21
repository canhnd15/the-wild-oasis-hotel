import Spinner from "../../ui/Spinner";
import CabinRow from "../../features/cabins/CabinRow";
import Table from "../../ui/Table";
import { useQueryCabin } from "./useQueryCabin";
import Pagination from "../../ui/Pagination";

function CabinTable() {
  const { isLoading, cabins, count } = useQueryCabin();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.6fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Actions</div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
      <Table.Footer>
        <Pagination totalRecords={count} />
      </Table.Footer>
    </Table>
  );
}

export default CabinTable;
