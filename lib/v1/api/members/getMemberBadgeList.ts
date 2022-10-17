import axios, { AxiosResponse } from 'axios';

import { Badge, MemberIdEither, Sort, ResponseError } from 'v1/types';

/**
 * Returns a list of all badges belonging to a member.
 * Member can be identified by either Discord ID or Steam ID, but at least one of those values **must** be provided.
 *
 * ### Filter options
 *
 * - `gameId` - filters by ID of the Steam game the badge belongs to,
 * - `title` - filters by title of the non-Steam game the badge belongs to,
 * - `isSteamGame` - filters by game being on Steam or not,
 * - `isLegacy` - filters by badge's `legacy` status,
 * - `isEnabled` - filters by badge's `enabled` status.
 *
 * ### Sort options
 *
 * - `points` - sorts by badge's point value.
 *
 * ## Usage
 *
 * ```ts
 * const steamId: string = "567876545678";
 * const badges: Badge[] = await sdk.getMemberBadgeList({ steamId });
 * const badgePointsAsc: Badge[] = await sdk.getMemberBadgeList({ steamId, sort: { points: 'asc' }});
 * const badgesSteamGames: Badge[] = await sdk.getMemberBadgeList({ steamId, filter: { isSteamGame: true }});
 * ```
 *
 * @param params.steamId   - (Optional) Steam ID of the requested member.
 * @param params.discordId - (Optional) Discord ID of the requested member.
 * @param params.filter - Filter to apply to returned badge list.
 * @param params.sort - Fields to sort badge list by.
 * @param params.limit - How many badges will get returned.
 */
export const getMemberBadgeList = async (
	params: MemberIdEither & {
		filter?: Partial<
			Pick<Badge, 'gameId' | 'title' | 'isEnabled' | 'isLegacy' | 'isSteamGame'>
		>;
		sort?: {
			[key in keyof Partial<Pick<Badge, 'points'>>]: Sort;
		};
		limit?: number;
	},
	/** @ignore */
	BASE_URL: string,
): Promise<Badge[]> => {
	const { steamId, discordId, filter, sort, limit } = params;
	const memberId = steamId ?? discordId;
	const url = `${BASE_URL}/members/member/${memberId}/badges/list`;

	const badgeResponse = await axios.post<
		Badge[] | ResponseError,
		AxiosResponse<Badge[] | ResponseError>
	>(url, { filter, sort, limit }, { validateStatus: () => true });

	const { status, data } = badgeResponse;

	if (status !== 200) throw new Error((data as ResponseError).error);
	return data as Badge[];
};

// TODO Think if it should return just the MemberBadge[], or actual Badge[]
