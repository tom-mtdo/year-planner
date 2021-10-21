import React from "react";
import Modal from "../../lib/modal/Modal";
import { BOOLEAN_STR_VALUES } from "../../data-lib/util/constant";
import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import useYearPlanner from "../YearPlanner/useYearPlanner";

export const dayModalDataPath = 'runtime.dayModal';

function DayModal(props: any) {
  const notePath = `${dayModalDataPath}.dayInfo.note`;
  const { getCompValue, setCompValue } = useContext(DataContext);
  const modalData = getCompValue ? getCompValue(dayModalDataPath) : {};
  const {updateCalendarAndContent} = useYearPlanner();

  const onConfirm = () => {
    saveData();
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  }

  const closeModal = () => {
    if (setCompValue) {
      // close modal and clear data   
      // clean value only otherwise react will complain in console
      setCompValue(dayModalDataPath, {
        isShown: BOOLEAN_STR_VALUES.FALSE,
        note: '',
        dayInfo: {}
      });
    }
  }

  const saveData = () => {
    if (updateCalendarAndContent) {
      updateCalendarAndContent(modalData?.dayInfo);
    }
  };

  return (
    <Modal
      isShown={BOOLEAN_STR_VALUES.TRUE === modalData.isShown}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <TextField
        compId={"runtime-dayModal-note"}
        dataPath={notePath}
        label={"Notes"}
      />
    </Modal>
  );
}

export default DayModal;
