/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {afterEach, it, jest} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

it('renders correctly', async () => {
  let tree: renderer.ReactTestRenderer | undefined;

  jest.useFakeTimers();

  await act(async () => {
    tree = renderer.create(<App />);
  });

  await act(async () => {
    jest.runOnlyPendingTimers();
    tree?.unmount();
  });
});
