import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    if (storedPlayers.some((player) => player.name === newPlayer.name))
      throw new AppError("Essa pessoa já está adicionada em um time aqui.");

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify([...storedPlayers, newPlayer])
    );
  } catch (error) {
    throw error;
  }
}
