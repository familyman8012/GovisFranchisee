import React from "react";
import { useRouter } from "next/router";

import { ExclamationTriangleFill } from "@emotion-icons/bootstrap/ExclamationTriangleFill";

import { Button } from "ComponentsFarm/elements/Button";
import { PALLETES } from "LibFarm/color";

const NotAccess = () => {
  const router = useRouter();

  return (
    <section className="error-template">
      <ExclamationTriangleFill />
      <h2>
        잘못된 경로이거나 <br />
        비정상적 접근입니다.
      </h2>
      <p className="mb-3">이용에 불편을 드려 죄송합니다.</p>
      <Button size="sm" onClick={() => router.replace("/")} color={PALLETES["primary-2"]} className="weight-500">
        홈으로 이동
      </Button>
    </section>
  );
};

export default NotAccess;
