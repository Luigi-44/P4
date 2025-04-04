import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import settingIcon from "../../assets/icon/settingIcon.png";
import "./categories.css";

interface Category {
  id: number;
  name: string;
  // Ajoutez d'autres propriétés selon votre structure de données
}

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/api/categories");
    const data = await response.json();
    setCategories(data);
  };

  const handleEdit = async () => {
    if (!editingCategory) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/categories/${editingCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        }
      );

      if (response.ok) {
        fetchCategories(); // Recharger les catégories
        setIsEditing(false);
        setEditingCategory(null);
        setNewName("");
      }
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
    }
  };

  return (
    <div id="categories">
      {categories.map((category) => (
        <div key={category.id} className="ligneStyle">
          <div
            className="ligneStyle-left"
            onClick={() => navigate("/client")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate("/client");
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <p>{category.name}</p>
          </div>
          <div className="ligneStyle-right">
            <img
              src={settingIcon}
              alt="setting"
              className="setting-icon"
              onClick={() => {
                setIsEditing(true);
                setEditingCategory(category);
                setNewName(category.name);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsEditing(true);
                  setEditingCategory(category);
                  setNewName(category.name);
                }
              }}
              aria-label="Modifier la catégorie"
            />
          </div>
        </div>
      ))}

      {/* Modal d'édition */}
      {isEditing && editingCategory && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <h3>Modifier la catégorie</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nouveau nom"
            />
            <div className="modal-buttons">
              <button type="button" onClick={handleEdit}>
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingCategory(null);
                  setNewName("");
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
