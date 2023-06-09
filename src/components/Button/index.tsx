import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyleProps, Container, Description } from "./styles";

type Props = TouchableOpacityProps & {
  description: string;
  type?: ButtonTypeStyleProps;
};

export function Button({ description, type = "PRIMARY", ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Description>{description}</Description>
    </Container>
  );
}
