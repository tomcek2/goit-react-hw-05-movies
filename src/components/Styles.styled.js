import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const List = styled.div`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 30px;
`;

export const ListLink = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;
`;

export const Title = styled.p`
  inline-size: 200px;
  overflow-wrap: break-word;
`;

export const FormInput = styled.input`
  border: 3px solid #000000;
  margin-left: 20px;
  margin-top: 10px;
  min-width: 300px;
`;

export const FormButton = styled.button`
  border: 3px solid #000000;
`;

export const Container = styled.div`
  display: flex;
  padding: 0 20px;
  gap: 20px;
  border-bottom: 3px solid rgba(151, 151, 151, 0.31);
`;

export const BackLink = styled(Link)`
  font-size: 12px;
  text-decoration: none;
  color: black;
`;

export const Genres = styled.div`
  display: flex;
  gap: 10px;
`;

export const AddInfo = styled.ul`
  border-bottom: 3px solid rgba(151, 151, 151, 0.31);
  padding-bottom: 15px;

  > h3 {
    margin 5px;
  }
`;

export const CastList = styled.li`
  > p {
    margin: 5px 0;
  }
`;

export const Review = styled.li`
  border-bottom: 3px solid rgba(151, 151, 151, 0.31);
`;
