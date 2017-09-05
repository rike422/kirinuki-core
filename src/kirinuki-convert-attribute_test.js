import test from 'ava';
import { heroNews } from './fixtures/fixture_test';
import kirinuki from './kirinuki';

test('should return single html attribute when selector is Array and selector key is single', t => {
  const value = kirinuki({
    hero: ['.news-list .content', "data-hero"]
  }, heroNews);

  t.deepEqual(value, {
    hero: 'Batman'
  });
});

test('should return Array html attributes when selector is Array and selector key is plural', t => {
  const value = kirinuki({
    heroes: ['.news-list .content', "data-hero"]
  }, heroNews);

  t.deepEqual(value, {
    heroes: ["Batman", "Dr. Strange"]
  });
});

