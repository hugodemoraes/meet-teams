import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { EmptyList } from "@components/EmptyList";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";

import { Container, Content, Form, HeaderList, PlayersCounter } from "./styles";
import { PlayerCard } from "@components/PlayerCard";

export default function Players() {
  const TEAMS = ["Time A", "Time B"];

  const [team, setTeam] = useState(TEAMS[0]);
  const [players, setPlayers] = useState<string[]>(["Hugo de Moraes"]);

  function handleRemovePlayer(player: string) {}

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Highlight
          title="Nome da turma"
          subtitle="adicione a galera e separe os times"
        />

        <Form>
          <Input placeholder="Nome do participante" autoCorrect={false} />
          <ButtonIcon icon="add" />
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
          keyExtractor={(item) => item}
          contentContainerStyle={[
            { paddingBottom: 100 },
            !players.length && { flex: 1 },
          ]}
          ListEmptyComponent={() => (
            <EmptyList message="Não há pessoas nesse time" />
          )}
          renderItem={({ item }) => (
            <PlayerCard name={item} onRemove={() => handleRemovePlayer(item)} />
          )}
          showsVerticalScrollIndicator={false}
        />

        <Button description="Remover turmar" type="SECONDARY" />
      </Content>
    </Container>
  );
}
