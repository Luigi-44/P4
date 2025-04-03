import { connectionBDD } from "../database/configBDD";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const getCategories = (callback: Function) => {
  connectionBDD.query("SELECT * FROM categories", (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results);
  });
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const addCategory = (category: any, callback: Function) => {
  connectionBDD.query(
    "INSERT INTO categories SET ?",
    category,
    (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results);
    }
  );
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const deleteCategory = (categoryId: number, callback: Function) => {
  connectionBDD.query(
    "DELETE FROM categories WHERE id = ?",
    [categoryId],
    (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results);
    }
  );
};

export const updateCategory = (
  categoryId: number,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  category: any,
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  callback: Function
) => {
  connectionBDD.query(
    "UPDATE categories SET ? WHERE id = ?",
    [category, categoryId],
    (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results);
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
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const addNewCategory = (category: NewCategory, callback: Function) => {
  const query = "INSERT INTO Categories (name) VALUES (?)";

  connectionBDD.query(query, [category.name], (err, categoryResult) => {
    if (err) return callback(err, null);
    return callback(null, categoryResult);
  });
};

// 2. Ajouter un nouveau site
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const addNewSite = (site: NewSite, callback: Function) => {
  const query = "INSERT INTO SitesFav (url, image) VALUES (?, ?)";

  connectionBDD.query(query, [site.url, site.image], (err, siteResult) => {
    if (err) return callback(err, null);
    return callback(null, siteResult);
  });
};

// 3. Lier le site à la catégorie
export const linkSiteToCategory = (
  siteId: number,
  categoryId: number,
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  callback: Function
) => {
  const query =
    "INSERT INTO SitesFav_Categories (site_id, category_id) VALUES (?, ?)";

  connectionBDD.query(query, [siteId, categoryId], (err, result) => {
    if (err) return callback(err, null);
    return callback(null, result);
  });
};

// 4. Fonction combinée pour faire tout en une fois
export const addCategoryWithSite = (
  category: NewCategory,
  site: NewSite,
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  callback: Function
) => {
  // 1. Ajouter la catégorie
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  addNewCategory(category, (categoryErr: any, categoryResult: any) => {
    if (categoryErr) return callback(categoryErr, null);

    const categoryId = categoryResult.insertId;

    // 2. Ajouter le site
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    addNewSite(site, (siteErr: any, siteResult: any) => {
      if (siteErr) return callback(siteErr, null);

      const siteId = siteResult.insertId;

      // 3. Lier les deux
      linkSiteToCategory(
        siteId,
        categoryId,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (linkErr: any, linkResult: any) => {
          if (linkErr) return callback(linkErr, null);

          // Retourner toutes les informations
          return callback(null, {
            category: { id: categoryId, ...category },
            site: { id: siteId, ...site },
            link: linkResult,
          });
        }
      );
    });
  });
};
