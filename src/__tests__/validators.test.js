/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
import { validators } from '../index';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('validators', () => {

  test('required', () => {
    expect(validators.required([])).toBe(false);
    expect(validators.required('')).toBe(false);
    expect(validators.required({})).toBe(false);
    expect(validators.required(undefined)).toBe(false);
    expect(validators.required(null)).toBe(false);
    expect(validators.required('Hello')).toBe(true);
    expect(validators.required(['Hello'])).toBe(true);
    expect(validators.required(4)).toBe(true);
  });

  test('email', () => {
    expect(validators.email('Hello')).toBe(false);
    expect(validators.email('something@something')).toBe(false);
    expect(validators.email('something@something.co')).toBe(true);
    expect(validators.email('something@something.co.uk')).toBe(true);
    expect(validators.email('something@something.com')).toBe(true);
    expect(validators.email('something+else@something.com')).toBe(true);
    expect(validators.email('some_th.ing+e.l.se@www.some-thing.com')).toBe(true);
  });

  test('phone', () => {
    expect(validators.phone('Hello')).toBe(false);
    expect(validators.phone('123232123')).toBe(false);
    expect(validators.phone('333')).toBe(false);
    expect(validators.phone('1234567890')).toBe(true);
    expect(validators.phone('123.453.4345')).toBe(true);
    expect(validators.phone('123-453-4345')).toBe(true);
    expect(validators.phone('123 453 4345')).toBe(true);
    expect(validators.phone('123.453-4345')).toBe(true);
    expect(validators.phone('+11 123.453-4345')).toBe(true);
    expect(validators.phone('+11123.453-4345')).toBe(true);
    expect(validators.phone('+1 123.453-4345')).toBe(true);
    expect(validators.phone('+1123 4534345')).toBe(true); 
  });

  test('minLength', () => {
    expect(validators.minLength(10)('Hello')).toBe(false);
    expect(validators.minLength(10)('123456789')).toBe(false);
    expect(validators.minLength(4)('333')).toBe(false);
    expect(validators.minLength(10)('1234567890')).toBe(true);
    expect(validators.minLength(5)('123456')).toBe(true);
  });

  test('maxLength', () => {
    expect(validators.maxLength(10)('Hello')).toBe(true);
    expect(validators.maxLength(10)('123456789')).toBe(true);
    expect(validators.maxLength(4)('333')).toBe(true);
    expect(validators.maxLength(10)('1234567890')).toBe(true);
    expect(validators.maxLength(10)('12345678901')).toBe(false);
    expect(validators.maxLength(5)('123456')).toBe(false);
  });
});