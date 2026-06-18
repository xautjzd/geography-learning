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

// ISO numeric → slug mapping for all countries
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
  "792": "turkey",
  "586": "pakistan",
  "804": "ukraine",
  "566": "nigeria",
  "620": "portugal",
  "616": "poland",
  "504": "morocco",
  "702": "singapore",
  "408": "north-korea",
  "398": "kazakhstan",
  "004": "afghanistan",
  "404": "kenya",
  "170": "colombia",
  "752": "sweden",
  "578": "norway",
  "208": "denmark",
  "246": "finland",
  "352": "iceland",
  "040": "austria",
  // New 20 countries
  "158": "taiwan",
  "784": "uae",
  "050": "bangladesh",
  "056": "belgium",
  "862": "venezuela",
  "012": "algeria",
  "192": "cuba",
  "634": "qatar",
  "288": "ghana",
  "834": "tanzania",
  "024": "angola",
  "686": "senegal",
  "144": "sri-lanka",
  "860": "uzbekistan",
  "068": "bolivia",
  "112": "belarus",
  "203": "czech-republic",
  "642": "romania",
  "400": "jordan",
  "688": "serbia",
};

interface WorldMapProps {
  countries: CountryData[];
  selectedSlug: string | null;
  onCountryClick: (country: CountryData) => void;
  onDeselect?: () => void;
}

const WorldMap = memo(function WorldMap({
  countries,
  selectedSlug,
  onCountryClick,
  onDeselect,
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
    <div className="w-full h-full bg-[#0d1520]" onClick={onDeselect}>
      <ComposableMap
        projection="geoNaturalEarth1"
        style={{ width: "100%", height: "100%" }}
        projectionConfig={{ scale: 147 }}
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
                    onClick={(e) => {
                      if (isAvailable && slug) {
                        e.stopPropagation();
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
