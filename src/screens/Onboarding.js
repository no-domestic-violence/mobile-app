import React from 'react';
import {Image} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => (
  <Onboarding
    onDone={() => navigation.navigate('Home')}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('assets/images/circle.png')} />,
        title: 'Language',
        subtitle: 'Here is the languige picker',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={require('assets/images/square.png')} />,
        title: 'Terms of privacy',
        subtitle: 'Here is the terms of privacy',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('assets/images/toxic-screen.png')} />,
        title: 'Check your relationship with our questionary',
        subtitle:
          'Everyone deserves to be in a healthy relationship. Do you know if your relationship is healthy?',
      },
      {
        backgroundColor: '#020202',
        image: <Image source={require('assets/images/toxic-screen.png')} />,
        title: 'testtest',
        subtitle: 'testtest',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('assets/images/danger-screen.jpeg')} />,
        title: 'Do you feel in danger?',
        subtitle: 'Send SOS alerts to friends or family on sensing danger',
      },
    ]}
  />
);

export default OnboardingScreen;
