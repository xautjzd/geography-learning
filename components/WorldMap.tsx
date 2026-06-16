"use client";

import { useState, useCallback, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { CountryData } from "@/lib/types";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO numeric → slug mapping for our 38 countries
const countryCodeMap: Record<string, string> = {
  "156": "china",
  "392": "japan",
  "356": "india",
  "818": "egypt",
  "643": "russia",
  "372": "ireland",
  "276": "germany",
  "250": "france",
  "724": "spain",
  "380": "italy",
  "528": "netherlands",
  "756": "switzerland",
  "300": "greece",
  "826": "uk",
  "036": "australia",
  "554": "new-zealand",
  "076": "brazil",
  "840": "usa",
  "484": "mexico",
  "124": "canada",
  "032": "argentina",
  "604": "peru",
  "152": "chile",
  "410": "south-korea",
  "360": "indonesia",
  "458": "malaysia",
  "764": "thailand",
  "608": "philippines",
  "496": "mongolia",
  "104": "myanmar",
  "704": "vietnam",
  "524": "nepal",
  "376": "israel",
  "364": "iran",
  "682": "saudi-arabia",
  "368": "iraq",
  "710": "south-africa",
  "231": "ethiopia",
  "180": "congo",
  "434": "libya",
};

interface WorldMapProps {
  countries: CountryData[];
  selectedSlug: string | null;
  onCountryClick: (country: CountryData) => void;
}

const WorldMap = memo(function WorldMap({
  countries,
  selectedSlug,
  onCountryClick,
}: WorldMapProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const slugSet = new Set(countries.map((c) => c.slug));
  const countryMap = Object.fromEntries(countries.map((c) => [c.slug, c]));

  const getCountryColor = useCallback(
    (slug: string | undefined) => {
      if (!slug || !slugSet.has(slug)) return "#1a2035";
      if (slug === selectedSlug) return "#c9a84c";
      if (slug === hoveredSlug) return "#2d6a8f";
      return countryMap[slug]?.hasContent ? "#1e4976" : "#1a3a5c";
    },
    [slugSet, selectedSlug, hoveredSlug, countryMap]
  );

  return (
    <div className="w-full h-full bg-[#0d1520]">
      <ComposableMap
        projection="geoNaturalEarth1"
        style={{ width: "100%", height: "100%" }}
        projectionConfig={{ scale: 165, center: [0, 15] }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isoNum = String(geo.id).padStart(3, "0");
                const slug = countryCodeMap[isoNum];
                const isAvailable = slug && slugSet.has(slug);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryColor(slug)}
                    stroke="#0d1520"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                    onClick={() => {
                      if (isAvailable && slug) {
                        onCountryClick(countryMap[slug]);
                      }
                    }}
                    onMouseEnter={() => {
                      if (isAvailable && slug) setHoveredSlug(slug);
                    }}
                    onMouseLeave={() => setHoveredSlug(null)}
                    className={isAvailable ? "cursor-pointer" : "cursor-default"}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});

export default WorldMap;
