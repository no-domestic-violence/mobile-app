import { expect, device, element, by } from 'detox';

describe('Shows userflow starting from logged out, not first time launch', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        location: 'always',
      },
    });
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
  //login is here

  it('should delete account', async () => {
    await element(by.label('UserSettings')).tap();
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
});
