import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { groupsGetAll } from "@storage/group/groupsGetAll";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

import { Container } from "./styles";

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const { navigate } = useNavigation();

  async function fetchGroups() {
    try {
      const groups = await groupsGetAll();
      setGroups(groups);
    } catch (error) {
      console.log(error);
    }
  }

  function handleNewGroup() {
    navigate("newGroup");
  }

  function handleOpenGroup(group: string) {
    navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        contentContainerStyle={!groups.length && { flex: 1 }}
        ListEmptyComponent={() => (
          <EmptyList message="Que tal cadastrar a primeira turma?" />
        )}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
      />

      <Button description="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
