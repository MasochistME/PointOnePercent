import React from 'react';

import { Flex, Button } from 'components';
import { Size } from 'utils';

export const ButtonsSocialMedia = (): JSX.Element => {
	const onButtonCuratorClick = () => {
		window.open('https://store.steampowered.com/curator/41289936', '_blank');
	};
	const onButtonPatreonClick = () => {
		window.open('https://www.patreon.com/pointonepercent', '_blank');
	};
	const onButtonDiscordClick = () => {
		window.open('https://discord.com/invite/cRNWDSam', '_blank');
	};

	return (
		<Flex gap={4}>
			<Button
				size={Size.BIG}
				icon="fab fa-steam"
				tooltip="Our Steam curator"
				onClick={onButtonCuratorClick}
			/>
			<Button
				size={Size.BIG}
				icon="fab fa-discord"
				tooltip="Our Discord server"
				onClick={onButtonDiscordClick}
			/>
			<Button
				size={Size.BIG}
				icon="fab fa-patreon"
				tooltip="Support us!"
				onClick={onButtonPatreonClick}
			/>
		</Flex>
	);
};
