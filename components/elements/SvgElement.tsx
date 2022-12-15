import React, { FC, ReactSVGElement, SVGProps } from 'react';

import Logo from '../../public/images/logos/svg/cbnl-logo.svg';
import Leaf from '../../public/images/icons/site/svg/leaf_icon.svg';

type SvgElementProps = SVGProps<SVGSVGElement> & {
  preset?: 'leaf' | 'logo' | true | undefined;
  color?: string | undefined;
  size?: string | undefined;
};

interface SvgComponentProps {
  svg?: SvgElementProps;
  SVG?: ReactSVGElement;
  classes?: string | undefined;
}

const SvgElement: FC<SvgComponentProps> = (props: any): JSX.Element => {
  // Either import an SVG and pass it to 'SVG' or choose an 'element' from the list
  const { svg } = props;
  const SVG = svg.SVG;

  // Preset SVG Elements
  const LogoSVG = () => <Logo {...svg} />
  const LeafSVG = () => <Leaf  {...svg} />
  const Element = () => props.element === 'logo'
      ? <LogoSVG />
    : props.preset === 'leaf' || props.preset === true
      ? <LeafSVG /> : undefined;
  
  // Imported SVG Element
  return Element !== undefined ? <Element {...svg} /> : <SVG {...svg} />
};

export default SvgElement;