import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { AddressBar, BrowserNavigationBfButtonGroup } from "../components";

interface BrowserBarProps {
  history?: any;
}

// FIXME: handling xl xs size default xl
export function BrowserBar() {
  return (
    <Wrapper>
      <BrowserNavigationBfButtonGroupWrap>
        <BrowserNavigationBfButtonGroup
          forwardEnable={true}
          backEnable={true}
          handleClick={(isBack) => {
            console.log(isBack);
          }}
        />
      </BrowserNavigationBfButtonGroupWrap>
      <AddressBarWrap>
        <AddressBar
          address="loading..."
          icon={
            <img
              src="https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/76df/255d/0979e7ab815d6ca528f8d9dcd1781acf"
              alt="icon"
            />
          }
          onRefreshClick={() => console.log("click refresh")}
        />
      </AddressBarWrap>
      <Trailing>
        <IconsMdiIosShare
          src="https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/da99/bb53/d07b48d9862132562382bf46a02ca50a"
          alt="image of IconsMdiIosShare"
        ></IconsMdiIosShare>
        <IconsMdiAdd
          src="https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/e318/b488/9d87f48c0287cd06fb9565de35a44892"
          alt="image of IconsMdiAdd"
        ></IconsMdiAdd>
      </Trailing>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 351px;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  padding: 12px 16px;
`;

const BrowserNavigationBfButtonGroupWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex: none;
  gap: 0;
  box-sizing: border-box;
`;

const AddressBarWrap = styled.div`
  min-width: min-content;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  background-color: rgba(216, 215, 216, 1);
  border-radius: 6px;
  position: relative;
`;

const Trailing = styled.div`
  width: 52px;
  height: 20px;
  position: relative;
`;

const IconsMdiIosShare = styled.img`
  object-fit: cover;
  position: absolute;
  left: 0px;
  top: 0px;
  right: 32px;
  bottom: 0px;
`;

const IconsMdiAdd = styled.img`
  object-fit: cover;
  position: absolute;
  left: 32px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
`;