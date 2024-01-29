import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonTh = ({
  rowLength = 10,
  colLength,
}: {
  rowLength?: number;
  colLength: number;
}) => {
  return (
    <>
      {Array.from({ length: rowLength }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: colLength }).map((temp, thIndex) => (
            <td key={thIndex}>
              <div className="wrap_skeleton">
                <Skeleton width="30%" baseColor="#fcfcfc" />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default SkeletonTh;
