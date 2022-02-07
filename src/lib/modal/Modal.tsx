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
  onConfirm?: any;
  [key: string]: any;
}

export default function Modal(props: IModal) {
  const { isShown, onConfirm, onCancel, children } = props;
  return !isShown ? (
    <></>
  ) : (
    <StyledModal>
      <StyledModalBox>
        <form onSubmit={(event) => event.preventDefault()}>
          <StyledModalHeader>
            <StyledH2>Modal title</StyledH2>
          </StyledModalHeader>
          <StyledModalBody>{children}</StyledModalBody>
          <StyledModalFooter>
            <Button variant="contained" onClick={onConfirm} type={'submit'}>
              Confirm
            </Button>
            <Button variant="contained" onClick={onCancel}>
              Cancel
            </Button>
          </StyledModalFooter>
        </form>
      </StyledModalBox>
    </StyledModal>
  );
}

Modal.defaultProps = {
  isShown: true,
  onConfirm: () => alert("Close modal"),
};
