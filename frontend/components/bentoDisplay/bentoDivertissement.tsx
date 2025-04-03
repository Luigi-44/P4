import { useEffect, useState } from "react";
import "./bentoDivertissement.css";

interface Site {
  urls: string;
  images: string;
  category_name: string;
}

function BentoDisplay() {
  const [sites, setSites] = useState<Site[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/sitesbycategories/allcategories"
        );
        const data = await response.json();
        setSites(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
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
          <button type="button" onClick={toggleModal}>
            Ajouter une Catégorie
          </button>
        </div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Ajouter une nouvelle catégorie</h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="close-button"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="categoryName">Nom de la catégorie</label>
                    <input
                      type="text"
                      id="categoryName"
                      name="categoryName"
                      placeholder="Entrez le nom de la catégorie"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoryUrl">URL</label>
                    <input
                      type="url"
                      id="categoryUrl"
                      name="categoryUrl"
                      placeholder="Entrez l'URL"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoryImage">Image URL</label>
                    <input
                      type="url"
                      id="categoryImage"
                      name="categoryImage"
                      placeholder="Entrez l'URL de l'image"
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="submit-button">
                      Ajouter
                    </button>
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="cancel-button"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}

export default BentoDisplay;
