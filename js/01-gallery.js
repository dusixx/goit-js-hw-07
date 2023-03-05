import { galleryItems } from "./gallery-items.js";

createGallery(galleryItems, "gallery")?.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  if (e.target.nodeName !== "IMG") return;
  e.preventDefault();

  const modal = createModal(e, {
    onShow: () =>
      document.addEventListener("keydown", e => e.code === "Escape" && modal.close(), {
        once: true,
      }),
  });

  modal.show();
}

function createModal({ target: { dataset } }, opts) {
  return basicLightbox.create(`<img src="${dataset.source}">`, opts);
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
