import BentoDisplay from "../../components/bentoDisplay/bentoDivertissement";
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
