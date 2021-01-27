import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useTranslation } from 'react-i18next';
import { Colors } from 'styles/index';
import FirstSVG from 'assets/svg/onboarding/emergency.svg';
import SecondSVG from 'assets/svg/onboarding/map.svg';
import ThirdSVG from 'assets/svg/onboarding/resources.svg';
import FourthSVG from 'assets/svg/onboarding/questions.svg';
import { styles } from './Onboarding.styles';
export default function OnboardingScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  return (
    <Onboarding
      onSkip={() => navigation.navigate('Login')}
      onDone={() => navigation.navigate('Login')}
      titleStyles={styles.title}
      imageContainerStyles={styles.image}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: Colors.primary,
          image: <FirstSVG />,
          title: t('Onboarding.emergency-title'),
          subtitle: t('Onboarding.emergency-subtitle'),
        },
        {
          backgroundColor: Colors.primary,
          image: <SecondSVG />,
          title: t('Onboarding.map-title'),
          subtitle: t('Onboarding.map-subtitle'),
        },
        {
          backgroundColor: Colors.primary,
          image: <ThirdSVG />,
          title: t('Onboarding.resources-title'),
          subtitle: t('Onboarding.resources-subtitle'),
        },
        {
          backgroundColor: Colors.primary,
          image: <FourthSVG />,
          title: t('Onboarding.questions-title'),
          subtitle: t('Onboarding.questions-subtitle'),
        },
      ]}
    />
  );
}


