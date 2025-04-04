import luigi from "../../assets/Luigi.png";
import "./header.css";
// Définition de l'interface User

function Header() {
  return (
    <nav id="navBar">
      <div className="connexion-container">
        <div className="connexion-button">Déconnexion</div>
        <img src={luigi} alt="logo" className="logo-luigi" />
      </div>
      <div>SignetPro</div>
    </nav>
  );
}

export default Header;
