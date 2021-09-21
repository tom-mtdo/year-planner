import React from "react";
import useComp from "../../data-lib/hook/useComp";
import Modal from "../../lib/modal/Modal";
import { BOOLEAN_STR_VALUES } from '../../data-lib/util/constant';


function DayModal(props: any) {
    const dataPath = 'settings.isDayModalShown';
    const { compValue, onChange } = useComp({ dataPath });

    const onCloseClick = () => {
        const compEvent = {
            target: {
              dataset: {
                dataPath,
              },
              value: BOOLEAN_STR_VALUES.FALSE,
            },
            event: {}
          };
        onChange(compEvent);
    };

    return (
        <Modal isShown={BOOLEAN_STR_VALUES.TRUE === compValue} onCloseClick={onCloseClick}>
            <p>Modal content here</p>
        </Modal>
    )
}

export default DayModal;