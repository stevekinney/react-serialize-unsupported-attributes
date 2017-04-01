# Serialize Unsupported React Attributes

React [does not support a bunch of deprecated HTML attributes][attrs] that are still supported in the browser and are still widely used in HTML emails.

This list includes:

- `xmlns`
- `align`
- `valign`
- `bgcolor`
- `border`

If you pass one of these to a JSX component. It will just drop them when it goes to render. This can be a pain. If you put your mind to it. You can inject these elements into React. [Here is an example][inject] of what tha can look like. React will now include these properties when rendering to the DOM.

But guess what. If you want to any server-side rendering or just serialize your components to strings in the browser, ReactDOM will forget about these injected properties.

As a result, you end up with something like this:

```js
import { renderToStaticMarkup } from 'react-dom/server';

renderToStaticMarkup(<div width="100%" border="0"></div>); // returns '<div width="100%"></div>';
```

Bummer. We silently lost the `border` attribute.

But, if you use this wonderful library, everything is preserved.

```js
render(<div width="100%" border="0"></div>); // returns '<div width="100%" border="0"></div>';
```

## How does this work?

Well, we traverse down the component tree and rename every unsupport tag—prefixing it with `data-unsupported-attr-`. Data attributes are kept in tact. We then render it usering ReactDOM and strip out all of the prefixes and we're good to go.

[attrs]: https://facebook.github.io/react/docs/dom-elements.html
[inject]: https://github.com/chromakode/react-html-email/blob/master/src/injectReactEmailAttributes.js
