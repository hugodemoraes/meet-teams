import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { groupsGetAll } from "@storage/group/groupsGetAll";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

import { Container } from "./styles";
import { Loading } from "@components/Loading";

export default function Groups() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const { navigate } = useNavigation();

  async function fetchGroups() {
    try {
      setLoading(true);
      const groups = await groupsGetAll();
      setGroups(groups);
    } catch (error) {
      Alert.alert("Turmas", "Não foi possível carregar as turmas.");
      console.log(error);
    } finally {
      setLoading(false);
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

      {loading ? (
        <Loading />
      ) : (
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
      )}

      <Button description="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
