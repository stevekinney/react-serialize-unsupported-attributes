import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const unsupportedAttributes = [
  'xmlns',
  'align',
  'valign',
  'bgcolor',
  'border',
];

const replaceUnsupportedAttributes = (component) => {
  const properties = Object.assign({}, component.props);

  if (Array.isArray(component.props.children)) {
    properties.children = properties.children.map(replaceUnsupportedAttributes);
  } else if (component.props.children) {
    properties.children = replaceUnsupportedAttributes(component.props.children);
  }

  for (let prop in properties) {
    if (unsupportedAttributes.includes(prop)) {
      properties[`data-unsupported-attr-${prop}`] = properties[prop];
      delete properties[prop];
    }
  }

  return <component.type { ...properties } />;
};

const render = (component) => {
  const markup = renderToStaticMarkup(replaceUnsupportedAttributes(component));
  return markup.replace(/data-unsupported-attr-/g, '');
};

export default render;
