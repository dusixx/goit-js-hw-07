import { galleryItems } from "./gallery-items.js";

const GALLERY_CLASS = "gallery";

// создаем галлерею
const galleryRef = createGallery(galleryItems, GALLERY_CLASS);

// ставим обработчик на клик
galleryRef.addEventListener("click", onGalleryClick);

///////////////////////
// functions
///////////////////////

/**
 * Вызывается при клике на div.gallery
 */
function onGalleryClick(e) {
  e.preventDefault();

  // должно срабатывать только при клике на изображение
  if (!e.target.classList.contains(`${GALLERY_CLASS}__image`)) return;

  // создаем инстанс модалки
  const modal = basicLightbox.create(`<img src="${e.target.dataset.source}">`);

  // отображаем ее
  modal.show();

  // ставим обработчик нажатия на Esc
  window.addEventListener("keydown", onModalEscDown);

  // создаем тут, чтобы иметь доступ к инстансу
  function onModalEscDown(e) {
    if (e.code !== "Escape") return;

    // закрываем моддалку
    modal.close();

    // снимаем обработчик
    window.removeEventListener("keydown", onModalEscDown);
  }
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
