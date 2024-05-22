import Notiflix from 'notiflix';
import { fetchImages } from './fetch-images'
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more')

let query = '';
let page = 1;
const perPage = 40;

let simpleLightBox;


form.addEventListener('submit', onSearchForm);
buttonLoadMore.addEventListener('click', onLoadMoreBtn);



function renderGallery(img) {
    const markup = img.map(img => {
        const { id, webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;
        return `<a class="gallery-link" href="${largeImageURL}">
        <div class="photo-card" id="${id}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${views}</span>
            </p>
            <p class="info-item">
              <b>Coments</b>
              <span>${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${downloads}</span>
            </p>
          </div>
        </div>
      </a>`
    }).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
};


function onSearchForm(evt) {
    evt.preventDefault(evt);
    window.scrollTo({ top: 0 });
    page = 1;
    query = evt.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    buttonLoadMore.classList.add('is-hidden');

    if (query === '') {
        Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
        return;
    };

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            if(data.totalHits === 0) {
                Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.',
                );
            }else {
                renderGallery(data.hits);
                simpleLightBox = new SimpleLightbox('.gallery a').refresh();
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            
        };

        if (data.totalHits > perPage) {
             buttonLoadMore.classList.remove('is-hidden');
        }
        })
        .catch(error => console.log(error))
        .finally(() => form.reset())
};

function onLoadMoreBtn() {
    page += 1;
    simpleLightBox.destroy();

    fetchImages(query, page, perPage)
        .then(({ data }) => {
            renderGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();

            const totalPages = Math.ceil(data.totalHits / perPage);

            if (page === totalPages) {
                buttonLoadMore.classList.add('is-hidden');
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            };
        })
        .catch(error =>console.log(error))

};





