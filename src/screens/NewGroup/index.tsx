import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";

export default function NewGroup() {
  const [group, setGroup] = useState("");

  const { navigate } = useNavigation();

  async function handleCreate() {
    try {
      if (!group.trim())
        return Alert.alert("Novo grupo", "Informe o nome da turma.");

      await groupCreate(group);

      navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError)
        return Alert.alert("Novo grupo", error.message);

      Alert.alert("Novo grupo", "Não foi possível criar um novo grupo.");
      console.log(error);
    }
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
