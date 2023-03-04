import { galleryItems } from "./gallery-items.js";

createGallery(galleryItems, "gallery");

new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
});

function createGallery(items, className) {
  const galleryRef = document.querySelector(`.${className}`);
  if (!galleryRef) return null;

  galleryRef.insertAdjacentHTML(
    "beforeend",
    items
      .map(
        ({ preview, original, description }) =>
          `<li class="${className}__item" >
            <a href="${original}">
              <img class="${className}__image" 
                src="${preview}" alt="${description}"
              />
            </a>
          </li>`,
      )
      .join(""),
  );

  return galleryRef;
}
