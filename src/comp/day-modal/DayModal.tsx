import React from "react";
import Modal from "../../lib/modal/Modal";
import { BOOLEAN_STR_VALUES } from "../../data-lib/util/constant";
import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { paths } from "../../util/constant";
import useComp, { IComp } from "../../data-lib/hook/useComp";
import useCommon from '../../hook/useCommon';
import useForm from "../../data-lib/hook/useForm";
import { pathToId } from "../../data-lib/util/util";

const TxtDayNote = () => {
  const props: IComp = {
    id: pathToId(paths.temp.dayModal.note),
    dataPath: paths.temp.dayModal.note,
    label: "Note",
  };
  const {
    compValue,
    compId,
    compDataPath,
    compLabel,
    compError,
    compOnBlur,
    compOnChangeInForm,
    setCompRef
  } = useComp(props);

  return (
    <TextField
      compName={"Note"}
      compId={compId}
      compDataPath={compDataPath}
      setCompRef={setCompRef}
      compValue={compValue}
      compLabel={compLabel}
      compOnChange={compOnChangeInForm}
      compOnBlur={compOnBlur}
      compError={compError}
    />
  );
};

function DayModal(props: any) {
  const { getValue, setValue } = useContext(DataContext);
  const modalData = getValue ? getValue(paths.temp.dayModal._path) : {};
  const { saveDate } = useCommon();
  const compToFocus = pathToId(paths.temp.dayModal.note);
  useForm({compToFocus});


  const onConfirm = () => {
    saveData();
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };

  const closeModal = () => {
    if (setValue) {
      // close modal and clear data
      // clean value only otherwise react will complain in console
      setValue(paths.temp.dayModal._path, {
        _isShown: BOOLEAN_STR_VALUES.FALSE,
        dayInfo: {},
      });
    }
  };

  const saveData = () => {
    if (saveDate) {
      saveDate(modalData?.dayInfo);
    }
  };

  return (
    <Modal
      isShown={BOOLEAN_STR_VALUES.TRUE === modalData?._isShown}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
        <TxtDayNote />
    </Modal>
  );
}

export default DayModal;

