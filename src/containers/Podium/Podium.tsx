import { RacePlayer } from '@masochistme/sdk/dist/v1/types';
import styled from 'styled-components';

import { PodiumItem } from './PodiumItem';

type Props = {
	podium: (RacePlayer & { place: 1 | 2 | 3 })[];
};

export const Podium = (props: Props) => {
	const { podium } = props;
	return (
		<StyledPodium>
			{podium.map(player => (
				<PodiumItem player={player} />
			))}
		</StyledPodium>
	);
};

const StyledPodium = styled.div`
	display: grid;
	align-items: flex-end;
	grid-template-columns: 3fr 1;
`;
