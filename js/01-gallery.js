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

  const modal = createImageModal(e);
  if (!modal) return;

  // ставим обработчик нажатия на Esc
  window.addEventListener("keydown", onModalEscDown);

  // создаем тут, чтобы иметь доступ к modal
  function onModalEscDown(e) {
    if (e.code !== "Escape") return;

    // закрываем модалку
    modal.close();
    // снимаем обработчик
    window.removeEventListener("keydown", onModalEscDown);
  }
}

/**
 * Создает инстанс модалки для изображения галлереи
 * Возвращает ссылку на инстанс
 */
function createImageModal({ target }, showModal = true) {
  if (target.classList.contains(`${GALLERY_CLASS}__image`)) {
    const modal = basicLightbox.create(`<img src="${target.dataset.source}">`);
    if (showModal) modal?.show();

    return modal;
  }
}

/**
 * Создает разметку галлереи на основе массива items
 * и вставляет ее в элемент с классом galleryClass
 * Возвращает ссылку на контейнер
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
  // можно через galleryRef.innerHTML = markup;
  galleryRef.insertAdjacentHTML("beforeend", markup);

  return galleryRef;
}
