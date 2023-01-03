import Link from "next/link";
import { useRouter } from "next/router";

import { navlinks } from "../../config/theme.config";

const TopNav = ({ links }) => {
  links = links ? links : navlinks;
  const location = useRouter().pathname;

  return (
    <div className={"top-nav disable-highlight row"+(location === '/' ? ' home': '')} role="navigation" aria-label="Site Navigation" id="top-nav">
      {links.map((item, index) =>
          <Link href={item.link} alt={item.alt} key={index}>
            <div className="col s3">
                <span alt= {item.name}
                  color="inherit"
                  className={"btn-floating navigation-link nav-"+item.name.toLowerCase()}
                >{item.ref ? <i className="material-icons nav-icon">{item.ref}</i> : item.alt}</span>
            </div>
          </Link>
      )}
    </div>
  );
  
}

export default TopNav;