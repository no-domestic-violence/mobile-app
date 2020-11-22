import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import SVG from '_assets/svg/language.svg';
import {
  StyledButton,
  StyledButtonText,
} from '../../styles/shared/StyledButton';
import { Window } from 'styles/index.js';
import { StyledView } from '../../styles/shared/StyledView';

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
        <View style={styles.textContainer}>
          <Text style={styles.tcP}>
            Placeholder terms and conditions. If you continue to browse and use
            this website, you are agreeing to comply with and be bound by the
            following terms and conditions of use, which together with our
            privacy policy govern [business name]’s relationship with you in
            relation to this website. If you disagree with any part of these
            terms and conditions, please do not use our website.
          </Text>
          <Text style={styles.tcP}>
            The term ‘[business name]’ or ‘us’ or ‘we’ refers to the owner of
            the website whose registered office is [address]. Our company
            registration number is [company registration number and place of
            registration]. The term ‘you’ refers to the user or viewer of our
            website.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} The content of the pages of this website is for your
            general information and use only. It is subject to change without
            notice.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} This website uses cookies to monitor browsing
            preferences. If you do allow cookies to be used, the following
            personal information may be stored by us for use by third parties:
            [insert list of information].
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} Neither we nor any third parties provide any warranty or
            guarantee as to the accuracy, timeliness, performance, completeness
            or suitability of the information and materials found or offered on
            this website for any particular purpose. You acknowledge that such
            information and materials may contain inaccuracies or errors and we
            expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} Your use of any information or materials on this website
            is entirely at your own risk, for which we shall not be liable. It
            shall be your own responsibility to ensure that any products,
            services or information available through this website meet your
            specific requirements.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} This website contains material which is owned by or
            licensed to us. This material includes, but is not limited to, the
            design, layout, look, appearance and graphics. Reproduction is
            prohibited other than in accordance with the copyright notice, which
            forms part of these terms and conditions.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} All trademarks reproduced in this website, which are not
            the property of, or licensed to the operator, are acknowledged on
            the website. Unauthorised use of this website may give rise to a
            claim for damages and/or be a criminal offence.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} From time to time, this website may also include links to
            other websites. These links are provided for your convenience to
            provide further information. They do not signify that we endorse the
            website(s). We have no responsibility for the content of the linked
            website(s).
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} Your use of this website and any dispute arising out of
            such use of the website is subject to the laws of England, Northern
            Ireland, Scotland and Wales.
          </Text>
          <Text style={styles.tcP}>
            The use of this website is subject to the following terms of use
          </Text>
        </View>
      </ScrollView>
      <StyledButton
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

  textContainer: {
    padding: 20,
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },

  button: {
    marginBottom: 40,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    marginBottom: 40,
  },
});
