import { galleryItems } from "./gallery-items.js";

const GALLERY_CLASS = "gallery";
const galleryRef = createGallery(galleryItems, GALLERY_CLASS);

galleryRef.addEventListener("click", onGalleryClick);

///////////////////////
// Functions
///////////////////////

/**
 * Вызывается при клике на родительский контейнер галлереи
 */
function onGalleryClick(e) {
  e.preventDefault();

  // ловим клик только на изображении
  if (!isGalleryImage(e)) return;

  const modal = createModalInstance(e);
  modal?.show();

  window.addEventListener("keydown", onModalEscDown);

  // создаем тут, чтобы иметь доступ к modal
  function onModalEscDown({ code }) {
    if (code !== "Escape") return;

    modal?.close();
    window.removeEventListener("keydown", onModalEscDown);
  }
}

/**
 * Создает инстанс модалки для изображения галлереи
 */
function createModalInstance({ target }) {
  return basicLightbox.create(`<img src="${target.dataset.source}">`);
}

/**
 * Проверяет, сделан ли клик на изображении галлереи
 */
function isGalleryImage({ target }) {
  return target.classList.contains(`${GALLERY_CLASS}__image`);
}

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
        `<div class="${className}__item">
            <a class="${className}__link" href="${original}">
                <img
                class="${className}__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>`,
    )
    .join("");

  // рендерим галлерею
  galleryRef.insertAdjacentHTML("beforeend", markup);

  return galleryRef;
}
