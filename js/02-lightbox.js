import { galleryItems } from "./gallery-items.js";

const GALLERY_CLASS = "gallery";
createGallery(galleryItems, GALLERY_CLASS);

new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
});

///////////////////////
// Functions
///////////////////////

/**
 * Создает разметку галлереи на основе массива items
 * и вставляет ее в элемент с классом className
 */
function createGallery(items, className) {
  const galleryRef = document.querySelector(`.${className}`);

  if (!galleryRef) return null;

  // создаем разметку
  const markup = items
    .map(
      ({ preview, original, description }) =>
        `<a class="${className}__item" href="${original}">
            <img class="${className}__image" src="${preview}" alt="${description}" />
        </a>`,
    )
    .join("");

  // рендерим галлерею
  galleryRef.insertAdjacentHTML("beforeend", markup);

  return galleryRef;
}
