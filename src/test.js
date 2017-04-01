import React from 'react';
import render from './';

it('should be a function', () => {
  expect(typeof render).toBe('function');
});

it('should turn a component into a string', () => {
  const div = <div></div>;
  expect(render(div)).toBe('<div></div>');
});

it('should preserve supported attributes', () => {
  const div = <div width="100%"></div>;
  expect(render(div)).toBe('<div width="100%"></div>');
});

it('should preserve unsupported attributes', () => {
  const div = <div border="0"></div>;
  expect(render(div)).toBe('<div border="0"></div>');
});

it('should work with a single nested components', () => {
  const div = <section><div border="0"></div></section>;
  expect(render(div)).toBe('<section><div border="0"></div></section>');
});

it('should work with multiple nested components', () => {
  const div = <section><div border="0"></div><div border="0"></div></section>;
  expect(render(div)).toBe('<section><div border="0"></div><div border="0"></div></section>');
});

