import { expect } from '@playwright/test';
import type { Event } from '@sentry/types';

import { sentryTest } from '../../../../../utils/fixtures';
import { getFirstSentryEnvelopeRequest } from '../../../../../utils/helpers';

sentryTest('captures Breadcrumb for clicks & debounces them for a second', async ({ getLocalTestUrl, page }) => {
  const url = await getLocalTestUrl({ testDir: __dirname });

  await page.route('**/foo', route => {
    return route.fulfill({
      status: 200,
      body: JSON.stringify({
        userNames: ['John', 'Jane'],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  const promise = getFirstSentryEnvelopeRequest<Event>(page);

  await page.goto(url);

  await page.click('#button1');
  // not debounced because other target
  await page.click('#button2');
  // This should be debounced
  await page.click('#button2');

  // Wait a second for the debounce to finish
  await page.waitForTimeout(1000);
  await page.click('#button2');

  await page.evaluate('Sentry.captureException("test exception")');

  const eventData = await promise;

  expect(eventData.exception?.values).toHaveLength(1);

  expect(eventData.breadcrumbs).toEqual([
    {
      timestamp: expect.any(Number),
      category: 'ui.click',
      message: 'body > button#button1[type="button"]',
    },
    {
      timestamp: expect.any(Number),
      category: 'ui.click',
      message: 'body > button#button2[type="button"]',
    },
    {
      timestamp: expect.any(Number),
      category: 'ui.click',
      message: 'body > button#button2[type="button"]',
    },
  ]);
});

sentryTest(
  'prioritizes the annotated component name within the breadcrumb message',
  async ({ getLocalTestUrl, page }) => {
    const url = await getLocalTestUrl({ testDir: __dirname });

    await page.route('**/foo', route => {
      return route.fulfill({
        status: 200,
        body: JSON.stringify({
          userNames: ['John', 'Jane'],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    const promise = getFirstSentryEnvelopeRequest<Event>(page);

    await page.goto(url);
    await page.click('#annotated-button');
    await page.evaluate('Sentry.captureException("test exception")');

    const eventData = await promise;

    expect(eventData.breadcrumbs).toEqual([
      {
        timestamp: expect.any(Number),
        category: 'ui.click',
        message: 'AnnotatedButton',
      },
    ]);
  },
);
