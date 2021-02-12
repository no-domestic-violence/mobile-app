import { Colors } from '../index';
import styled from 'styled-components/native'

export const StyledButton = styled.TouchableOpacity`
    background-color: ${Colors.darkBlue};
    borderRadius: 20px;
    overflow: hidden;
    marginTop: 40px;
    fontWeight: 600;
`;

export const StyledButtonText = styled.Text`
    paddingLeft: 50px;
    paddingRight: 50px;
    paddingTop: 10px;
    paddingBottom: 10px;
    color: #fff;
    fontSize: 14px;
    overflow: hidden;
    textAlign: center;
    fontWeight: 600;
`;