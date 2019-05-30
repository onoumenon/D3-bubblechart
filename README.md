# Kontinentalist Bubble Chart Assignment

[![Netlify Status](https://api.netlify.com/api/v1/badges/58fbe6da-08eb-4b73-9967-af38673eebf2/deploy-status)](https://app.netlify.com/sites/ht-bubblechart/deploys)

## Development

To start local server

```
npm start
```

## Tests

To run tests

```
npm test
```

To run unit tests in watch mode

```
npm run test:watch
```

### Responsiveness

- On screen resize (eg: switching from vertical to horizontal view on mobile), svg of chart rerenders so that it fits the full screen width and height
- If screen size is small (eg: < 550px), labels and sorted bubble will be split vertically instead
- Size of bubbles is calculated based on screen width
- On touchscreens, touching away hides tooltip

### Reusability

- BubbleChartHelper takes in params to dynamically render different data and labels
- These can be further refined in the `selectors` object in labels.js
- React components are separated from D3 functions
