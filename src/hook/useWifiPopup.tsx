import { confirmModalStore } from "MobxFarm/store";
import { set } from "lodash";
import { useEffect, useMemo, useState } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
const isCSR = typeof window !== "undefined";
// @ts-ignore
// const connection = (isCSR ? window.navigator?.connection : null) as {
//   type: string;
// } | null;

const isMobileAgent = isCSR
  ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  : false;

const useWifiPopup = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const isConfirmedStorage = JSON.parse(
      window.sessionStorage.getItem("isFQSVideoConfirmed") ?? "false"
    ) as boolean;

    if (isMobileAgent && !isConfirmedStorage) {
      confirmModalStore.openModal({
        title: "Wi-Fi 연결 권장",
        content: (
          <p>
            동영상 재생 시,
            <br />
            데이터 소진이 많을 수 있습니다.
            <br />
            WI-FI 연결된 상태에서 플레이를 권장합니다.
          </p>
        ),
        // showCloseButton: false,
        // showCancelButton: false,
        onFormSubmit: () => {
          confirmModalStore.isOpen = false;
          setIsConfirmed(true);
        },
        onClose: () => {
          confirmModalStore.isOpen = false;
        },
        onCancel: () => {
          confirmModalStore.isOpen = false;
        },
      });
    } else {
      setIsConfirmed(true);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isConfirmed) return;

    window.sessionStorage.setItem(
      "isFQSVideoConfirmed",
      JSON.stringify(isConfirmed)
    );
  }, [isConfirmed]);

  return [isConfirmed, setIsConfirmed] as [
    typeof isConfirmed,
    typeof setIsConfirmed
  ];
};

export default useWifiPopup;
