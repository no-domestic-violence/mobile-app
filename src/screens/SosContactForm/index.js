/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React, { useContext, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import EmergencySVG from '_assets/svg/emergency.svg';
import { StyledView } from 'styles/shared/StyledView';
import { SosContext } from 'state';
import { SosFormFields, SosSchema } from 'components/sos-form-fields';
import { styles } from './SosContactForm.styles';

export default function SosContactForm({ navigation, route }) {
  const {
    state: { contacts },
    deleteContact,
    addContact,
    editContact,
    getContacts,
  } = useContext(SosContext);

  const { handleSubmit, setValue, getValues, ...methods } = useForm({
    resolver: yupResolver(SosSchema),
  });

  const { id } = route.params;
  // if there is no id in route.params -> isAddMode
  const isAddMode = !id;
  const foundContact = contacts.find((item) => item._id === id);

  useEffect(() => {
    if (!isAddMode) {
      setValue('name', foundContact.name);
      setValue('phone', foundContact.phone);
      setValue('message', foundContact.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddMode]);

  const goBack = () => {
    navigation.navigate('SosContactHome');
  };

  const saveContact = async () => {
    const data = getValues();
    await addContact(data);
    // need this step since mongodb generates the _id
    await getContacts();
    goBack();
  };

  const saveEdit = async () => {
    const data = getValues();
    // insert the contact id into form values object
    data._id = id;
    await editContact({ data, id });
    goBack();
  };
  function onSubmit() {
    return isAddMode ? saveContact() : saveEdit();
  }

  const handleRemove = async () => {
    await deleteContact({ id });
    goBack();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <StyledView style={styles.homeView}>
          <EmergencySVG style={styles.svg} />
          <View style={styles.container}>
            <FontAwesomeIcon
              icon={faTimes}
              size={20}
              raised
              style={{ marginLeft: 'auto' }}
              onPress={goBack}
            />
            <FormProvider {...methods}>
              <SosFormFields />
            </FormProvider>
          </View>
          <View style={styles.buttonRow}>
            {!isAddMode && (
              <FontAwesomeIcon
                testId='contact-delete-button'
                icon={faTrash}
                size={30}
                onPress={() => {
                  handleRemove(foundContact._id);
                }}
              />
            )}
            <FontAwesomeIcon
              testID='contact-submit-button'
              icon={faCheck}
              size={30}
              raised
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </StyledView>
      </KeyboardAvoidingView>
    </>
  );
}
