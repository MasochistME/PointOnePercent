import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Member, Tier } from '@masochistme/sdk/dist/v1/types';

import { useAppContext } from 'shared/store/context';
import { useActiveTab, useTiers, useMembers } from 'shared/hooks';
import { TabDict } from 'shared/config/tabs';
import { SearchBar } from 'containers';
import { Flex, Wrapper, Spinner } from 'components';

import { User } from './User';

const WrapperRanking = styled.div`
	width: 100%;
`;
const RankingList = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: hidden;
	width: 100%;
`;

export const TabLeaderboards = (): JSX.Element => {
	const { queryMember } = useAppContext();
	useActiveTab(TabDict.LEADERBOARDS);

	const ranking = useSelector((state: any) => state.ranking);
	const { tiersData } = useTiers();
	const { membersData } = useMembers();

	const createRankingList = () => {
		if (!ranking?.length) return;
		return ranking?.map((user: any, position: number) => {
			const memberName = membersData.find(
				(m: Member) => m.steamId === user.id,
			)?.name;
			if (memberName) {
				const isUserSearch =
					memberName.toLowerCase().indexOf(queryMember.toLowerCase()) !== -1;
				return isUserSearch ? (
					<User steamId={user.id} position={position} key={`user-${user.id}`} />
				) : null;
			}
		});
	};

	return (
		<Flex column>
			<Wrapper type="description">
				<div className="page-description">
					<p>
						Ranking system utilizes the games&lsquo; score system. Depending on
						the game&lsquo;s individual difficulty level, it is given one of{' '}
						{tiersData?.length ?? 'X'} possible marks:
					</p>
					<ul>
						{tiersData
							?.sort((tierA: Tier, tierB: Tier) => tierA?.score - tierB?.score)
							.map((tier: Tier, tierIndex: number) => (
								<li key={`tier-${tierIndex}`}>
									<i className={tier?.icon} /> - worth {tier?.score} pts -{' '}
									{tier?.description}{' '}
								</li>
							))}
					</ul>
					<p>
						Completing a game might mean earning its most demanding achievement,
						or getting the in-game 100%; but for the sake of simplicity the
						ranking system present here assumes that completing a game means
						earning 100% of its Steam achievements. You are awarded points
						depending on the completed game&lsquo;s difficulty level, which are
						later summarized and used to determine your placement on the ranking
						ladder.
					</p>
				</div>
				<SearchBar />
				{!ranking?.length && <Spinner />}
			</Wrapper>
			<WrapperRanking>
				<RankingList>{ranking?.length && createRankingList()}</RankingList>
			</WrapperRanking>
		</Flex>
	);
};
