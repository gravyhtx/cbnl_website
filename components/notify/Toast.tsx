import { initScriptLoader } from "next/script";
import { ReactNode } from "react";
//https://webventures.rejh.nl/blog/2022/getcomputedstyle-element-opacity/

export const createToast = (
  message: string,
) => {
  // Create the element *with initial values* 
  // and add it to the DOM
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.querySelector('.toast-container').append(toast);

  // Wait for paint so the browser notices 
  // the element and its `transform` value
  requestAnimationFrame( () => {
    // Wait for the *next paint* so it notices 
    // the change of `transform`
    requestAnimationFrame( () => {
      toast.classList.add('show');
    })
  })
}


// function showToast(message: string, { delay = 5000 } = {}) {
//   const parent = self.toast.parentNode;
//   const tpl = self.toast.content.firstElementChild;
//   self.toast.remove();
// 	let options = { message };
// 	let toast = tpl.cloneNode(true);
//   for (let node of toast.querySelectorAll('[tpl]')) {
//   	node.textContent = options[node.getAttribute('tpl')];
//   }
//   const oldHeight = parent.offsetHeight;
//   parent.appendChild(toast);
//   const newHeight = parent.offsetHeight;
//   const height = newHeight - oldHeight;
//   parent.height = newHeight;
//   parent.animate({ transform: `translateY(-${newHeight}px)` }, { duration: 250, fill: 'forwards' });
//   setTimeout(async () => {
//   	await toast.animate({ transform: 'translateY(50%)', opacity: 0 }, { duration: 500, fill: 'forwards' }).finished;
//     toast.remove();
//     const newHeight = parent.height - height;
//     parent.height = newHeight;
//     parent.animate({ transform: `translateY(-${newHeight}px)` }, { duration: 0, fill: 'forwards' });
//   }, delay);
// }

export const Toast = (message: string) => <output role="status" className="toast">{message}</output>

export const ToastContainer = () => <section className="toast-container"></section>