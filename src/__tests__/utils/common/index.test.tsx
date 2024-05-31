import {
  getFontColorByStatus,
  removeZOfDateTime,
  isBeforeLastIndex,
  removeLanguagePath,
} from '@/utils/common';
const results = [
  {
    status: 'normal',
    finding: 'normal'
  },
  {
    status: 'abnormal',
    finding: 'abnormal'
  },
  {
    status: 'not test',
    finding: 'not test'
  },
  {
    status: '',
    finding: ''
  },
];

describe('test utils common ', () => {
  describe('getFontColorByStatus', () => {

    results.forEach((result) => {
      it('get font color by result status', () => {
        getFontColorByStatus(result, 'status')
        getFontColorByStatus(result, 'finding')
      });

    })

  });

  describe('removeZOfDateTime', () => {
    it('returns value without Z character', () => {
      expect(removeZOfDateTime('2022-05-31T12:00:00Z')).toBe('2022-05-31T12:00:00');
    });

    it('returns value as it is if no Z character present', () => {
      expect(removeZOfDateTime('2022-05-31T12:00:00')).toBe('2022-05-31T12:00:00');
    });

    it('returns value as it is if value is empty', () => {
      expect(removeZOfDateTime('')).toBe('');
    });
  });

  describe('isBeforeLastIndex', () => {
    it('returns true if index is before last index of array', () => {
      expect(isBeforeLastIndex(results, 0)).toBe(true);
    });

    it('returns false if index is last index of array', () => {
      expect(isBeforeLastIndex(results, results.length - 1)).toBe(false);
    });

  });

  describe('removeLanguagePath', () => {
    it('removes language path from URL', () => {
      expect(removeLanguagePath('/en/home')).toBe('/home');
      expect(removeLanguagePath('/fr/about')).toBe('/about');
    });

    it('returns the original URL if no language path is found', () => {
      expect(removeLanguagePath('/home')).toBe('/home');
      expect(removeLanguagePath('/about')).toBe('/about');
    });

    it('returns the original URL if URL is empty', () => {
      expect(removeLanguagePath('')).toBe('');
    });
  });
})
