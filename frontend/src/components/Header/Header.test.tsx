/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header title="Default Starter" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
