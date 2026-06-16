declare module "react-simple-maps" {
  import { ReactNode, SVGProps, MouseEvent } from "react";

  export interface Geography {
    rsmKey: string;
    id: string | number;
    [key: string]: unknown;
  }

  export interface GeographiesChildrenProps {
    geographies: Geography[];
    outline: unknown;
    borders: unknown;
  }

  export interface GeographyStyle {
    outline?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    [key: string]: unknown;
  }

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: Geography;
    onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void;
    onClick?: (event: MouseEvent<SVGPathElement>) => void;
    style?: {
      default?: GeographyStyle;
      hover?: GeographyStyle;
      pressed?: GeographyStyle;
    };
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (props: GeographiesChildrenProps) => ReactNode;
    [key: string]: unknown;
  }

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      [key: string]: unknown;
    };
    style?: React.CSSProperties;
    [key: string]: unknown;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    [key: string]: unknown;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps & { children?: ReactNode }>;
  export const Marker: React.FC<{ coordinates: [number, number]; children?: ReactNode; [key: string]: unknown }>;
}
