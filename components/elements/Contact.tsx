import React, { FC, Suspense, useEffect } from 'react';

import * as Unicons from '@iconscout/react-unicons';

import { useDevice } from '../../hooks/useDevice';

import website from '../../config/site-data.json';

interface Props {
  element: 'email' | 'phone' | undefined,
  useIcon?: boolean,
  classes?: string[],
}

const Contact: FC<Props> = ({ element, useIcon, classes = [] }) => {

  const isMobile = useDevice().isMobile;

  const icon = [<Unicons.UilMobileAndroidAlt />, <Unicons.UilEnvelope />]
  const email = process.env.COMPANY_EMAIL ? process.env.COMPANY_EMAIL : website.email ? website.email : undefined;
  const phone = process.env.COMPANY_PHONE ? process.env.COMPANY_PHONE : website.phone ? website.phone : undefined;

  const ctc = {
    phone: [icon[0],phone],
    email: [icon[1],email]
  }

  const loading = element === 'email' ? 'loading...' : element === 'phone' ? 'loading...' : 'loading...';

  const Element = ({ element }: { element: 'email' | 'phone' | string | undefined }) => {
    useEffect(() => {
      // fetch email or phone number data here
    }, [element]);

    const set = element === 'email' ? ctc.email : ctc.phone;

    const href = element === 'email' ? 'mailto:'+email+'?subject=Inquiry%20from%20Website' : 'tel:'+phone;
    
    return (
      <Suspense fallback={<div>{loading}</div>}>
        { element === "phone" && isMobile === true
          ? <a href={href} className="disable-highlight">
              { useIcon === true ? <span className={classes[1]?classes[1]:null}>{set[0]}</span> : <></> }
              <span className={classes[0]?classes[0]:null}>{ set[1] }</span>
            </a>
          : <>
              { useIcon === true
                ? <span className={(classes[1]?classes[1]+" ":"")+"disable-highlight"}>{set[0]}</span>
                : <></> }
              <span className={(classes[0]?classes[0]+" ":"")+"disable-highlight"}>{ set[1] }</span>
            </>}
      </Suspense>
    )
  }

  return <Element element={element} />

}

export default Contact;