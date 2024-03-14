import { useState } from "react";
import Button from "../../ui/Button";
import Model from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin({ children }) {
  const [isShowModel, setIsShowModel] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsShowModel(!isShowModel)}>Add Cabin</Button>

      {isShowModel && (
        <Model onClose={() => setIsShowModel(false)}>
          <CreateCabinForm onCloseModel={() => setIsShowModel(false)} />
        </Model>
      )}
    </div>
  );
}

export default AddCabin;
