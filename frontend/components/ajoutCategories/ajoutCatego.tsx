import { useState } from "react";
import "./ajoutCatego.css";

interface AjoutCategoriesProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Pour déclencher le rechargement des données
}

const AjoutCategories = ({
  isOpen,
  onClose,
  onSuccess,
}: AjoutCategoriesProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const categoryData = {
      categoryName: formData.get("categoryName") as string,
      siteUrl: formData.get("categoryUrl") as string,
      siteImage: formData.get("categoryImage") as string,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/categories/site",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }

      onSuccess(); // Déclencher le rechargement des données
      onClose(); // Fermer la modal
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Ajouter une nouvelle catégorie</h3>
          <button type="button" onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Nom de la catégorie</label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                placeholder="Entrez le nom de la catégorie"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryUrl">URL</label>
              <input
                type="url"
                id="categoryUrl"
                name="categoryUrl"
                placeholder="Entrez l'URL"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryImage">Choisir une image</label>
              <input
                type="file"
                id="categoryImage"
                name="categoryImage"
                accept="image/*"
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Ajout en cours..." : "Ajouter"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cancel-button"
                disabled={isLoading}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjoutCategories;
