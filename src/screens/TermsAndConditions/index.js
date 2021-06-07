import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import SVG from '_assets/svg/language.svg';
import { StyledButton, StyledButtonText } from 'styles/shared/StyledButton';
import { StyledView } from 'styles/shared/StyledView';
import TermsAndConditionsText from 'components/termsAndConditions/text';
import { styles } from './TermsAndConditions.styles';

/* contentOffset : where the user has currently scrolled within the scrollview
  the part that you dont see. 
  layoutMeasurement : size of the layout
  contentSize : size of the text */

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default function TermsAndConditionsScreen({ navigation }) {
  const { t } = useTranslation();
  const [isRead, setRead] = useState(false);
  const handleRead = () => setRead(true);

  return (
    <StyledView style={{ justifyContent: 'center' }}>
      <SVG style={{ position: 'absolute' }} />
      <Text style={styles.title}>{t('TermsAndConditions.title')}</Text>
      <ScrollView
        testID='terms-conditions-scroll-view'
        scrollEventThrottle={16}
        style={styles.tcContainer}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handleRead();
          }
        }}>
        <TermsAndConditionsText />
      </ScrollView>
      <StyledButton
        testID='terms-conditions-button'
        disabled={!isRead}
        onPress={() => navigation.navigate('Onboarding')}
        style={!isRead ? styles.buttonDisabled : styles.button}>
        <StyledButtonText>{t('TermsAndConditions.button')}</StyledButtonText>
      </StyledButton>
    </StyledView>
  );
}
