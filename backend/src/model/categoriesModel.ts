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
