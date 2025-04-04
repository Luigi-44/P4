import { connectionBDD } from "../database/configBDD";

export const getCategories = (
  callback: (error: Error | null, results?: never) => void
) => {
  connectionBDD.query("SELECT * FROM categories", (err, results) => {
    if (err) return callback(err);
    return callback(null, results as never);
  });
};

export const addCategory = (
  category: NewCategory,
  callback: (error: Error | null, results?: never) => void
) => {
  connectionBDD.query(
    "INSERT INTO categories SET ?",
    category,
    (err, results) => {
      if (err) return callback(err);
      return callback(null, results as never);
    }
  );
};

export const deleteCategory = (
  categoryId: number,
  callback: (error: Error | null, results?: never) => void
) => {
  connectionBDD.query(
    "DELETE FROM categories WHERE id = ?",
    [categoryId],
    (err, results) => {
      if (err) return callback(err);
      return callback(null, results as never);
    }
  );
};

export const updateCategory = (
  categoryId: number,
  category: NewCategory,
  callback: (error: Error | null, results?: never) => void
) => {
  connectionBDD.query(
    "UPDATE categories SET ? WHERE id = ?",
    [category, categoryId],
    (err, results) => {
      if (err) return callback(err);
      return callback(null, results as never);
    }
  );
};

export default { getCategories, addCategory, deleteCategory, updateCategory };

interface NewCategory {
  name: string;
}

interface NewSite {
  url: string;
  image: string | null;
}

// 1. Ajouter une nouvelle catégorie
export const addNewCategory = (
  category: NewCategory,
  callback: (error: Error | null, results?: never) => void
) => {
  const query = "INSERT INTO Categories (name) VALUES (?)";

  connectionBDD.query(query, [category.name], (err, categoryResult) => {
    if (err) return callback(err);
    return callback(null, categoryResult as never);
  });
};

// 2. Ajouter un nouveau site
export const addNewSite = (
  site: NewSite,
  callback: (error: Error | null, results?: never) => void
) => {
  // Vérification de l'URL
  if (!site.url || typeof site.url !== "string" || site.url.trim() === "") {
    return callback(new Error("URL invalide"));
  }

  // Vérification et définition de l'image par défaut
  const imageValue =
    typeof site.image === "string" && site.image.trim() !== ""
      ? site.image
      : "default.png";

  const query = "INSERT INTO SitesFav (url, image) VALUES (?, ?)";

  // Log pour débugger
  console.log("URL:", site.url);
  console.log("Image:", imageValue);

  connectionBDD.query(query, [site.url, imageValue], (err, siteResult) => {
    if (err) {
      console.log("Erreur SQL:", err); // Log pour débugger
      return callback(err);
    }
    return callback(null, siteResult as never);
  });
};

// 3. Lier le site à la catégorie
export const linkSiteToCategory = (
  siteId: number,
  categoryId: number,
  callback: (error: Error | null, results?: never) => void
) => {
  const query =
    "INSERT INTO SitesFav_Categories (site_id, category_id) VALUES (?, ?)";
  connectionBDD.query(query, [siteId, categoryId], (err, result) => {
    if (err) return callback(err);
    return callback(null, result as never);
  });
};

// 4. Fonction combinée pour faire tout en une fois
export const addCategoryWithSite = (
  category: NewCategory,
  site: NewSite,
  callback: (error: Error | null, results?: never) => void
) => {
  // 1. Ajouter la catégorie
  addNewCategory(
    category,
    (
      categoryErr: Error | null,
      categoryResult: { insertId: number } | undefined
    ) => {
      if (categoryErr) return callback(categoryErr);

      if (!categoryResult) return callback(new Error("No category result"));

      const categoryId = categoryResult.insertId;

      // 2. Ajouter le site
      addNewSite(
        site,
        (
          siteErr: Error | null,
          siteResult: { insertId: number } | undefined
        ) => {
          if (siteErr) return callback(siteErr);

          if (!siteResult) return callback(new Error("No site result"));

          const siteId = siteResult.insertId;
          // 3. Lier les deux
          linkSiteToCategory(siteId, categoryId, (linkErr: Error | null) => {
            if (linkErr) return callback(linkErr);
            // Retourner toutes les informations
            return callback(null, undefined);
          });
        }
      );
    }
  );
};
