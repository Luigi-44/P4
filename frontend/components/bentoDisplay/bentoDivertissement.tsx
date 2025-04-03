import { useEffect, useState } from "react";
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

  const fetchSites = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/sitesbycategories/allcategories"
      );
      const data = await response.json();
      setSites(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchSites();
  }, []);

  const getFirstImage = (images: string) => {
    // Prend la première image si plusieurs sont séparées par des virgules
    return images.split(",")[0].trim();
  };

  return (
    <section className="sectionBite">
      <section id="bentoDisplay">
        {sites.map((site: Site) => (
          <div key={site.urls} className="bentoDisplay-container">
            <div id="titreDisplay">
              <h2>{site.category_name}</h2>
            </div>
            <div id="bentoDisplay-content">
              <a href={site.urls} target="_blank" rel="noopener noreferrer">
                {site.images && (
                  <img
                    src={`http://localhost:3000/assets/${getFirstImage(
                      site.images
                    )}`}
                    alt={site.urls}
                    className="site-logo"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      console.log("Erreur de chargement:", site.images);
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </a>
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
          onSuccess={fetchSites}
        />
      </section>
    </section>
  );
}

export default BentoDisplay;
