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

  return (
    <section className="sectionBite">
      <section id="bentoDisplay">
        {sites.map((site: Site) => (
          <div key={site.urls} className="bentoDisplay-container">
            <div id="titreDisplay">
              <h2>{site.category_name}</h2>
            </div>
            <div id="bentoDisplay-content">
              <a href={site.images} target="_blank" rel="noopener noreferrer">
                {site.images ? (
                  <img src={site.images} alt={site.images} />
                ) : (
                  <p>{site.images}</p>
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
