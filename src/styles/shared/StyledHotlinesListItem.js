import styled from 'styled-components/native';
import { Colors } from '../index';

export const StyledHotlinesListItem = styled.TouchableOpacity`
  padding-vertical: 20px;
  padding-horizontal: 20px;
  flex-shrink: 1;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${Colors.secondary};
  border-radius: 30px;
`;
