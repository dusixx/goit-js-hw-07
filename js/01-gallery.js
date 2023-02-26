import { galleryItems } from "./gallery-items.js";

createGallery(galleryItems, "gallery")?.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();

  if (!isImage(e)) return;
  const modal = getBasicLightboxInstance(e);

  modal?.show();
  window.addEventListener("keydown", onEscapeDown);

  function onEscapeDown({ code }) {
    if (code !== "Escape") return;
    modal?.close();
    window.removeEventListener("keydown", onEscapeDown);
  }
}

function getBasicLightboxInstance({ target: { dataset } }) {
  return basicLightbox.create(`<img src="${dataset.source}">`);
}

function isImage({ target: { nodeName } }) {
  return nodeName === "IMG";
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
