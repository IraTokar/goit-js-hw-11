import axios from 'axios';

export { fetchImages };

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '43940566-be61c32425694de8ee5c8e1ee';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
});

async function fetchImages(query, page) {
    const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${query}&${searchParams}&page=${page}`
    );
    return response;
}


