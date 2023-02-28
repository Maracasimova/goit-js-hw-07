import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainer.addEventListener("click", onGalleryItemClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a
            class="gallery__link"
            href="${original}"
          >
            <img
              class="gallery__image"
              src="${preview}"
              alt="${description}"
              data-source="${original}"
            />
          </a>
        </div>
      `;
    })
    .join("");
}

function onGalleryItemClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  onEscKeyPress(event);
}

function onEscKeyPress(event) {
  const galleryItemOrig = event.target.dataset.source;
  const modal = basicLightbox.create(
    `<img src="${galleryItemOrig}" width="1024" height="600">`
  );
  modal.show();

  function onCloseModal(event) {
    if (event.code === "Escape") {
      onCloseModal();
      window.removeEventListener("keydown", onCloseModal);
    }
    window.removeEventListener("keydown", onCloseModal);
  }
}
