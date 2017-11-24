# Inferno redux saga boilerplate

## Introduction

> Starter pack with inferno + redux + saga + inferno-router. You can use JSX, generators and decorators as well. Css and Sass modules included. Includes Standard style lint and Hot Reloading.

## Main render function

```javascript
Inferno.render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('root')
)
```

## Installation

> Run the following command in the root directory to install dependencies
```bash
yarn
```
> Then run the start script
```bash
yarn start
```
