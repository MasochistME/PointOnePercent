/**
 * @module Members
 */

import { WithId } from 'v1/types/Mongo';

/**
 * This is a type of a single object within the collection "members".
 * A single object describes a single member.
 */
export interface Member extends WithId {
	/**
	 * Member's Steam username.
	 */
	name: string;
	/**
	 * Member's Steam ID.
	 */
	steamId: string;
	/**
	 * Member's Discord ID (if their account was registered).
	 */
	discordId: string;
	/**
	 * Member's MasochistME profile description.
	 */
	description: string | null;
	/**
	 * Link to member's Steam avatar.
	 */
	avatar: string;
	/**
	 * Link to member's Steam profile.
	 */
	url: string;
	/**
	 * Date of the last update of the member's MasochistME profile.
	 */
	lastUpdated: Date;
	/**
	 * Indicates if the member's Steam profile is set to private.
	 */
	isPrivate: boolean;
	/**
	 * Indicates if member is a member of the MasochistME Steam curator.
	 */
	isMember: boolean;
	/**
	 * If the member is not currently a part of curator, this flag will protect them from being removed from website.
	 */
	isProtected: boolean;
	/**
	 * How many games from every tier the member completed.
	 */
	ranking?: any; // TODO Move the MemberRanking to a separate database
}

/**
 * Type used when it does not matter what type of ID member provides while trying to retrieve their data.
 */
export type MemberIdEither =
	| { steamId: string; discordId?: never }
	| { steamId?: never; discordId: string };
