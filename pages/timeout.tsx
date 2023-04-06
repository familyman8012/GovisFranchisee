import React from "react";

import { ExclamationTriangleFill } from "@emotion-icons/bootstrap/ExclamationTriangleFill";

const NotAccess = () => {
  return (
    <section className="error-template">
      <ExclamationTriangleFill />
      <h2>응답시간이 초과되었습니다.</h2>
      <p className="mb-3">이용에 불편을 드려 죄송합니다.</p>
    </section>
  );
};

export default NotAccess;
