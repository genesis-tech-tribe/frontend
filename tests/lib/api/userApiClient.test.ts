import { fetchUserList } from '@/lib/api';
import * as commonUtils from '@/lib/api/commonUtils';

jest.mock('@/lib/api/commonUtils', () => ({
  request: jest.fn(),
}));

const mockUser = { userId: '1', userName: 'User 1' };

const setUpMockRequest = <T>(mockData: T) => {
  return jest.spyOn(commonUtils, 'request').mockResolvedValue(mockData);
};

describe('API Function Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUserList', () => {
    const mockUserId = '123';
    it('successfully fetches user list for a group', async () => {
      const mockRequest = setUpMockRequest({ users: [mockUser] });
      const expectedValue = [{ ...mockUser }];

      const result = await fetchUserList(mockUserId);

      expect(result).toEqual(expectedValue);
      expect(mockRequest).toHaveBeenCalledTimes(1);
    });

    it('throws an error on API failure', async () => {
      jest.spyOn(commonUtils, 'request').mockRejectedValue(new Error('Network error'));
      const result = fetchUserList(mockUserId);
      await expect(result).rejects.toThrow('API response is invalid');
    });
  });
});