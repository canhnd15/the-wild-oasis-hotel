import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 36px;
      color: var(--color-brand-900);
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 24px;
      color: var(--color-brand-700);
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 20px;
      color: var(--color-brand-500);
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 24px;
      font-weight: 600;
      color: var(--color-brand-600);
      text-align: center;
    `}
`;

Heading.defaultProps = {
  type: "h1",
};

export default Heading;
