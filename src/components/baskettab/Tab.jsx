import "./Tab.css";
import { useNavigate } from "react-router-dom";

const Tab = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="tab-container"
      onClick={(e) => {
        navigate(`/basket/${props.basket.name}`);
      }}
    >
      {props.basket.name}
    </div>
  );
};

export default Tab;
