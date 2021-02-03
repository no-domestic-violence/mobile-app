import { Colors } from '../index';
import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
  background-color: ${Colors.darkBlue};
  border-radius: 20px;
  overflow: hidden;
  margin-top: 40px;
  font-weight: 600;
`;

export const StyledButtonText = styled.Text`
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #fff;
  font-size: 14px;
  overflow: hidden;
  text-align: center;
  font-weight: 600;
`;
