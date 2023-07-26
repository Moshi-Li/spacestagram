import Toggle from "react-toggle";
import "react-toggle/style.css";

import { useColorScheme } from "../../hooks/colorScheme";
import "./index.scss";

export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();

  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => {
        setIsDark(target.checked);
      }}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};

export default DarkModeToggle;
