import { galleryItems } from "./gallery-items.js";

createGallery(galleryItems, "gallery")?.addEventListener("click", e => {
  if (e.target.nodeName !== "IMG") return;
  e.preventDefault();

  basicLightbox
    .create(`<img src="${e.target.dataset.source}">`, {
      onShow: mdl =>
        document.addEventListener("keydown", e => e.code === "Escape" && mdl.close(), {
          once: true,
        }),
    })
    .show();
});

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
