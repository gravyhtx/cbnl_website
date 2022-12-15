import { useEffect } from "react";

export const scrollToEl = (el,t) => {
  let getEl;
  t = t ? t : 500;
  useEffect(() => {
    getEl = document.getElementById(el);
    if(getEl) {
      setTimeout(() => { getEl.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" }) }, t)
    }
  });
}

export const scrollToContainer = (active, id) => {
  if(active && id) {
    scrollToEl(id ? id : "content", 100)
  } else {
    scrollToEl(null)
  }
}