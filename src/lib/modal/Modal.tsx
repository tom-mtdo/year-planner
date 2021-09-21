import { Button } from "@material-ui/core";
import React from "react";
import { StyledH2 } from "../styles";
import {
  StyledModal,
  StyledModalBox,
  StyledModalHeader,
  StyledModalBody,
  StyledModalFooter,
} from "./Modal.style";

export interface IModal {
  isShown?: boolean;
  onCloseClick?: any;
  [key: string]: any;
}

export default function Modal(props: IModal) {
  const { isShown, onCloseClick } = props;
  return !isShown ? (
    <></>
  ) : (
    <StyledModal>
      <StyledModalBox>
        <StyledModalHeader>
          <StyledH2>Modal title</StyledH2>
        </StyledModalHeader>
        <StyledModalBody>Modal body
          <div onDoubleClick={()=>alert('double click')}>H aha here</div>
        </StyledModalBody>
        <StyledModalFooter>
          <Button variant="contained" onClick={onCloseClick}>
            Close
          </Button>
          <Button variant="contained" onDoubleClick={()=>alert('double click')}>
            Ha ha
          </Button>
        </StyledModalFooter>
      </StyledModalBox>
    </StyledModal>
  );
}

Modal.defaultProps = {
  isShown: true,
  onCloseClick: () => alert("Close modal"),
};
