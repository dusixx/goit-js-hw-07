import { galleryItems } from "./gallery-items.js";

createGallery(".gallery", galleryItems)?.addEventListener("click", e => {
  if (e.target.nodeName !== "IMG") return;
  e.preventDefault();

  const modal = createModal(e);
  if (!modal) return;

  const onEscapeDown = ({ code }) => {
    if (code !== "Escape") return;
    document.removeEventListener("keydown", onEscapeDown);
    modal.close();
  };

  document.addEventListener("keydown", onEscapeDown);
  modal.show();
});

function createModal({ target: { dataset } }) {
  return basicLightbox.create(`<img src="${dataset.source}">`);
}

function createGallery(classSelector, items) {
  const galleryRef = document.querySelector(classSelector);
  if (!galleryRef) return null;

  const className = classSelector.slice(1);

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
