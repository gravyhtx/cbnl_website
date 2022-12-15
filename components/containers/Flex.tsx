import { FC, ReactNode } from 'react';

import styles from './styles/flex.module.css';

interface FlexProps {
  children: ReactNode,
  classes?: string,
}

interface FlexItem extends FlexProps {
  size?: '10%'|'20%'|'25%'|'33.33%'|'40%'|'50%'|'60%'|'67.67%'|'70%'|'75%'|'80%'|'90%'|'100%',
}

export const FlexWrapper: FC<FlexProps> = ({ children, classes }): JSX.Element => {
  const cls = classes ? ' '+classes : '';
  return (
    <div className={styles.wrapper+cls}>
      <FlexContainer>
        { children }
      </FlexContainer>
    </div>
  )
}

export const FlexContainer: FC<FlexProps> = ({ children, classes }): JSX.Element => {
  const cls = classes ? ' '+classes : '';
  return (
    <div className={styles.container+cls}>
      { children }
    </div>
  )
}

export const FlexItem: FC<FlexItem> = ({ children, classes, size }): JSX.Element => {
  const cls = classes ? ' '+classes : '';
  const flxSize = size ? { width: size } : null;
  return (
    <div className={styles.item+cls} style={flxSize}>
      { children }
    </div>
  )
}