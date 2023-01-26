import { galleryItems } from "./gallery-items.js";

const GALLERY_CLASS = "gallery";

// создаем галлерею
const galleryRef = createGallery(galleryItems, GALLERY_CLASS);
galleryRef.addEventListener("click", onGalleryClick);

///////////////////////
// functions
///////////////////////

/**
 * Вызывается при клике на родительский контейнер галлереи
 */
function onGalleryClick(e) {
  e.preventDefault();

  // ловим клик только на изображении
  if (!isGalleryImage(e)) return;

  const modal = getImageModalInstance(e);
  modal?.show();

  window.addEventListener("keydown", onModalEscDown);

  // создаем тут, чтобы иметь доступ к modal
  function onModalEscDown(e) {
    if (e.code !== "Escape") return;

    modal?.close();
    window.removeEventListener("keydown", onModalEscDown);
  }
}

/**
 * Создает инстанс модалки для изображения галлереи
 */
function getImageModalInstance({ target }) {
  return basicLightbox.create(`<img src="${target.dataset.source}">`);
}

/**
 * Проверяет, является ли целью события изображение галлереи
 */
function isGalleryImage({ target }) {
  return target.classList.contains(`${GALLERY_CLASS}__image`);
}

/**
 * Создает разметку галлереи на основе массива items
 * и вставляет ее в элемент с классом galleryClass
 */
function createGallery(items, galleryClass) {
  const galleryRef = document.querySelector(`.${galleryClass}`);

  if (!galleryRef) return null;

  // создаем разметку
  const markup = items
    .map(
      ({ preview, original, description }) =>
        `<div class="${galleryClass}__item">
            <a class="${galleryClass}__link" href="${original}">
                <img
                class="${galleryClass}__image"
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
