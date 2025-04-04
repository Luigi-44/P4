import { useEffect, useState } from "react";
import addIcon from "../../assets/icon/addIcon.png";
import AjoutCategories from "../ajoutCategories/ajoutCatego";
import "./bentoDivertissement.css";

interface Site {
  urls: string;
  images: string;
  category_name: string;
}

function BentoDisplay() {
  const [sites, setSites] = useState<Site[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/sitesbycategories/allcategories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données reçues:", data);
        setSites(data);
      })
      .catch((error) => console.error("Erreur:", error));
  }, []);

  // Grouper les sites par catégorie une seule fois
  const groupedSites = sites.reduce((acc, site) => {
    if (!acc[site.category_name]) {
      acc[site.category_name] = [];
    }
    acc[site.category_name].push(site);
    return acc;
  }, {} as Record<string, Site[]>);

  return (
    <section className="sectionBite">
      <section id="bentoDisplay">
        {Object.entries(groupedSites).map(([category, categorySites]) => (
          <div key={category} className="bentoDisplay-container">
            <div id="titreDisplay">
              <h2>{category}</h2>
            </div>
            <div id="bentoDisplay-content">
              {categorySites.map((site) => {
                // Séparer les URLs et images en tableaux
                const urls = site.urls.split(",").map((url) => url.trim());
                const images = site.images.split(",").map((img) => img.trim());

                // Créer un élément pour chaque paire URL/image
                return urls.map((url, index) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-container"
                  >
                    {images[index] && (
                      <img
                        src={`http://localhost:3000/assets/${images[index]}`}
                        alt={url}
                        className="site-logo"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          console.log(
                            "URL de l'image qui a échoué:",
                            `http://localhost:3000/assets/${images[index]}`
                          );
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </a>
                ));
              })}
            </div>
          </div>
        ))}

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div className="modal-container" onClick={() => setIsModalOpen(true)}>
          <span>Ajouter une Catégorie</span>
          <img src={addIcon} alt="Ajouter une catégorie" />
        </div>
        <AjoutCategories
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetch("http://localhost:3000/api/sitesbycategories/allcategories")
              .then((response) => response.json())
              .then((data) => setSites(data));
          }}
        />
      </section>
    </section>
  );
}

export default BentoDisplay;
