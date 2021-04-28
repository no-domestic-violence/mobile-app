/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React, { useContext, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardAvoidingView, Platform } from 'react-native';
import EmergencySVG from '_assets/svg/emergency.svg';
import { StyledView } from 'styles/shared/StyledView';
import { SosContext } from 'state';
import { SosForm, SosSchema } from 'components/sos-form';
import { styles } from './CreateContact.styles';

const CreateContact = ({ navigation, route }) => {
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

  const handleRemove = async (id) => {
    await deleteContact({ id });
    goBack();
  };

  function onSubmit() {
    return isAddMode ? saveContact() : saveEdit();
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <StyledView style={styles.homeView}>
          <EmergencySVG style={styles.svg} />
          <FormProvider {...methods}>
            <SosForm
              isAddMode={isAddMode}
              onRemove={() => {
                handleRemove(foundContact._id);
              }}
              onSubmit={handleSubmit(onSubmit)}
              goBack={goBack}
            />
          </FormProvider>
        </StyledView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateContact;
