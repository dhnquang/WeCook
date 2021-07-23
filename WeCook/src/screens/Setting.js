import React from 'react';
import {View, Text} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {useTranslation} from 'react-i18next';

const options = [
  {label: 'English', value: 'en'},
  {label: 'Vietnamese', value: 'vie'},
];

export default function Setting() {
  const {i18n} = useTranslation();
  return (
    <View>
      <Text>Setting Screen</Text>
      <SwitchSelector
        options={options}
        hasPadding
        initial={0}
        onPress={language => {
          i18n.changeLanguage(language);
        }}
      />
    </View>
  );
}
