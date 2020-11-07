import styled from 'styled-components';

export const Header = styled.div<{ img: string }>`
    display: flex;
    flex-direction: column;
`;

export const Duration = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-left: 5px;
    }
`;

export const Image = styled.div<{ img: string }>`
    background-image: ${({ img }) => `url(${img});`}
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 200px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
`;

export const ListOfIngredients = styled.ul`
    li {
        margin-bottom: 5px;
    }
`

export const ScoreAndDuration = styled.div`
    background-color: #FF00FF;
    display: flex;
    height: 64px;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 0 30px;
    font-size: 15px;
    color: #FFFFFF;
    letter-spacing: -0.36px;
`;


export const Title = styled.span`
    font-size: 24px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 32px;
    margin: 20px;
`;

export const Details = styled.div`
    margin: 30px;
    div {
        margin-bottom: 30px;
    }
`;

export const DetailsText = styled.p`
    font-size: 16px;
    color: #554D44;
    letter-spacing: 0;
    line-height: 24px;
`

export const DetailsTitle = styled.span`
    font-size: 20px;
    color: #0000FF;
    letter-spacing: 0;
`

export const RatingSection = styled.div`
    background: #0000FF;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    display: flex;
    height: 160px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `