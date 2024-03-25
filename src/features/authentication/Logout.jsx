import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";

function Logout() {
  const { logout, isLoading } = useLogout();

  if (isLoading) return <Spinner />;

  function handleLogout() {
    logout();
  }

  return (
    <ButtonIcon onClick={handleLogout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
