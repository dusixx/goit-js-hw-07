import { galleryItems } from "./gallery-items.js";

createGallery(galleryItems, "gallery")?.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  if (e.target.nodeName !== "IMG") return;
  e.preventDefault();

  const modal = getBasicLightboxInstance(e);
  if (!modal) return;

  const onEscapeDown = ({ code }) => {
    if (code === "Escape") {
      modal.close();
      window.removeEventListener("keydown", onEscapeDown);
    }
  };

  modal.show();
  window.addEventListener("keydown", onEscapeDown);
}

function getBasicLightboxInstance({ target: { dataset } }) {
  return basicLightbox.create(`<img src="${dataset.source}">`);
}

function createGallery(items, className) {
  const galleryRef = document.querySelector(`.${className}`);
  if (!galleryRef) return null;

  galleryRef.insertAdjacentHTML(
    "beforeend",
    items
      .map(
        ({ preview, original, description }) =>
          `<div class="${className}__item">
            <a class="${className}__link" href="${original}">
              <img class="${className}__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
            </a>
        </div>`,
      )
      .join(""),
  );

  return galleryRef;
}
