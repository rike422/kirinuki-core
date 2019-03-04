import test from 'ava'
import { heroNews } from '../../fixtures/fixture_test'
import { getNodeValue } from './get-node-value'
import { setupWindow } from '../../test_helper'

test('should return href attribute when <a>', t => {
  setupWindow(heroNews)
  const url = 'https://google.com/'
  setupWindow(`<a href="${url}"></a>`)
  const value = getNodeValue(document.getElementsByTagName('a')[0], {})
  t.is(value, url)
})

test('should return href attribute when <link>', t => {
  const url = 'https://google.com/'
  setupWindow(`<link href="${url}"></link>`)
  const value = getNodeValue(document.getElementsByTagName('link')[0], {})
  t.is(value, url)
})

test('should return src attribute when <img>', t => {
  const url = 'https://google.com/'
  setupWindow(`<img src="${url}"></img>`)
  const value = getNodeValue(document.getElementsByTagName('img')[0], {})
  t.is(value, url)
})

test('should return text node when block tag', t => {
  const text = 'test-text'
  setupWindow(`<div class="text-div">${text}</div>`)
  const value = getNodeValue(document.getElementsByTagName('div')[0], {})
  t.is(value, text)
})
