import React from "react";
import useComp from "../../data-lib/hook/useComp";
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
    // const activeDate = modalData?.dayInfo?.date ?? undefined;
    // if( !activeDate) { return; }
    // const year = activeDate.getFullYear();
    // const month = activeDate.getMonth() + 1; // because month is 0 - 11
    // const date = activeDate.getDate(); // 1 - 31

    // const strYear = '' + year;
    // const strMonth = month < 10 ? '0' + month: '' + month;
    // const strDate = date < 10 ? '0' + date : '' + date;

    // const path = `content.${strYear}.${strYear}${strMonth}${strDate}.note`;

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
