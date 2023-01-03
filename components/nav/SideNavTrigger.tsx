import { FC } from 'react';
import styles from './styles/sidenav.module.css';

interface Props {
  openSideNav: () => any
}

const SideNavTrigger: FC<Props> = ({ openSideNav }) => {
  return (<>
    <div className={styles.trigger}>
      <div className={styles.container}>
        <button onClick={openSideNav}>&#9776;</button>
      </div>
    </div>
  </>)
}

export default SideNavTrigger;