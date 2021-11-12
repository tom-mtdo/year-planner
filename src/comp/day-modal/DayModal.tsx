import React from "react";
import Modal from "../../lib/modal/Modal";
import { BOOLEAN_STR_VALUES } from "../../data-lib/util/constant";
import TextField from "../../data-lib/adapter/MU-adapter/textField-old/TextField";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import useYearPlanner from "../1-YearPlanner/useYearPlanner";
import { paths } from '../../util/constant';

function DayModal(props: any) {
  const { getValue, setValue } = useContext(DataContext);
  const modalData = getValue ? getValue(paths.temp.dayModal._path) : {};
  const {saveDate} = useYearPlanner();

  const onConfirm = () => {
    saveData();
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  }

  const closeModal = () => {
    if (setValue) {
      // close modal and clear data   
      // clean value only otherwise react will complain in console
      setValue(paths.temp.dayModal._path, {
        isShown: BOOLEAN_STR_VALUES.FALSE,
        dayInfo: {}
      });
    }
  }

  const saveData = () => {
    if (saveDate) {
      saveDate(modalData?.dayInfo);
    }
  };

  return (
    <Modal
      isShown={BOOLEAN_STR_VALUES.TRUE === modalData?.isShown}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <TextField
        compId={"runtime-dayModal-note"}
        dataPath={paths.temp.dayModal.note}
        label={"Notes"}
      />
    </Modal>
  );
}

export default DayModal;
