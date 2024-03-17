import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  const filteredField = "discount";
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No discount" },
    { value: "with-discount", label: "With discount" },
  ];

  const sortOptions = [
    { value: "name-asc", label: "Cabin's name (A-Z)" },
    { value: "name-desc", label: "Cabin's name (Z-A)" },
    { value: "regular_price-asc", label: "Price (lower first)" },
    { value: "regular_price-desc", label: "Price (higher first)" },
    { value: "discount-asc", label: "Discount (lower first)" },
    { value: "discount-desc", label: "Discount (higher first)" },
  ];

  return (
    <TableOperations>
      <Filter filteredField={filteredField} options={filterOptions} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
