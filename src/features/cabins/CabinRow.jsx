import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 0.6fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: idCabin,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
  } = cabin;

  // const queryClient = useQueryClient();

  // const { isLoading: isDeleting, mutate } = useMutation({
  //   mutationFn: (id) => deleteCabin(id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     toast.success("Cabin deleted!");
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fit up to {max_capacity} guests</div>
        <Price>{formatCurrency(regular_price)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <ButtonDiv>
          <button onClick={() => setShowForm((show) => !show)}>
            <MdEditSquare size={"24px"} color={"blue"} />
          </button>
          <button onClick={() => deleteCabin(idCabin)} disabled={isDeleting}>
            <RiDeleteBin4Fill size={"24px"} color={"red"} />
          </button>
        </ButtonDiv>
      </TableRow>
      {showForm && <CreateCabinForm editedCabin={cabin} />}
    </>
  );
}

export default CabinRow;
