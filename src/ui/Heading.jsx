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
`;

Heading.defaultProps = {
  type: "h1",
};

export default Heading;
