import React from "react";
import styled from "@emotion/styled";

const SpinnerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding: 20px 0;

  @keyframes spinner-border {
    to {
      transform: rotate(360deg) /* rtl:ignore */;
    }
  }

  .spinner-border {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 7px solid #ff862c;
    border-radius: 50%;
    border-right-color: rgba(0, 0, 0, 0);
    animation: 0.75s linear infinite spinner-border;
    vertical-align: -0.125em;
  }
`;

function Spinner() {
  return (
    <SpinnerBox>
      <div role="status" className="spinner-border">
        <span className="hiddenZoneV">Loading...</span>
      </div>
    </SpinnerBox>
  );
}

export default Spinner;
