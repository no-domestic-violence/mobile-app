import React from "react";
import { View, Text, Button } from 'react-native'



export default function LanguageScreen({onLanguageSelect}){

    return(
        <View>
            <Text>Select your language</Text>
            <Button title="English" onPress={onLanguageSelect}></Button>
            <Button title="German" onPress={onLanguageSelect}></Button>
        </View>
    )
};