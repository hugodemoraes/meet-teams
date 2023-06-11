import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll();

    if (storedGroups.some((group) => group === newGroup))
      throw new AppError("Já existe uma turma cadastrada com esse nome.");

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...storedGroups, newGroup])
    );
  } catch (error) {
    throw error;
  }
}
