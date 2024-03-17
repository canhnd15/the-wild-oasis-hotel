import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
      <Modal>
        <Modal.Open opens="table">
          <Button>Show table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin({ children }) {
//   const [isShowModel, setIsShowModel] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsShowModel(!isShowModel)}>Add Cabin</Button>

//       {isShowModel && (
//         <Model onClose={() => setIsShowModel(false)}>
//           <CreateCabinForm onCloseModel={() => setIsShowModel(false)} />
//         </Model>
//       )}
//     </div>
//   );
// }

export default AddCabin;
