import React, { useState } from "react";
import { View, Text, Button } from 'react-native'
import { useTranslation } from 'react-i18next';
import i18n from '../../services/i18n'

export default function LanguageScreen({navigation}){
    const {t, i18n} = useTranslation();

    const [languageSelected, setLanguageSelect] = useState(false);

    const handleLanguageSelect = () => setLanguageSelect(true); 

    const changeToEn = () => {
        i18n.changeLanguage('en');
        handleLanguageSelect();
    }

    const changeToDe = () => {
        i18n.changeLanguage('de');
        handleLanguageSelect();
    }

    return(
        <View>
            <Text>{t('common.welcome')}</Text>
            <Text>{t('common.language')}</Text>
            <Button title="English" onPress={changeToEn}></Button>
            <Button title="German" onPress={changeToDe}></Button>
            {languageSelected && 
            <Button title="Next" onPress={() => navigation.navigate('Onboarding')}/>
             //TODO: Add popup when user doesn't select a Language and proceed
             //TODO: Change language of NEXT button when german is pressed 
            }
        </View>
    )
};

