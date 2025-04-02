import { connectionBDD } from "../database/configBDD";

// Type pour les résultats
interface SiteByCategory {
  url: string;
  image: string;
  category_name: string;
}

export const getDivertissement = (
  callback: (error: Error | null, results: SiteByCategory[] | null) => void
) => {
  const query = `
    SELECT s.url, s.image, c.name AS category_name
    FROM SitesFav s
    JOIN SitesFav_Categories sc ON s.id = sc.site_id
    JOIN Categories c ON sc.category_id = c.id
    WHERE c.name = 'divertissement'
  `;

  connectionBDD.query(query, (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des sites de divertissement:",
        err
      );
      return callback(err, null);
    }
    return callback(null, results as SiteByCategory[]);
  });
};
