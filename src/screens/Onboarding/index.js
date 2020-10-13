import React from 'react';
import {AsyncStorage, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useTranslation } from 'react-i18next';


export default function OnboardingScreen ({navigation}) {
  const {t, i18n} = useTranslation();
  return (
    <Onboarding
      onSkip={() => navigation.navigate('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        
        {
          backgroundColor: '#fe6e58',
          image: <Image source={require('assets/images/square.png')} />,
          title:  t('OnboardingScreen.privacy-title'),
          subtitle: t('OnboardingScreen.privacy-subtitle'),
        },
        {
          backgroundColor: '#999',
          image: <Image source={require('assets/images/toxic-screen.png')} />,
          title: t('OnboardingScreen.question-title'),
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
    />)
}

  