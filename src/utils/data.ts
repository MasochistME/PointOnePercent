import { DiscordInteraction } from "arcybot";

import { bot, cache, sdk } from "fetus";
import { UNKNOWN_NAME } from "consts";
import { ButtonInteraction } from "discord.js";

export const getOption = (key: string) =>
  cache.options.find(option => option.option === key)?.value;

export const getChannelById = (
  interaction: DiscordInteraction | ButtonInteraction,
  channelId?: string,
) => {
  const channel = interaction.guild?.channels.cache.find(
    ch => ch.id === channelId,
  );
  if (channel?.isTextBased()) return channel;
  return null;
};

export const getModChannel = (isRaceRoom?: boolean) => {
  const modRoom = getOption(isRaceRoom ? "room_race_mod" : "room_mod");
  const channel = bot.botClient.channels.cache.find(ch => ch.id === modRoom);
  if (channel?.isTextBased()) return channel;
  return null;
};

export const getBadgeNameById = (badgeId?: string | null): string => {
  if (!badgeId) return UNKNOWN_NAME;
  const badge = cache.badges.find(b => String(b._id) === badgeId);
  return badge?.name ?? UNKNOWN_NAME;
};

export const getMemberNameById = (id?: string | null): string => {
  if (!id) return UNKNOWN_NAME;
  const member = cache.members.find(m => m.id === id || m.discordId === id);
  return member?.name ?? UNKNOWN_NAME;
};

export const getIsUserRegistered = async (discordId: string) => {
  try {
    const member = await sdk.getMemberById({ discordId });
    if (member) return true;
    return false;
  } catch (error) {
    // Mongo returns 404 if user does not exist
    return false;
  }
};

export const getFileExtension = (url: string): string | null => {
  const regex = new RegExp(/([^\.]*)$/i);
  const extension = regex.exec(url)?.[0] ?? null;
  return extension;
};
