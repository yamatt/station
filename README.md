# Station

Station is a static site that presents live streams much a TV station based on a iCal file provided as a URL.

## Development

You can run this locally by building with webpack, putting all the files together in a public directory and hosting a static server there.

From the root of this repo:

```bash
npx webpack-cli
mkdir -p public
cp main/dist/main.js main/dist/main.js.map public
cp main/src/html/index.html public
cp main/src/css/main.css public
cp main/src/data/* public
```

### Testing JS changes

```bash
npx webpack-cli && cp dist/main.js* public/ && python3 -m http.server -d public/
```

Then opening your browser at the URL it displays

## License
AGPLv3
