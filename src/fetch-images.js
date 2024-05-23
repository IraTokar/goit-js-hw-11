import axios from 'axios';



export default class PicsApi {
  constructor() {
    this.query = '';
    this.page = 1;
  }

    async fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/'
    const API_KEY = '43940566-be61c32425694de8ee5c8e1ee';


    const response = await axios.get(`${BASE_URL}`,{
      params: {
        q: this.query,
        page: this.page,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        key: API_KEY,
      },
    })
        return response.data;
    }
    
     resetPage() {
    this.page = 1;
     }
    }
    


 


// const searchParams = new URLSearchParams({
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
//   per_page: 40,
// });

// async function fetchImages(query, page) {
//     const response = await axios.get(
//         `${BASE_URL}?key=${API_KEY}&q=${query}&${searchParams}&page=${page}`
//     );
//     return response;
// }




//  function onLoadMoreBtn() {
//     page += 1;
//     simpleLightBox.destroy();

//     fetchImages(query, page, perPage)
//         .then(({ data }) => {
//             renderGallery(data.hits);
//             simpleLightBox = new SimpleLightbox('.gallery a').refresh();

//             const totalPages = Math.ceil(data.totalHits / perPage);

//             if (page === totalPages) {
//                 buttonLoadMore.classList.add('is-hidden');
//                 Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//             };
//         })
//         .catch(error =>console.log(error))

// };

