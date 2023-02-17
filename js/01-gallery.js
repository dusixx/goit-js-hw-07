import { galleryItems } from "./gallery-items.js";

createGallery(galleryItems, "gallery")?.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return;

  const modal = createModalInstance(e);
  modal?.show();

  window.addEventListener("keydown", onEscapeDown);
  // создаем тут, чтобы иметь доступ к modal
  function onEscapeDown({ code }) {
    if (code !== "Escape") return;

    modal?.close();
    window.removeEventListener("keydown", onEscapeDown);
  }
});

function createModalInstance({ target }) {
  return basicLightbox.create(`<img src="${target.dataset.source}">`);
}

function createGallery(items, className) {
  const galleryRef = document.querySelector(`.${className}`);

  if (!galleryRef) return null;

  const markup = items
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
    .join("");

  galleryRef.insertAdjacentHTML("beforeend", markup);

  return galleryRef;
}
