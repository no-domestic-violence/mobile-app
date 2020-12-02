import React from 'react';
import { render } from '@testing-library/react-native';

import VideoList from './index'

jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: ''
}))

describe('Testing', () => {
    it('should match snapshot', () => {
      const result = render(
        <VideoList />
      ).toJSON();
      expect(result).toMatchSnapshot();
    });
  });