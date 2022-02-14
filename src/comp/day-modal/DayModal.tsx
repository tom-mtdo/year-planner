import React, { useState } from "react";
import Modal from "../../lib/modal/Modal";
import { BOOLEAN_STR_VALUES } from "../../data-lib/util/constant";
import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import { useContext, useEffect } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { names, paths } from "../../util/constant";
import useComp, { IComp } from "../../data-lib/hook/useComp";
import useCommon from "../hook/useCommon";
import useForm from "../../data-lib/hook/useForm";
import { pathToId, getParentPath } from '../../data-lib/util/util';
import useOutBound from "../hook/useOutBound";
import { getPathsInUserData, getStrDate, IPathsInUserData } from "../../util/util";
import { isEmpty } from '../../data-lib/util/validation';

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
    setCompRef,
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
  const { getValue, setValue, removeValue } = useContext(DataContext);
  const modalData = getValue ? getValue(paths.temp.dayModal._path) : {};
  const compToFocus = pathToId(paths.temp.dayModal.note);
  useForm({ compToFocus });

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

  // // example of --- wait for saveDate completed then save user data
  // // path to where is the data saved, put in state so it will trigger render when change
  // const [notePath, setNotePath] = useState<string | undefined>(undefined);
  // const noteValue =
  //   getValue && undefined !== notePath ? getValue(notePath) : "";

  // // When save to context complete ->
  // // call a function to get user data from context and save to local storage
  // useEffect(() => {
  //   saveData();
  // }, [noteValue]);
  // // --- end of wait for saveDate completed then save user data

  // const userData = {
  //   year2022: {            // yearKey
  //     date20220214: {      // dateKey
  //       note: 'Buy flowers'
  //     }
  //   },
  //   year2023: {
  //     date20230214: {
  //       note: 'Should buy flowers'
  //     }
  //   }
  // }

  const saveNote = () => {
    if(!setValue || !removeValue) { return; }
    
    const targetDate = modalData?.dayInfo?.date;
    if (!targetDate || !(targetDate instanceof Date)) {
      console.log(`Error: can't find date to save note`);
      return;
    }

    // const year = targetDate.getFullYear();
    // const strDate = getStrDate(targetDate);
    // const yearKey = `${names.year}${year}`;
    // const dateKey = `date${strDate}`
    
    // const notePath = `${yearKey}.${dateKey}.note`;

    const subPaths: IPathsInUserData = getPathsInUserData(targetDate);
    // the second condition is for typescript
    if(isEmpty(subPaths?.notePath) || undefined === subPaths.notePath) { 
      console.log("Error: can't find path to save note");
      return; 
    }

    const note = modalData?.dayInfo?.note || undefined;
    if (isEmpty(note)) {
      // remove at grand parent level because user data for a date is only note at the moment
      // if user data for a date is more than a note then need to remove at parent level
      // if note is object, now it is string, then need to remove at notePath level
      // Run and look at context for more details
      removeValue(getParentPath(getParentPath(subPaths.notePath)), subPaths.dateKey);
    } else {
      setValue(subPaths.notePath, note);
    }
  };

  const noteDate: Date = modalData?.dayInfo?.date || "";
  const title = noteDate ? `${noteDate.toISOString().substring(0, 10)}` : "";

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
