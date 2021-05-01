import { expect, device, element, by } from 'detox';

describe('Shows the home screen and different resources workflow', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        location: 'always',
      },
    });
  });

  beforeEach(async () => {
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
    // TODO: in process
    await element(by.label('VIDEO VIDEO')).atIndex(0).tap();
    await element(by.text('7 Early Signs of A Toxic Relationship')).tap();
    // await element(by.id('videoContainer')).tap();
    // await element(by.id("Play/Pause")).tap();
    // await element(by.id("Done")).atIndex(0).tap();
    // await element(by.label("VIDEO VIDEO")).atIndex(0).tap();
  });
  it('should show hotlines screen', async () => {
    await element(by.label('Hotlines')).tap();
    await element(by.id('searchInput')).tap();
    await element(by.id('searchInput')).replaceText('b');
    await element(by.id('searchInput')).replaceText('be');
    await element(by.id('searchInput')).replaceText('ber');
    await element(by.id('searchInput')).replaceText('berl');
    await element(by.id('searchInput')).replaceText('berli');
    await element(by.id('searchInput')).replaceText('berlin');
    await expect(element(by.text('berlin'))).toBeVisible();
    // TODO: fix this with test ID
    // await expect(element(by.id('makeCall'))).toBeVisible();
    // await element(by.id('makeCall')).tap();
    await element(by.label('MAP MAP')).atIndex(0).tap();
  });
  it('should show hotlines screen', async () => {
    await element(by.label('Hotlines')).tap();
    await element(by.id('searchInput')).tap();
    await element(by.id('searchInput')).replaceText('b');
    await element(by.id('searchInput')).replaceText('be');
    await element(by.id('searchInput')).replaceText('ber');
    await element(by.id('searchInput')).replaceText('berl');
    await element(by.id('searchInput')).replaceText('berli');
    await element(by.id('searchInput')).replaceText('berlin');
    await expect(element(by.text('berlin'))).toBeVisible();
    // TODO: fix this with test ID
    // await expect(element(by.id('makeCall'))).toBeVisible();
    // await element(by.id('makeCall')).tap();
    await element(by.label('MAP MAP')).atIndex(0).tap();
  });
});
