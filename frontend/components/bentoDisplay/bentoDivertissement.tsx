import { useEffect, useState } from "react";
import AjoutCategories from "../ajoutCategories/ajoutCatego";
import "./bentoDivertissement.css";

interface Site {
  url: string;
  image: string;
  category_name: string;
}

function BentoDisplay() {
  const [sites, setSites] = useState<Site[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/sitesbycategories/allcategories")
      .then((response) => response.json())
      .then((data) => setSites(data))
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
              {categorySites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="image-container"
                >
                  <img
                    src={`http://localhost:3000/assets/${site.image}`}
                    alt={site.url}
                    className="site-logo"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="modal-container">
          <button type="button" onClick={() => setIsModalOpen(true)}>
            Ajouter une Catégorie
          </button>
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
