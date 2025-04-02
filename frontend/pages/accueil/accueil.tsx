import BentoDisplay from "../../components/bentoDisplay/bentoDisplay";
import Categories from "../../components/categories/categories";
import "./accueil.css";

function Accueil() {
  return (
    <div id="accueilStyle">
      <Categories />
      <BentoDisplay />
    </div>
  );
}

export default Accueil;
