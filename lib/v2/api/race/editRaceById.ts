import axios, { AxiosResponse } from 'axios';
import { UpdateResult } from 'mongodb';

import { Race, ResponseError } from 'v2/types';

/**
 * Edits a race by updating the fields that the user had passed.
 * @param id string
 * @param race Partial<Omit<Race, '_id'>>
 * @returns UpdateResult | ResponseError
 */
export const editRaceById =
	async ({ id, race }: { id: string; race: Partial<Omit<Race, '_id'>> }) =>
	async (BASE_URL: string): Promise<UpdateResult | ResponseError> => {
		const url = `${BASE_URL}/race/id/${id}`;

		const raceResponse = await axios.put<
			UpdateResult | ResponseError,
			AxiosResponse<UpdateResult | ResponseError>,
			Partial<Omit<Race, '_id'>>
		>(url, race, { validateStatus: () => true });

		const { status, data } = raceResponse;

		if (status !== 200) throw new Error((data as ResponseError).error);
		return data as UpdateResult;
	};
