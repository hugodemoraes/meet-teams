import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";

export default function NewGroup() {
  const [group, setGroup] = useState("");

  const { navigate } = useNavigation();

  function handleCreate() {
    navigate("players", { group });
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="crie uma turma para adicionar pessoas"
        />
        <Input
          placeholder="Nome da turma"
          value={group}
          onChangeText={setGroup}
        />
        <Button
          description="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreate}
        />
      </Content>
    </Container>
  );
}
