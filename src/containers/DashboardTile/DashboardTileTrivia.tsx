import React from 'react';
import { Game, Tier } from '@masochistme/sdk/dist/v1/types';

import { useTiers, useCuratorMembers, useCuratedGames } from 'sdk';
import { Spinner } from 'components';
import { Section, SectionProps } from 'containers';

export const DashboardTileTrivia = (
	props: Omit<SectionProps, 'content' | 'title'>,
): JSX.Element => {
	const { tiersData, isLoading: isTiersLoading } = useTiers();
	const { membersData, isLoading: isMembersLoading } = useCuratorMembers();
	const { gamesData: games } = useCuratedGames();

	const isLoading = isMembersLoading && isTiersLoading;

	const mapCurated = () => {
		if (!games || !tiersData) return [];

		return tiersData.map((tier: Tier) => (
			<li
				style={{ marginLeft: '30px' }}
				key={`tier-${tier.score}-${String(tier._id)}`}>
				<i className={tier.icon} />
				<span>{` : ${
					games.filter((game: Game) => game.tier === tier.id).length
				}`}</span>
			</li>
		));
	};

	return (
		<Section
			title="Trivia"
			content={
				<>
					{isLoading && <Spinner />}
					{!isLoading && (
						<>
							<p>
								Users total: <span>{membersData.length}</span>
							</p>
							<p>Curated games:</p>
							<ul>
								<li style={{ marginLeft: '30px' }}>
									total: <span>{games.length}</span>
								</li>
								<ul>{mapCurated()}</ul>
							</ul>
						</>
					)}
				</>
			}
			{...props}
		/>
	);
};
