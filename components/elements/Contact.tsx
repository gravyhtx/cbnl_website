import React, { FC, Suspense, useEffect } from 'react';

import * as Unicons from '@iconscout/react-unicons';

interface Props {
  element: 'email' | 'phone' | undefined,
  isMobile?: boolean;
  useIcon?: boolean,
  classes?: string[],
}

const Contact: FC<Props> = ({ element, isMobile, useIcon, classes = [] }) => {

  isMobile = isMobile ? isMobile : false;

  const icon = [<Unicons.UilMobileAndroidAlt />, <Unicons.UilEnvelope />]
  const email = process.env.COMPANY_EMAIL ? process.env.COMPANY_EMAIL : undefined;
  const phone = process.env.COMPANY_PHONE ? process.env.COMPANY_PHONE : undefined;

  const ctc = {
    phone: [icon[0],phone],
    email: [icon[1],email]
  }

  if((element === 'email' && email === undefined) || (element === 'phone' && phone === undefined)) {
    return <></>;
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