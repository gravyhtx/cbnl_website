import { FC, useEffect } from 'react';
import { useRouter } from "next/router";

import styles from './styles/notify.module.css';

interface Props {
  text: string;
  link: string;
  ext: string;
  extLink: string;
}

const Notification: FC<Props> = ({ text, link, ext, extLink }): JSX.Element =>  {
  
  const router = useRouter();

  useEffect(() => {
    if(extLink){
      if(!document.getElementById('ext-link').matches(':hover')) {
        document.getElementById('notify').addEventListener('click', () => {
          if(link){ router.push(link) }
        });
      } else {
        document.getElementById('ext-link').addEventListener('click', () => {
          router.push(extLink);
        })
      }
    }
  });

  return (
    <div className={styles.wrapper} id="notify">
      <div className={styles.container}>
        {text}
        {ext ? <span className={styles.link} id="ext-link">{ext}</span> : <></>}
      </div>
    </div>
  )
}

export default Notification;