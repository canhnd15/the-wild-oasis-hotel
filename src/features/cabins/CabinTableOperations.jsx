import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperations() {
  const filteredField = "discount";
  const options = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No discount" },
    { value: "with-discount", label: "With discount" },
  ];

  return (
    <TableOperations>
      <Filter filteredField={filteredField} options={options} />
    </TableOperations>
  );
}

export default CabinTableOperations;
