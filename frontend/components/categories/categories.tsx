import { useEffect, useState } from "react";
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
  console.log(categories);
  return (
    <div id="categories">
      {categories.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))}
    </div>
  );
}

export default Categories;
