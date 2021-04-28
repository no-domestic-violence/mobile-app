/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React, { useContext, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ErrorMessageText } from 'components/error-message-text';
import EmergencySVG from '_assets/svg/emergency.svg';
import { StyledView } from 'styles/shared/StyledView';
import { SosContext } from 'state';
import { SosForm, SosSchema } from 'components/sos-form';
import { styles } from './CreateContact.styles';

const CreateContact = ({ navigation: { goBack }, route }) => {
  const {
    state,
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
  const foundContact = state.contacts.find((item) => item._id === id);

  useEffect(() => {
    if (!isAddMode) {
      setValue('name', foundContact.name);
      setValue('phone', foundContact.phone);
      setValue('message', foundContact.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddMode]);

  const handleAddContact = async () => {
    const data = getValues();
    await addContact(data);
    // need this step since mongodb generates the _id
    await getContacts();
    goBack();
  };

  const handleEditContact = async () => {
    const data = getValues();
    // insert the contact id into form values object
    data._id = id;
    await editContact({ data, id });
    goBack();
  };

  const handleDeleteContact = async () => {
    await deleteContact({ id });
    goBack();
  };

  function onSubmit() {
    return isAddMode ? handleAddContact() : handleEditContact();
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
                handleDeleteContact(foundContact._id);
              }}
              onSubmit={handleSubmit(onSubmit)}
              goBack={goBack}
            />
          </FormProvider>
          <ErrorMessageText errorMessage={state.errorMessage} />
        </StyledView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateContact;
