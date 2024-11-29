import { describe, expect, it } from 'vitest';

import mapToCamelCase from '.';

describe('mapToCamelCase', () => {
  it('converts object keys to camelCase', () => {
    const input = {
      first_name: 'John',
      last_name: 'Doe',
      address_info: {
        street_name: 'Main Street',
        postal_code: 12345,
      },
    };

    const expectedOutput = {
      firstName: 'John',
      lastName: 'Doe',
      addressInfo: {
        streetName: 'Main Street',
        postalCode: 12345,
      },
    };

    const result = mapToCamelCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('converts array of objects keys to camelCase', () => {
    const input = [
      {
        first_name: 'Alice',
        last_name: 'Smith',
      },
      {
        first_name: 'Bob',
        last_name: 'Brown',
      },
    ];

    const expectedOutput = [
      {
        firstName: 'Alice',
        lastName: 'Smith',
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
      },
    ];

    const result = mapToCamelCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('does not change keys that are already camelCase', () => {
    const input = {
      firstName: 'John',
      lastName: 'Doe',
      addressInfo: {
        streetName: 'Main Street',
        postalCode: 12345,
      },
    };

    const expectedOutput = { ...input };

    const result = mapToCamelCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('handles mixed camelCase and snake_case keys', () => {
    const input = {
      first_name: 'John',
      lastName: 'Doe',
      address_info: {
        streetName: 'Main Street',
        postal_code: 12345,
      },
    };

    const expectedOutput = {
      firstName: 'John',
      lastName: 'Doe',
      addressInfo: {
        streetName: 'Main Street',
        postalCode: 12345,
      },
    };

    const result = mapToCamelCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('handles arrays of mixed camelCase and snake_case objects', () => {
    const input = [
      {
        first_name: 'Alice',
        lastName: 'Smith',
      },
      {
        firstName: 'Bob',
        last_name: 'Brown',
      },
    ];

    const expectedOutput = [
      {
        firstName: 'Alice',
        lastName: 'Smith',
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
      },
    ];

    const result = mapToCamelCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('returns primitive values unchanged', () => {
    expect(mapToCamelCase(42)).toBe(42);
    expect(mapToCamelCase('string')).toBe('string');
    expect(mapToCamelCase(null)).toBe(null);
    expect(mapToCamelCase(undefined)).toBe(undefined);
  });

  it('returns an empty object when input is an empty object', () => {
    const result = mapToCamelCase({});
    expect(result).toEqual({});
  });

  it('returns an empty array when input is an empty array', () => {
    const result = mapToCamelCase([]);
    expect(result).toEqual([]);
  });
});
