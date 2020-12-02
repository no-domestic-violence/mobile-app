import { Colors } from '../index';
import styled from 'styled-components/native'

export const StyledHotlinesListItem = styled.TouchableOpacity`
    paddingVertical: 20;
    paddingHorizontal: 20;
    flexShrink: 1;
    flexDirection: row;
    justifyContent: space-between;
    backgroundColor: ${Colors.secondary};
    borderRadius: 30;
`;
