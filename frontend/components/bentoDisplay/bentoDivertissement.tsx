import { useEffect, useState } from "react";
import "./bentoDivertissement.css";

interface Site {
  url: string;
  image: string;
  category_name: string;
}

function BentoDisplay() {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/sitesbycategories/divertissement"
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
    <section id="bentoDisplay">
      <div id="titreDisplay">
        <h2>Divertissement</h2>
      </div>
      {sites.map((site: Site) => (
        <div key={site.url}>
          <div id="bentoDisplay-content">
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              {site.image ? (
                <img src={site.image} alt={site.url} />
              ) : (
                <p>{site.url}</p>
              )}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

export default BentoDisplay;
