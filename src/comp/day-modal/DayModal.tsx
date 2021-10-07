import React from "react";
import useComp from "../../data-lib/hook/useComp";
import Modal from "../../lib/modal/Modal";
import { BOOLEAN_STR_VALUES } from "../../data-lib/util/constant";
import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";

function DayModal(props: any) {
  const dataPath = "runtime.dayModal";
  const isShownPath = `${dataPath}.isShown`;
  // const { compValue, compOnChange } = useComp({ dataPath: isShownPath });
  const { getCompValue, setCompValue } = useContext(DataContext);
  const modalData = getCompValue ? getCompValue(dataPath) : {};

  const onCloseClick = () => {
    saveData();
    if (setCompValue) {
      setCompValue(isShownPath, BOOLEAN_STR_VALUES.FALSE);
    }
  };

  const saveData = () => {
    const activeDate = modalData?.dayInfo?.date ?? undefined;
    if( !activeDate) { return; }
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth() + 1; // because month is 0 - 11
    const date = activeDate.getDate(); // 1 - 31

    const strYear = '' + year;
    const strMonth = month < 10 ? '0' + month: '' + month;
    const strDate = date < 10 ? '0' + date : '' + date;

    const path = `content.${strYear}.${strYear}${strMonth}${strDate}.note`;
    if (setCompValue) {
      setCompValue(path, modalData?.note);
    }
  };

  return (
    <Modal
      isShown={BOOLEAN_STR_VALUES.TRUE === modalData.isShown}
      onCloseClick={onCloseClick}
    >
      <TextField
        compId={"runtime-dayModal-note"}
        dataPath={"runtime.dayModal.note"}
        label={"Notes"}
      />
    </Modal>
  );
}

export default DayModal;
