import { GoHome, GoGoal } from "react-icons/go";
import DarkModeToggle from "../DarkModeToggle";
import "./index.scss";

const NavBar = ({
  setHome,
}: {
  setHome: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav className="navigation--bar">
      <div className="navigation--list">
        <span className="icon--container" onClick={() => setHome(true)}>
          <GoHome></GoHome>
        </span>
        <span className="icon--container" onClick={() => setHome(false)}>
          <GoGoal></GoGoal>
        </span>
      </div>

      <DarkModeToggle></DarkModeToggle>
    </nav>
  );
};

export default NavBar;
