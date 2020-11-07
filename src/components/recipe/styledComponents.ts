import styled from "styled-components";

export const RecipeWrapper = styled.div`
    display: flex;
    width: 100%;
    margin: 24px 0;
`;
export const Recipe = styled.div`
    width: 100%;
`;


export const RecipeContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    div {
        margin-bottom: 5px;
    }
`;

export const Duration = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-left: 5px;
    }
`;

export const Name = styled.span`
    color: #0000FF;
    font-weight: bold;
`
