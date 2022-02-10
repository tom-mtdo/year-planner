import React, { useState } from "react";
import Modal from "../../lib/modal/Modal";
import { BOOLEAN_STR_VALUES } from "../../data-lib/util/constant";
import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import { useContext, useEffect } from 'react';
import { DataContext } from "../../data-lib/context/DataProvider";
import { paths } from "../../util/constant";
import useComp, { IComp } from "../../data-lib/hook/useComp";
import useCommon from '../../hook/useCommon';
import useForm from "../../data-lib/hook/useForm";
import { pathToId } from "../../data-lib/util/util";
import useOutBound from "../../hook/useOutBound";

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
  const { saveData } = useOutBound();
  const modalData = getValue ? getValue(paths.temp.dayModal._path) : {};
  const { saveDate } = useCommon();
  const compToFocus = pathToId(paths.temp.dayModal.note);
  useForm({compToFocus});

  const onConfirm = () => {
    saveNote();
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
  
  // --- wait for saveDate completed then save user data
  // path to where is the data saved, put in state so it will trigger render when change
  const [notePath, setNotePath] = useState<string | undefined>(undefined);
  const noteValue = getValue && (undefined !== notePath) ? getValue(notePath) : '';

  // When save to context complete -> 
  // call a function to get user data from context and save to local storage
  useEffect(() => {
    saveData();
  }, [noteValue]);

  const saveNote = () => {
    if (saveDate) {
      const path = saveDate(modalData?.dayInfo);
      setNotePath(path);
    }
  };
  // --- end of wait for saveDate completed then save user data

  const noteDate: Date = modalData?.dayInfo?.date || '';
  const title = noteDate ? `${noteDate.toISOString().substring(0, 10)}` : '';

  return (
    <Modal
      isShown={BOOLEAN_STR_VALUES.TRUE === modalData?._isShown}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={title}
    >
        <TxtDayNote />
    </Modal>
  );
}

export default DayModal;

