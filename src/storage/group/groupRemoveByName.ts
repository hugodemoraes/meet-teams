import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

export async function groupRemoveByName(groupName: string) {
  try {
    const storage = await groupsGetAll();

    const groups = storage.filter((group) => group !== groupName);

    await Promise.all([
      AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups)),
      AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`),
    ]);
  } catch (error) {
    throw error;
  }
}
