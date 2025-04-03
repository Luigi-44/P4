import { useEffect, useState } from "react";
import settingIcon from "../../assets/icon/settingIcon.png";
import "./categories.css";
interface Category {
  id: number;
  name: string;
  // Ajoutez d'autres propriétés selon votre structure de données
}

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/api/categories");
      const data = await response.json();
      setCategories(data);
    };
    getData();
  }, []);
  return (
    <div id="categories">
      {categories.map((category) => (
        <div key={category.id} className="ligneStyle">
          <div className="ligneStyle-left">
            <p>{category.name}</p>
          </div>
          <div className="ligneStyle-right">
            <img src={settingIcon} alt="setting" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;
