import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import SVG from '_assets/svg/language.svg';
import { StyledButton, StyledButtonText } from 'styles/shared/StyledButton';
import { Window } from 'styles/index';
import { StyledView } from 'styles/shared/StyledView';
import TermsAndConditionsText from 'components/termsAndConditions/text';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default function TermsAndConditionsScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [isRead, setRead] = useState(false);
  const handleRead = () => setRead(true);

  return (
    <StyledView style={{ justifyContent: 'center' }}>
      <SVG style={{ position: 'absolute' }} />
      <Text style={styles.title}>{t('TermsAndConditions.title')}</Text>
      <ScrollView
        style={styles.tcContainer}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handleRead();
          }
        }}>
        <TermsAndConditionsText />
      </ScrollView>
      <StyledButton
        testID="terms-conditions-button"
        disabled={!isRead}
        onPress={() => navigation.navigate('Onboarding')}
        style={!isRead ? styles.buttonDisabled : styles.button}>
        <StyledButtonText>{t('TermsAndConditions.button')}</StyledButtonText>
      </StyledButton>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    alignSelf: 'center',
    marginTop: 40,
  },
  tcContainer: {
    marginTop: 30,
    width: Window.width * 0.85,
    height: Window.height * 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.71)',
    borderRadius: 31,
  },

  button: {
    marginBottom: 40,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    marginBottom: 40,
  },
});
