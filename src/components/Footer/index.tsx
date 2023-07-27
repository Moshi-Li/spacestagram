import nasaSVG from "../../assets/NASA_logo.svg";
import "./index.scss";

const Footer = () => {
  return (
    <div className="footer--container">
      <p>
        Built with <img src={nasaSVG} />
        <a href="https://api.nasa.gov/" target="_blank">
          NASA API
        </a>
      </p>
    </div>
  );
};

export default Footer;
