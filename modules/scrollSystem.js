import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

// SCROLL TO POSITION //

export const scrollTo = (element, rootEl) => {

  if(rootEl) {
    element
      ? element.scrollIntoView({ behavior: "smooth", block: "start" })
      : rootEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  
  element ? element.scrollIntoView({ behavior: "smooth", block: "start" }) : null;
}

export const scrollToEl = (el,t) => {
  let getEl;
  t = t ? t : 500;
  useEffect(() => {
    getEl = el ? document.getElementById(el) : document.documentElement;
    if(getEl) {
      setTimeout(() => { getEl.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" }) }, t)
    }
  });
}

export const scrollToContainer = (active, id) => {
  if(active) {
    scrollToEl(id ? id : "content", 100)
  } else {
    scrollToEl(null)
  }
}

export const scrollToTop = (top) => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: top ? top : 0,
      behavior: "smooth"
    })
  });
}

export const ScrollToPosition = () => {

  const router = useRouter();
  const { pathname } = router.pathname;

  useEffect(() => {
    const queryId = window.location.hash ? window.location.hash.substring(1) : "";
    const rootEl = document.getElementById('layout');
    const scrollEl = document.getElementById(queryId);
    setTimeout(() => {
      scrollTo(scrollEl, rootEl)},500);
    }, [pathname]);
  return null;

}

export const ScrollToTop = ({ rootId }) => {

  const router = useRouter();
  const { pathname } = router.pathname;

  rootId = rootId ? rootId : 'layout';
  console.log(rootId)

  useEffect(() => {

    const rootEl = document.getElementById(rootId);

    const queryId = window.location.hash ? window.location.hash.substring(1) : null;
    const queryEl = document.getElementById(queryId);

    const scrollEl = (queryId && queryEl) ? queryEl : rootEl;

    scrollTo(scrollEl);

    setTimeout(() => {
      scrollTo(scrollEl);
    },500);

  }, [pathname]);
  return null;
}



export const handleScrollClasses = ( el, isRef, classes, position ) => {

  const scrollLimit = position ? position : 0.80;

  isRef = isRef === true ? true : false;
  
  useEffect(() => {
    const element = isRef && el ? el : !isRef && el ? document.getElementById(el) : null;
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (((document.documentElement.scrollTop / scrollTotal ) > scrollLimit) && element) {
      // Add classes
      element.classList.add(classes[0]);
    } 
    if (((document.documentElement.scrollTop / scrollTotal ) < scrollLimit) && element) {
      // Remove classes
      element.classList.remove(classes[1]);
    }
  })
}

export const BackToTop = () => {
  const scrollRef = useRef(null);
  const scrollEl = scrollRef.current;
  handleScrollClasses(scrollEl,true,["show-on","show-off"]);
  return (
    <div onClick={scrollToTop} ref={scrollRef} className="back-to-top disable-highlight show-off" id="back-to-top">
        BACK TO TOP
    </div>
  );
}