import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { EmptyList } from "@components/EmptyList";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Content, Form, HeaderList, PlayersCounter } from "./styles";

type RouteParams = {
  group: string;
};

export default function Players() {
  const TEAMS = ["Time A", "Time B"];

  const [team, setTeam] = useState(TEAMS[0]);
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const inputRef = useRef<TextInput>(null);

  async function fetchPlayersByTeam() {
    try {
      const players = await playersGetByGroupAndTeam(group, team);
      setPlayers(players);
    } catch (error) {
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado."
      );
      console.log(error);
    }
  }

  async function handleAddPlayer() {
    if (!newPlayerName.trim())
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar"
      );

    try {
      await playerAddByGroup(
        {
          name: newPlayerName,
          team,
        },
        group
      );

      setNewPlayerName("");
      fetchPlayersByTeam();

      // inputRef.current?.blur();
    } catch (error) {
      if (error instanceof AppError)
        return Alert.alert("Nova pessoa", error.message);

      Alert.alert("Nova pessoa", "Não foi possível adicionar.");
      console.log(error);
    }
  }

  function handleRemovePlayer(player: PlayerStorageDTO) {}

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  useFocusEffect(useCallback(() => {}, []));

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Highlight
          title={group}
          subtitle="adicione a galera e separe os times"
        />

        <Form>
          <Input
            inputRef={inputRef}
            onChangeText={setNewPlayerName}
            value={newPlayerName}
            placeholder="Nome do participante"
            autoCorrect={false}
            onSubmitEditing={handleAddPlayer}
            returnKeyType="done"
          />
          <ButtonIcon icon="add" onPress={handleAddPlayer} />
        </Form>

        <HeaderList>
          <FlatList
            data={TEAMS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Filter
                title={item}
                isActive={item === team}
                onPress={() => setTeam(item)}
              />
            )}
            horizontal
          />
          <PlayersCounter>{players.length}</PlayersCounter>
        </HeaderList>

        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          contentContainerStyle={[
            { paddingBottom: 100 },
            !players.length && { flex: 1 },
          ]}
          ListEmptyComponent={() => (
            <EmptyList message="Não há pessoas nesse time" />
          )}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />

        <Button description="Remover turmar" type="SECONDARY" />
      </Content>
    </Container>
  );
}
