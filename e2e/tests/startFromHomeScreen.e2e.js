import { expect, device, element, by } from 'detox';

describe('Shows userflow starting from logged out, not first time launch', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        location: 'always',
      },
    });
    await device.reloadReactNative();
  });

  it('should have top tab navigation with labels', async () => {
    await expect(element(by.label('ARTICLE ARTICLE')).atIndex(0)).toBeVisible();
    await expect(element(by.label('VIDEO VIDEO')).atIndex(0)).toBeVisible();
    await expect(element(by.label('PODCAST PODCAST')).atIndex(0)).toBeVisible();
    await expect(element(by.label('HOME HOME')).atIndex(0)).toBeVisible();
  });
  it('should show different pages on tabs tap', async () => {
    await element(by.label('ARTICLE ARTICLE')).atIndex(0).tap();
    await element(by.label('VIDEO VIDEO')).atIndex(0).tap();
    await element(by.label('PODCAST PODCAST')).atIndex(0).tap();
    await element(by.label('HOME HOME')).atIndex(0).tap();
  });
  it('should show articles list and article page on tap', async () => {
    await element(by.label('ARTICLE ARTICLE')).atIndex(0).tap();
    await element(by.type('RCTImageView')).atIndex(1).tap();
    await expect(element(by.text('Add to favorites'))).toBeVisible();
    await expect(element(by.text('Back to Articles'))).toBeVisible();
    await element(by.text('Back to Articles')).tap();
  });

  it('should show videos list and video on tap', async () => {
    await element(by.label('VIDEO VIDEO')).atIndex(0).tap();
    await element(by.text('7 Early Signs of A Toxic Relationship')).tap();
  });
  it('should show hotlines screen', async () => {
    await element(by.label('Hotlines')).tap();
    await element(by.id('searchInput')).tap();
    await element(by.id('searchInput')).replaceText('berlin');
    await expect(element(by.text('berlin'))).toBeVisible();
    await element(by.label('MAP MAP')).atIndex(0).tap();
  });
  it('should successfully login user from user settings screen', async () => {
    await element(by.text('User Settings')).tap();
    await element(by.text('Log In')).tap();
    await expect(
      element(by.text('Do not have an account? Go to sign up'))
    ).toBeVisible();
    await expect(element(by.text('Proceed without login'))).toBeVisible();
    await expect(element(by.id('logIn'))).toBeVisible();
    await element(by.id('RNE__Input__text-input')).atIndex(0).tap();
    await element(by.id('RNE__Input__text-input'))
      .atIndex(0)
      .replaceText('test@test.com');
    await element(by.id('RNE__Input__text-input')).atIndex(1).tap();
    await element(by.id('RNE__Input__text-input'))
      .atIndex(1)
      .replaceText('password');
    await element(by.id('logIn')).tap();
    await expect(element(by.text('Emergency'))).toBeVisible();
  });
  it('should render two contact placeholders on emergency contact screen when there is no contact', async () => {
    await element(by.text('Emergency')).tap();
    await expect(
      element(by.text('Please add your trusted contact')).atIndex(0)
    ).toBeVisible();
    await expect(
      element(by.text('Please add your trusted contact')).atIndex(1)
    ).toBeVisible();
  });
  it('should display error messages when trying to submit empty contact form', async () => {
    await element(by.text('Please add your trusted contact')).atIndex(0).tap();
    await element(by.id('contact-submit-button')).tap();
    await expect(element(by.text('Please enter a name'))).toBeVisible();
    await expect(element(by.text('Phone number is not valid'))).toBeVisible();
    await expect(element(by.text('Please enter a message'))).toBeVisible();
  });
  it('should not render delete button when its add mode', async () => {
    await expect(element(by.id('contact-delete-button'))).toBeNotVisible();
  });
  it('should display error message when invalid phone number is provided', async () => {
    await element(by.label('Name')).atIndex(1).tap();
    await element(by.label('Name')).atIndex(1).replaceText('test');
    await element(by.label('Phone Number')).atIndex(1).tap();
    await element(by.label('Phone Number')).atIndex(1).replaceText('123');
    await element(by.label('Help Message')).atIndex(1).tap();
    await element(by.label('Help Message')).atIndex(1).replaceText('help');
    await element(by.id('contact-submit-button')).tap();
    await expect(element(by.text('Phone number is not valid'))).toBeVisible();
  });
  it('should successfully add contact with valid contact details', async () => {
    await element(by.text('123')).tap();
    await element(by.text('123')).replaceText('4915756775099');
    await element(by.id('contact-submit-button')).tap();
    await expect(element(by.text('test'))).toBeVisible();
  });

  it('should render send sms button if there is one or more contacts', async () => {
    await expect(element(by.id('send-sms-button'))).toBeVisible();
  });
  it('should render a delete button when its edit mode', async () => {
    await element(by.text('test')).tap();
    await expect(element(by.id('contact-delete-button'))).toBeVisible();
  });
  it('should successfully edit existing contact and render the new contact on the contact list', async () => {
    await element(by.id('RNE__Input__text-input')).atIndex(0).tap();
    await element(by.id('RNE__Input__text-input'))
      .atIndex(0)
      .replaceText('newname');
    await element(by.id('contact-submit-button')).tap();
    await expect(element(by.text('newname'))).toBeVisible();
    await expect(element(by.text('test'))).toBeNotVisible();
  });
  it('should successfully delete existing contact', async () => {
    await element(by.text('newname')).tap();
    await element(by.id('contact-delete-button')).tap();
    await expect(
      element(by.text('Please add your trusted contact')).atIndex(0)
    ).toBeVisible();
    await expect(
      element(by.text('Please add your trusted contact')).atIndex(1)
    ).toBeVisible();
    await expect(element(by.id('send-sms-button'))).toBeNotVisible();
  });
  it('should display all the features on user settings screen', async () => {
    await element(by.text('User Settings')).tap();
    await element(by.text('User Settings')).tap();
    await expect(element(by.text('How to use'))).toBeVisible();
    await expect(element(by.text('Change Password'))).toBeVisible();
    await expect(element(by.text('Change Language'))).toBeVisible();
    await expect(element(by.text('Delete Account'))).toBeVisible();
  });
  it('should render username with greeting message on usersettings screen', async () => {
    await expect(element(by.text('Hello, Celeste'))).toBeVisible();
  });
  it('should display error messages if form is empty when submitting change password', async () => {
    await element(by.text('Change Password')).tap();
    await element(by.text('CONFIRM')).tap();
    await expect(element(by.text('Please enter an email'))).toBeVisible();
    await expect(
      element(by.text('Please enter your old password here'))
    ).toBeVisible();
    await expect(
      element(by.text('Please enter 8 characters password'))
    ).toBeVisible();
  });
  it('should throw error message when the email given is incorrect', async () => {
    await element(by.id('RNE__Input__text-input'))
      .atIndex(0)
      .replaceText('fake@test.com');
    await element(by.id('RNE__Input__text-input'))
      .atIndex(1)
      .replaceText('password');
    await element(by.id('RNE__Input__text-input'))
      .atIndex(2)
      .replaceText('newpassword');
    await element(by.text('CONFIRM')).tap();
    await expect(element(by.text('Something went wrong!'))).toBeVisible();
  });
  it('should throw error message when the old password given is incorrect', async () => {
    await element(by.id('RNE__Input__text-input'))
      .atIndex(0)
      .replaceText('test@test.com');
    await element(by.id('RNE__Input__text-input'))
      .atIndex(1)
      .replaceText('fake');
    await element(by.id('RNE__Input__text-input'))
      .atIndex(2)
      .replaceText('newpassword');
    await element(by.text('CONFIRM')).tap();
    await expect(element(by.text('Old password is not correct'))).toBeVisible();
  });
  it('should successfully change user password with correct email and password', async () => {
    await element(by.id('RNE__Input__text-input'))
      .atIndex(1)
      .replaceText('password');
    await element(by.text('CONFIRM')).tap();
    await expect(
      element(by.text('Your password was successfully changed!'))
    ).toBeVisible();
    await element(by.text('Ok')).tap();
    await element(by.text('Change Password')).tap();
    await element(by.id('RNE__Input__text-input'))
      .atIndex(0)
      .replaceText('test@test.com');
    await element(by.id('RNE__Input__text-input'))
      .atIndex(1)
      .replaceText('newpassword');
    await element(by.id('RNE__Input__text-input'))
      .atIndex(2)
      .replaceText('password');
    await element(by.text('CONFIRM')).tap();
    await expect(
      element(by.text('Your password was successfully changed!'))
    ).toBeVisible();
    await element(by.text('Ok')).tap();
  });
  it('should change app langauge to selected language', async () => {
    await element(by.text('Change Language')).tap();
    await element(by.text('German')).tap();
    await expect(element(by.text('Hallo, Celeste'))).toBeVisible();
    await expect(element(by.text('Wie man es benutzt'))).toBeVisible();
    await expect(element(by.text('Passwort \u00e4ndern'))).toBeVisible();
    await expect(element(by.text('Sprache \u00e4ndern'))).toBeVisible();
    await expect(element(by.text('Konto l\u00f6schen'))).toBeVisible();
    await expect(element(by.text('Ausloggen'))).toBeVisible();
    await element(by.text('Sprache \u00e4ndern')).tap();
    await element(by.text('English')).tap();
    await expect(element(by.text('Change Language'))).toBeVisible();
  });
  it('should delete account', async () => {
    await expect(element(by.text('Delete Account'))).toBeVisible();
    await element(by.text('Delete Account')).tap();
    await expect(
      element(by.text('Are you certain you want to delete your account?'))
    ).toBeVisible();
    await element(by.id('deleteAccount')).tap();
  });
  it('should follow onboarding process', async () => {
    await expect(element(by.text('TERMS AND CONDITIONS'))).toBeVisible();
    await element(by.type('RCTCustomScrollView')).scroll(384.667, 'down');
    await element(by.id('terms-conditions-button')).tap();
    await expect(element(by.text('EMERGENCY CONTACTS'))).toBeVisible();
    await element(by.text('Next')).tap();
    await expect(element(by.text('LOCATE NEAREST SHELTERS'))).toBeVisible();
    await element(by.text('Next')).tap();
    await expect(
      element(by.text('LEARN WITH OUR CURATED RESOURCES'))
    ).toBeVisible();
    await element(by.text('Next')).tap();
    await expect(element(by.text('TEST YOUR KNOWLEDGE'))).toBeVisible();
    await element(by.text('\u2713')).tap();
  });
  it('should show errors on user sign up process', async () => {
    await element(by.text('Do not have an account? Go to sign up')).tap();
    await expect(element(by.text('Sign Up'))).toBeVisible();
    await element(by.id('signUp')).tap();
    await expect(element(by.text('Please enter your username'))).toBeVisible();
    await expect(element(by.text('Please enter an email'))).toBeVisible();
    await expect(
      element(by.text('Please enter 8 characters password'))
    ).toBeVisible();
  });

  it('should signup user process', async () => {
    await element(by.id('RNE__Input__text-input'))
      .atIndex(0)
      .replaceText('testCeleste');
    await element(by.id('RNE__Input__text-input'))
      .atIndex(2)
      .replaceText('testCeleste@test.com');
    await element(by.id('RNE__Input__text-input'))
      .atIndex(4)
      .replaceText('testpassword');
    await element(by.id('signUp')).tap();
    await expect(element(by.label('HOME HOME')).atIndex(0)).toBeVisible();
  });

  it('should log out user successfully', async () => {
    await element(by.text('User Settings')).tap();
    await element(by.text('Log Out')).tap();
    await expect(element(by.text('Emergency'))).toBeNotVisible();
  });
});
