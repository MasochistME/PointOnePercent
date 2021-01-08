import React from 'react';
import { useSelector } from 'react-redux';
import { orderBy } from 'lodash';
import LeaderboardsProgressBar from './LeaderboardsProgressBar';
import StackedBarChart from '../../../Charts/StackedBarChart';
import ChartWrapper from '../../../Charts/ChartWrapper';
import { Flex } from 'shared/components';

type Props = {
  show: boolean;
  game: any;
  rating: any;
};

export default function Leaderboards(props: Props): JSX.Element | null {
  const { show: visible, game, rating } = props;
  const users = useSelector((state: any) => {
    const usersRating = state.ranking.slice(0, 10);
    const usersBasic = state.users.list;
    const usersFull = usersRating.map((user: any) => ({
      ...user,
      name: usersBasic.find((u: any) => u.id === user.id)?.name,
    }));
    return usersFull;
  });
  const games = useSelector((state: any) => state.games);
  const badges = useSelector((state: any) =>
    orderBy(
      state.badges
        .filter((badge: any) => badge.gameId === game.id)
        .map(
          (badge: any) =>
            (badge = {
              ...badge,
              game: badge.isNonSteamGame
                ? badge.game
                : games.find((game: any) => game.id === badge.gameId).title,
            }),
        ),
      ['points'],
      ['desc'],
    ),
  );

  const leaderboards = orderBy(
    users
      .filter((user: any) => user.protected || user.member)
      .filter((user: any) =>
        user.games.find((g: any) => Number(g.appid) === Number(game.id)),
      )
      .map((user: any) => {
        const userGameStats = user.games.find(
          (g: any) => Number(g.appid) === Number(game.id),
        );
        return userGameStats
          ? {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              gameId: game.id,
              completionRate: userGameStats.completionRate
                ? userGameStats.completionRate
                : 0,
              lastUnlocked: userGameStats.lastUnlocked,
              playtime: userGameStats.playtime_forever,
            }
          : null;
      }),
    ['completionRate', 'lastUnlocked'],
    ['desc', 'asc'],
  );

  const assignTrophyIfDeserved = (leaderboards: any, index: number): string => {
    if (leaderboards.completionRate !== 100) {
      return '';
    }
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return '';
    }
  };

  const assignDateIfFinished = (leaderboards: any): string | null => {
    return leaderboards.completionRate === 100
      ? new Date(leaderboards.lastUnlocked * 1000).toLocaleString()
      : null;
  };

  const summarizeCompletions = (leaderboard: any): number => {
    return leaderboard.filter((user: any) => user.completionRate === 100)
      .length;
  };

  const summarizeCompletionTime = (leaderboard: any): number => {
    let sum = 0;
    const completed = leaderboard
      .filter((user: any) => user.completionRate === 100)
      .map((entry: any) => {
        entry.playtime
          ? typeof entry.playtime === 'number'
            ? (sum += entry.playtime * 60)
            : (sum += parseInt(entry.playtime.replace(',', '')) * 60)
          : (sum += 0);
        return entry;
      });
    const average = Math.round(sum / 60 / completed.length);

    return Number.isNaN(average) ? 0 : average;
  };

  const summarizeCompletionTimeAll = (): number => {
    let sum = 0;
    let number = 0;
    const gameIDs = games
      .filter((game: any) => game.rating === rating)
      .map((game: any) => game.id);
    users.map((user: any) => {
      user.games.map((game: any) => {
        if (gameIDs.find((g: any) => g === game.appid)) {
          // TODO equality
          sum = sum + parseInt(game.playtime_forever);
          number = number + 1;
        }
        return game;
      });
      return user;
    });
    if (sum !== 0 && number !== 0) {
      return sum / number;
    } else {
      return 0;
    }
  };

  return visible ? (
    <div className="leaderboards">
      <h2>
        <a
          href={`https://store.steampowered.com/app/${game.id}`}
          target="_blank"
          rel="noopener noreferrer">
          {game.title} <i className="fas fa-external-link-alt"></i>
        </a>
      </h2>
      <div className="game-statistics">
        <ChartWrapper
          title={[
            `Completions: ${summarizeCompletions(leaderboards)}`,
            'Average completion time',
          ]}>
          <StackedBarChart
            labels={['hours']}
            datasets={[
              {
                label: 'this game',
                data: [summarizeCompletionTime(leaderboards)],
                colorNormal: '#e30000ff',
                colorTransparent: '#e3000033',
              },
              {
                label: 'games from this tier',
                data: [summarizeCompletionTimeAll()],
                colorNormal: '#141620ff',
                colorTransparent: '#14162066',
              },
            ]}
          />
        </ChartWrapper>
      </div>
      {badges.length > 0 ? (
        <div className="game-badges">
          <div className="profile-section flex-column">
            <h3 className="profile-section-title">Badges</h3>
            <Flex
              column
              style={{
                width: '100%',
                height: '100%',
                padding: '0 10px 10px 10px',
                boxSizing: 'border-box',
              }}>
              {badges.map((badge: any, index: number) => (
                <div
                  className="badge-description flex-column"
                  key={`badge-${index}`}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    {badge.name.toUpperCase()}
                  </p>
                  <Flex row style={{ width: '100%' }}>
                    <img
                      className="profile-badge"
                      style={{ margin: '5px 10px 5px 5px' }}
                      src={badge.img}
                      alt="badge"
                      key={`badge-${index}`}
                    />
                    <Flex column style={{ width: '100%' }}>
                      <p className="badge-field">Points: {badge.points} pts</p>
                      <p className="badge-field">Proof: {badge.requirements}</p>
                      <p className="badge-field">
                        Description: {badge.description}
                      </p>
                    </Flex>
                  </Flex>
                </div>
              ))}
            </Flex>
          </div>
        </div>
      ) : null}
      <ul className="game-leaderboards">
        {leaderboards.map((user: any, userIndex: number) => (
          <li
            className="leaderboards-user flex-row"
            key={`leaderboards-user-${userIndex}`}>
            <img
              className="leaderboards-user-image"
              alt="avatar"
              src={user.avatar}></img>
            <div className="leaderboards-user-info flex-row">
              <div className="leaderboards-user-name">
                {assignTrophyIfDeserved(user, userIndex) + user.name}
              </div>
              <div className="leaderboards-user-times">
                {assignDateIfFinished(user)}
              </div>
            </div>
            <LeaderboardsProgressBar
              percentage={Math.floor(user.completionRate)}
            />
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
