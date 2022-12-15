import Link from "next/link";
import { ReactNode } from "react";

export const NxtLink = (
  children: ReactNode,
  url: any,
  classes?: string,
  id?: string,
  linkClasses?: string,
  linkAlt?: string,
  button?: boolean,
  buttonClasses?: string,
  btnName?: string,
  index?: string | number,
) => {

  let float = false;
  let nav = false;

  if(buttonClasses.includes('floating')) {
    float = true;
  }

  if(buttonClasses.includes('nav')) {
    nav = true;
  }

  const bClassName =
    buttonClasses
    + (float === true ? ' btn-floating' : ' ')
    + (nav === true ? ' navigation-link nav-item' : ' ')
    + (nav === true && index ? ' index-'+index : '')

  return (<>
    <Link href={url.toString()} className={linkClasses ? linkClasses : 'site-link'} aria-label={linkAlt?linkAlt:'Site Link'} id={id?id:null}>
      <div className={classes?classes:null}>
        { button
          ? <button name={btnName?btnName:'Click me...'}
              color="inherit"
              className={bClassName}
            >{children}
            </button>
          : <>{children}</>
        }
      </div>
    </Link>
    </>)
}