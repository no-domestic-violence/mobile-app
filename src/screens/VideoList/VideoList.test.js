import React from 'react';
import { render } from '@testing-library/react-native';
import VideoList from './index';

export const mockDataVideos = [
  {
    image: 'background1',
    id: 1,
    title: '7 Early Signs of A Toxic Relationship',
    url: 'https://www.youtube.com/embed/HDNMvuQrcGk',
  },
  {
    image: 'background2',
    id: 2,
    title: 'Why domestic violence victims do not leave | Leslie Morgan Steiner',
    url: 'https://www.youtube.com/embed/V1yW5IsnSjo',
  },
  {
    image: 'background3',
    id: 3,
    title:
      'I broke my silence: My story of domestic violence | Emma Murphy | TEDxUniversityofNicosia',
    url: 'https://www.youtube.com/embed/frFEdN7aMh8',
  },
  {
    image: 'background4',
    id: 4,
    title: 'Dangerous Love (Domestic Abuse Documentary) | Real Stories',
    url: 'https://www.youtube.com/embed/0yIAY2tbnOE',
  },
  {
    image: 'background5',
    id: 5,
    title: 'The difference between healthy and unhealthy love | Katie Hood',
    url: 'https://www.youtube.com/embed/ON4iy8hq2hM',
  },
];

describe('Testing', () => {
  it('should match snapshot', () => {
    const result = render(<VideoList />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
