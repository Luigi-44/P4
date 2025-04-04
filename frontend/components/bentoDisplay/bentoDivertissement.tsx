import { useEffect, useState } from "react";
import addIcon from "../../assets/icon/addIcon.png";
import settingIcon from "../../assets/icon/settingIcon.png";
import AjoutCategories from "../ajoutCategories/ajoutCatego";
import "./bentoDivertissement.css";

interface Site {
  urls: string;
  images: string; // C'est une chaîne avec des images séparées par des virgules
  category_name: string;
}

function BentoDisplay() {
  const [sites, setSites] = useState<Site[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditLinksModalOpen, setIsEditLinksModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<Site | null>(null);
  const [newUrl, setNewUrl] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = () => {
    fetch("http://localhost:3000/api/sitesbycategories/allcategories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données reçues:", data);
        setSites(data);
      })
      .catch((error) => console.error("Erreur:", error));
  };

  // Grouper les sites par catégorie une seule fois
  const groupedSites = sites.reduce((acc, site) => {
    if (!acc[site.category_name]) {
      acc[site.category_name] = [];
    }
    acc[site.category_name].push(site);
    return acc;
  }, {} as Record<string, Site[]>);

  const handleEditLinksClick = (category: string) => {
    setSelectedCategory(category);
    setIsEditLinksModalOpen(true);
  };

  const handleEditLink = (site: Site) => {
    setEditingLink(site);
    setNewUrl(site.urls);
  };

  const handleSaveEdit = async () => {
    if (!editingLink || !selectedCategory) return;

    const formData = new FormData();
    formData.append("url", newUrl);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/sites/${editingLink.urls}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du lien");
      }

      // Rafraîchir les données
      fetchSites();
      setEditingLink(null);
      setNewUrl("");
      setNewImage(null);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour du lien");
    }
  };

  const handleDeleteLink = async (site: Site) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce lien ?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/sites/${site.urls}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du lien");
      }

      // Rafraîchir les données
      fetchSites();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression du lien");
    }
  };

  const handleAddLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCategory) return;

    const formData = new FormData(e.currentTarget);
    formData.append("categoryName", selectedCategory);

    try {
      const response = await fetch(
        "http://localhost:3000/api/categories/site",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du lien");
      }

      // Rafraîchir les données
      fetchSites();
      // Réinitialiser le formulaire
      e.currentTarget.reset();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout du lien");
    }
  };

  return (
    <section className="sectionBite">
      <section id="bentoDisplay">
        {Object.entries(groupedSites).map(([category, categorySites]) => (
          <div key={category} className="bentoDisplay-container">
            <div id="titreDisplay">
              <button
                type="button"
                className="icon-button"
                onClick={() => handleEditLinksClick(category)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleEditLinksClick(category);
                  }
                }}
              >
                <img src={settingIcon} alt="setting" className="iconSet" />
              </button>
              <h2>{category}</h2>
            </div>
            <div id="bentoDisplay-content">
              {categorySites.map((site) => {
                // Séparer la chaîne d'images en tableau
                const imageArray = site.images
                  ? site.images.split(",").map((img) => img.trim())
                  : [];

                return (
                  <a
                    key={site.urls}
                    href={site.urls}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-container"
                  >
                    {imageArray.map((image, index) => (
                      <img
                        key={`${site.urls}-${index}`}
                        src={`http://localhost:3000/assets/${image}`}
                        alt={site.urls}
                        className="site-logo"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          console.log(
                            "URL de l'image qui a échoué:",
                            `http://localhost:3000/assets/${image}`
                          );
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ))}
                  </a>
                );
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

        {/* Modale d'édition des liens */}
        {isEditLinksModalOpen && selectedCategory && (
          <div className="edit-links-modal-overlay">
            <div className="edit-links-modal">
              <h3>Gérer les liens de {selectedCategory}</h3>

              {/* Liste des liens existants */}
              <div className="links-list">
                {groupedSites[selectedCategory]?.map((site) => {
                  // Séparer les URLs si elles sont stockées comme une chaîne avec des virgules
                  const urls =
                    typeof site.urls === "string"
                      ? site.urls
                          .split(",")
                          .map((url) => url.trim())
                          .filter((url) => url)
                      : [site.urls];

                  return urls.map((url, index) => (
                    <div key={`${site.urls}-${index}`} className="link-item">
                      <span className="link-url">{url}</span>
                      <div className="link-actions">
                        <button
                          type="button"
                          className="edit-link-button"
                          onClick={() => handleEditLink({ ...site, urls: url })}
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          className="delete-link-button"
                          onClick={() =>
                            handleDeleteLink({ ...site, urls: url })
                          }
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ));
                })}
              </div>

              {/* Formulaire d'édition de lien */}
              {editingLink && (
                <div className="edit-link-form">
                  <h4>Modifier le lien</h4>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Nouvelle URL"
                  />
                  <input
                    type="file"
                    onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                    accept="image/*"
                  />
                  <div className="edit-link-form-buttons">
                    <button
                      type="button"
                      className="save-link-button"
                      onClick={handleSaveEdit}
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      className="cancel-link-button"
                      onClick={() => {
                        setEditingLink(null);
                        setNewUrl("");
                        setNewImage(null);
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              {/* Formulaire d'ajout de lien */}
              <form className="add-link-form" onSubmit={handleAddLink}>
                <h4>Ajouter un nouveau lien</h4>
                <input
                  type="url"
                  name="siteUrl"
                  placeholder="URL du site"
                  required
                />
                <input type="file" name="siteImage" accept="image/*" required />
                <button type="submit" className="add-link-button">
                  Ajouter le lien
                </button>
              </form>

              <div className="modal-footer">
                <button
                  type="button"
                  className="close-modal-button"
                  onClick={() => {
                    setIsEditLinksModalOpen(false);
                    setSelectedCategory(null);
                    setEditingLink(null);
                    setNewUrl("");
                    setNewImage(null);
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}

export default BentoDisplay;
