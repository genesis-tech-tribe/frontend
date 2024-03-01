import { IUser } from '@/types/definition';

import { Err, Ok, Result } from 'result-ts-type';

import { request } from '../../common/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

/**
 * Interface representing the API response for auth/me API endpoint.
 * @property userId - Id of current logged in user.
 */
export interface IGetCurrentUserResponse {
  userId: IUser['id'];
}

/**
 * Fetch the current logged in user's id.
 * @returns A {@link IGetCurrentUserResponse} object on success, or an error message if the request fails
 */
export const getCurrentUserId = async (): Promise<Result<IGetCurrentUserResponse, string>> => {
  try {
    const data = await request<string>({
      url: API_BASE_URL + '/auth/me',
      method: 'GET',
    });
    /**
     * The API currently returns a JSON string instead of object
     * This issue is mentioned in the issue {@link https://github.com/nishiki-tech/nishiki-frontend/issues/255}
     * Thus, fow now, we need to parse the response in here.
     */
    const parsedData = JSON.parse(data) as IGetCurrentUserResponse;
    return Ok(parsedData);
  } catch (err) {
    if (err instanceof Error) {
      return Err(err.message);
    }
    return Err('API response is invalid');
  }
};
