import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;

export const Container = styled.View`
  margin-left: 15px;
  margin-bottom: 25px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Nome = styled.Text`
  font-size: 19px;
  color: #fff;
  font-style: italic;
`;
export const ButtonAdd = styled.TouchableOpacity`
  padding-right: 8px;
`;

export const List = styled.FlatList.attrs({
  marginHorizontal: 15,
})`
  /* padding-top: 15px; */
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-left: 8px;
  margin-right: 8px;
`;
