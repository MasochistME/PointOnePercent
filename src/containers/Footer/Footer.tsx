import React from 'react';
import styled from 'styled-components';

import { Flex } from 'components';
import { fonts, media, useTheme, ColorTokens } from 'styles';
import { ButtonsSocialMedia } from 'containers';
import { Size } from 'components';
import { Link } from 'react-router-dom';

export const Footer = () => {
	const { colorTokens } = useTheme();

	return (
		<StyledFooter align colorTokens={colorTokens}>
			<StyledFooterText>
				<div>
					Made by{' '}
					<a href="http://arcyvilk.com/" target="_blank">
						Arcyvilk
					</a>{' '}
					&copy; 2016-2023
				</div>
				<div>●</div>
				<div>
					<Link to="/changelog">Changelog</Link>
				</div>
			</StyledFooterText>
			<ButtonsSocialMedia size={Size.MEDIUM} />
		</StyledFooter>
	);
};

const StyledFooter = styled(Flex)<{ colorTokens: ColorTokens }>`
	position: sticky;
	bottom: 0px;
	justify-self: flex-end;
	justify-content: space-between;
	width: 100%;
	padding: 0px 24px;
	box-shadow: 0 0 30px ${({ colorTokens }) => colorTokens['core-primary-bg']};
	background-color: ${({ colorTokens }) => colorTokens['core-primary-bg']};
	color: ${({ colorTokens }) => colorTokens['semantic-color--disabled']};
	font-family: ${fonts.Raleway};
	a {
		color: ${({ colorTokens }) => colorTokens['semantic-color--link-normal']};
	}
`;

const StyledFooterText = styled.footer`
	display: flex;
	margin: 0;
	text-align: left;
	align-items: center;
	gap: 8px;

	@media (max-width: ${media.bigPhones}) {
		font-size: 1em;
	}
`;
