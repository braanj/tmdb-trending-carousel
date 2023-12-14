/**
 * The tmdb object for fetching and rendering trending movies/tv shows using the TMDb API.
 * @namespace
 * @property {object} request - Configuration for API requests.
 * @property {string} request.baseUrl - Base URL for TMDb API requests.
 * @property {string} request.apiKey - TMDb API key.
 * @property {object} dom - Configuration for the DOM elements.
 * @property {string} dom.targetId - HTML element ID where the carousel will be rendered.
 * @property {HTMLElement} dom.targetElm - Reference to the target HTML element.
 * @property {Array} data - Array to store fetched movie/tv show data.
 * @property {Function} setOptions - Method to set options for the tmdb object.
 * @property {Function} fetch - Async method to fetch trending movies/tv shows from TMDb API.
 * @property {Function} render - Async method to render the movie/tv show carousel.
 * @property {Function} setUp - Async method to set up necessary configurations.
 * @property {Function} template - Method to generate the HTML template for a movie/tv show.
 * @property {Function} carousel - Method to generate the HTML template for the entire movies/tv shows carousel.
 * @property {Function} style - Method to add custom styles to the head of the document.
 * @property {Function} swiper - Method to dynamically load Swiper library.
 * @property {Function} initSwiper - Method to initialize the Swiper carousel.
 */

const tmdb = {
  request: {
    baseUrl: 'https://api.themoviedb.org/3/trending/',
    apiKey: '',
  },

  dom: {
    targetId: 'tmdb',
    targetElm: '',
  },

  data: [],

  /**
   * Set options for the tmdb object.
   * @function
   * @param {object} options - Options for the tmdb object.
   * @param {string} options.apiKey - TMDb API key.
   * @param {string} options.endpoint - API endpoint.
   * @param {string} options.targetId - HTML element ID where the carousel will be rendered.
   */
  setOptions: function (options) {
    if (options.apiKey) this.request.apiKey = options.apiKey;
    if (options.endpoint) this.request.endpoint = options.endpoint;
    if (options.targetId) this.dom.targetId = options.targetId;

    this.render();
  },

  /**
   * Fetch trending from the TMDb API.
   * @function
   */
  fetch: async function () {
    const self = this;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${self.request.apiKey}`,
      },
    };

    const url = `${this.request.baseUrl}${this.request.endpoint}/day?language=en-US`;
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      self.data.push(...data.results);
    }
  },

  /**
   * Render the movie/tv show carousel on the HTML page.
   * @function
   */
  render: async function () {
    this.swiper();

    await this.setUp();
    this.style();

    let carouselElements = '';
    this.data.map((item) => {
      carouselElements += this.template(item);
    });

    this.dom.targetElm.innerHTML += this.carousel(carouselElements);

    this.initSwiper();
  },

  /**
   * Set up necessary configurations for the tmdb object.
   * @function
   */
  setUp: async function () {
    if (!this.request.apiKey) {
      throw new Error('An api key must be set!');
    }
    await this.fetch();
    if (this.dom.targetId) {
      this.dom.targetElm = document.querySelector(`#${this.dom.targetId}`);
    }
  },

  /**
   * Generate HTML template for a movie/tv show.
   * @function
   * @param {object} movie - Movie object containing details.
   * @returns {string} - HTML template for the movie/tv show.
   */
  template: function (movie) {
    const temp = `
      <div class="swiper-slide">
        <div class="movie-container">
            <div class="movie-poster">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster" title="${movie.title}">
            </div>
        </div>
      </div>
    `;

    return temp;
  },

  /**
   * Generate HTML template for the entire movie/tv show carousel.
   * @function
   * @param {string} elements - HTML elements for each movie/tv shows.
   * @returns {string} - HTML template for the movie/tv show carousel.
   */
  carousel: function (elements) {
    const template = `
      <div class="swiper">
        <div class="swiper-wrapper">
        ${elements}
        </div>
      </div>
    `;

    return template;
  },

  /**
   * Add custom styles to the head of the document.
   * @function
   */
  style: function () {
    const style = `
    .swiper {
      width: 100%;
      padding-top: 50px;
      padding-bottom: 50px;
    }
    
    .swiper-slide {
      background-position: center;
      background-size: cover;
      max-width: 250px;
      height: auto;
    }

    .movie-container {
      padding: .25rem;
      border: 1px solid #000;
      border-radius: 5px;
      background-color: #fff;
    }

    .movie-container .movie-info p {
      margin: 0;
      margin-bottom: 10px;
    }

    .movie-container .movie-poster img {
      width: 100%;
      height: auto;
      border-radius: 5px;
    }
    
    `;

    var styleElm = document.createElement('style');
    styleElm.appendChild(document.createTextNode(style));
    document.head.appendChild(styleElm);
  },

  /**
   * Dynamically load the Swiper library.
   * @function
   */
  swiper: function () {
    const linkElm = document.createElement('link');
    linkElm.rel = 'stylesheet';
    linkElm.href =
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';

    const scriptElm = document.createElement('script');
    scriptElm.src =
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';

    document.head.appendChild(linkElm);
    document.head.appendChild(scriptElm);
  },

  /**
   * Initialize the Swiper carousel.
   * @function
   */
  initSwiper: function () {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 'auto',
      centeredSlides: false,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      spaceBetween: 30,
    });
  },
};
