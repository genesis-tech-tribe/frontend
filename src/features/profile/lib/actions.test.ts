import { putUpdateUser } from '@/lib/api/user/client';

import { Err, Ok } from 'result-ts-type';

import { renameUser } from './actions';

jest.mock('@/lib/api/user/client', () => ({
  putUpdateUser: jest.fn(),
}));

// Clear mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

describe('Profile page actions', () => {
  describe('renameGroup', () => {
    // Arrange common mock data
    const mockUserId = 'a3kdifut-a520-c2cb-1be7-d90710691861';
    const mockInputs = {
      name: 'New Name',
    };

    it('should rename a user successfully   ', async () => {
      // Arrange
      (putUpdateUser as jest.Mock).mockResolvedValue(Ok(undefined));

      // Act
      const result = await renameUser(mockUserId, mockInputs);

      // Assert
      expect(result.ok).toBeTruthy();
      expect(result.unwrap()).toEqual(undefined);
      expect(putUpdateUser).toHaveBeenCalled();
    });

    it('should return an error if validation fails', async () => {
      // Arrange
      const mockInvalidInputs = {
        name: '',
      };
      const mockErrorMessage = 'Validation failed';

      // Act
      const result = await renameUser(mockUserId, mockInvalidInputs);

      // Assert
      expect(result.err).toBeTruthy();
      expect(result.unwrapError()).toEqual(mockErrorMessage);
      expect(putUpdateUser).not.toHaveBeenCalled();
    });

    it('should return an error if API request fails', async () => {
      // Arrange
      // Mock the API request to simulate failure
      const mockErrorMessage = 'API request failed';
      (putUpdateUser as jest.Mock).mockResolvedValue(Err(mockErrorMessage));

      // Act
      const result = await renameUser(mockUserId, mockInputs);

      // Assert
      expect(result.err).toBeTruthy();
      expect(result.unwrapError()).toEqual(mockErrorMessage);
    });
  });
});