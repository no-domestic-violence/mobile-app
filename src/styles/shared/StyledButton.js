import { Colors } from '../index';
import styled from 'styled-components/native'

export const StyledButton = styled.TouchableOpacity`
    background-color: ${Colors.darkBlue};
    borderRadius: 20;
    overflow: hidden;
    marginTop: 40;
    fontWeight: 600;
`;

export const StyledButtonText = styled.Text`
    paddingLeft: 50;
    paddingRight: 50;
    paddingTop: 10;
    paddingBottom: 10;
    color: #fff;
    fontSize: 14;
    overflow: hidden;
    textAlign: center;
    fontWeight: 600;
`;