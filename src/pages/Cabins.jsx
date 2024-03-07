import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import styled from "styled-components";

const AddNewButton = styled.button`
  background-color: var(--color-blue-100);
  width: fit-content;
  padding: 10px;
  border-radius: var(--border-radius-md);
  border: none;
`;

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  const [showForm, setShowForm] = useState(false);

  return (
    <Row>
      <Row type="hor">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />

        <AddNewButton onClick={() => setShowForm(!showForm)}>
          Add new Cabin
        </AddNewButton>

        {showForm && <CreateCabinForm />}
      </Row>
    </Row>
  );
}

export default Cabins;
