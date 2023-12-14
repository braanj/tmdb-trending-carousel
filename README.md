# TMDb Movie Carousel

<img alt="TMDB movie carousel' cover" src="./cover.png">

## Overview

The TMDb Movie Carousel script is designed to fetch trending movies from the TMDb (The Movie Database) API and display them in a responsive carousel on an HTML page. The script utilizes the Swiper library for carousel functionality.

## Usage

To use this script, follow these steps:

1. Include the script file in your HTML document.
2. Set up the necessary configurations using the `setOptions` function.

## Configuration

### `setOptions(options: object)`

This function sets up the options for the TMDb object.

- `options` (object): An object containing the following properties:
  - `apiKey` (string): TMDb API key.
  - `endpoint` (string): API endpoint.
  - `targetId` (string): HTML element ID where the carousel will be rendered.

## Fetching Data

### `fetch()`

This function fetches trending movies from the TMDb API using the configured options.

## Rendering

### `render()`

This function renders the movie carousel on the specified HTML element. It sets up the Swiper library, fetches movie data, generates HTML templates, and initializes the carousel.

## HTML Templates

### `template(movie: object): string`

This function generates an HTML template for an individual movie based on the provided movie object.

- `movie` (object): Movie object containing details.

### `carousel(elements: string): string`

This function generates an HTML template for the entire movie carousel using the provided HTML elements for each movie.

- `elements` (string): HTML elements for each movie.

## Styling

### `style()`

This function adds custom styles to the head of the HTML document. It includes styles for the carousel, movie container, and other relevant elements.

## Swiper Library

### `swiper()`

This function dynamically loads the Swiper library by adding the required stylesheet and script tags to the head of the HTML document.

## Initialization

### `initSwiper()`

This function initializes the Swiper carousel with specified configurations.

## Dependencies

- [Swiper](https://swiperjs.com/): A modern touch slider.

## Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>TMDb Movie Carousel</title>
  </head>
  <body>
    <div id="tmdb"></div>
    <script src="tmdb-movie-carousel.js"></script>
    <script>
      tmdb.setOptions({
        apiKey: 'YOUR_TMDB_API_KEY',
        endpoint: 'movie', // movie or tv
        targetId: 'tmdb',
      });
    </script>
  </body>
</html>
```

Note: Replace 'YOUR_TMDB_API_KEY' with your actual TMDb API key.

## License

This script is provided under the MIT License. See the [LICENSE](LICENSE) file for details.
