import Spinner from "../../ui/Spinner";
import CabinRow from "../../features/cabins/CabinRow";
import Table from "../../ui/Table";
import { useQueryCabin } from "./useQueryCabin";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useQueryCabin();
  const [searchParam] = useSearchParams();

  if (isLoading) return <Spinner />;

  //FILTER
  const filterValue = searchParam.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //SORT
  const sortBy = searchParam.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

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
        // data={filteredCabins}
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
