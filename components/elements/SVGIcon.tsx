import { createElement, FC, ReactElement, ReactNode, ReactSVG, SVGProps } from 'react';
import mySVG from './my-svg.svg';



// Define the props interface for the SVG component
type Props = SVGProps<SVGSVGElement> & {
  SVG: ReactSVG;
  color: string;
}

// Create the SVG component
const SVGIcon: FC<SVGProps<SVGSVGElement>> = ({ color }) => {
  // const svgElement = createElement(SVG, { fill: color });
  // const SvgElement = () => SVG
  return <></>
  // return <SvgElement fill={color} />;
};

export default SVGIcon;