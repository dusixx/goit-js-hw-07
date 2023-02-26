import { galleryItems } from "./gallery-items.js";

createGallery(galleryItems, "gallery")?.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  if (e.target.nodeName !== "IMG") return;
  e.preventDefault();

  const modal = createBLInstance(e);
  if (!modal) return;

  const onEscapeDown = ({ code }) => {
    if (code !== "Escape") return;
    document.removeEventListener("keydown", onEscapeDown);
    modal.close();
  };

  document.addEventListener("keydown", onEscapeDown);
  modal.show();
}

function createBLInstance({ target: { dataset } }) {
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
