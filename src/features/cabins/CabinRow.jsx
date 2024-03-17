import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { IoDuplicate } from "react-icons/io5";

import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: idCabin,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: cabin.name,
      maxCapacity: cabin.max_capacity,
      regularPrice: cabin.regular_price,
      discount: cabin.discount,
      description: cabin.description,
      image: image,
    });
  }

  return (
    <Table.Row>
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
        <Modal>
          <Modal.Open opens={"edit-cabin"}>
            <MdEditSquare size={"24px"} color={"blue"} cursor={"pointer"} />
          </Modal.Open>
          <Modal.Window name={"edit-cabin"}>
            <CreateCabinForm editedCabin={cabin} />
          </Modal.Window>

          <Modal.Open opens={"delete-cabin"}>
            <RiDeleteBin4Fill size={"24px"} color={"red"} cursor={"pointer"} />
          </Modal.Open>
          <Modal.Window name={"delete-cabin"}>
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={() => deleteCabin(idCabin)}
              disabled={isDeleting}
              onCloseModal={true}
            />
          </Modal.Window>
        </Modal>
        <IoDuplicate
          onClick={handleDuplicate}
          disabled={isCreating}
          size={"24px"}
          cursor={"pointer"}
        />
      </ButtonDiv>
    </Table.Row>
  );
}

export default CabinRow;
