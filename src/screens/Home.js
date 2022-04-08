import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate("/questions")}>Start</Button>;
}
