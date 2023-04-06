import Head from "next/head";

import { PlusLg } from "@emotion-icons/bootstrap/PlusLg";
import { Alarm } from "@emotion-icons/bootstrap/Alarm";
import { Button, IconButton } from "ComponentsFarm/elements/Button";
import { PALLETES } from "LibFarm/color";
import { Examples } from "ComponentsFarm/pageComp/buttonExample/style";

export default function ButtonExample() {
  const colors = Object.entries(PALLETES).filter(
    ([key]) =>
      ![
        "white",
        "download-3",
        "success-2",
        "error-2",
        "warning-2",
        "typo-5",
        "typo-6",
        "typo-7",
        "other-2",
        "p-green-3",
        "p-pink-2",
        "p-orange-2",
      ].includes(key)
  );

  return (
    <Examples>
      <Head>
        <title>Button Examples</title>
      </Head>
      <h2>Default Buttons</h2>
      <ul>
        {colors.map(([key, color], i) => (
          <li key={i}>
            <Button color={color} textColor={key === "white" ? "black" : undefined}>
              {key}
            </Button>
          </li>
        ))}
      </ul>
      <h2>Clear Buttons</h2>
      <ul>
        {colors.map(([key, color], i) => (
          <li key={i}>
            <Button color={color} clear>
              {key}
            </Button>
          </li>
        ))}
      </ul>
      <h2>Outline Buttons</h2>
      <ul>
        {colors.map(([key, color], i) => (
          <li key={i}>
            <Button color={color} outline>
              {key}
            </Button>
          </li>
        ))}
      </ul>
      <h2>icon Buttons</h2>
      <ul>
        <li>
          <IconButton color={PALLETES["success-1"]} icon={<PlusLg />} />
        </li>
        <li>
          <IconButton icon={<PlusLg />} clear />
        </li>
      </ul>
      <h2>Small Buttons</h2>
      <ul>
        <li>
          <IconButton size="sm" icon={<PlusLg />} />
        </li>
        <li>
          <IconButton size="sm" icon={<PlusLg />} clear />
        </li>
        <li>
          <Button size="sm">small button</Button>
        </li>
        <li>
          <Button size="sm" clear>
            small clear button
          </Button>
        </li>
        <li>
          <Button size="sm" outline>
            small clear button
          </Button>
        </li>
      </ul>
      <h2>Icon Text Buttons</h2>
      <ul>
        <li>
          <Button size="sm" leftIcon={<Alarm />}>
            {"Icon Text"}
          </Button>
        </li>
        <li>
          <Button size="sm" rightIcon={<Alarm />}>
            {"Icon Text"}
          </Button>
        </li>
      </ul>
      <h2>Disabled Buttons</h2>
      <ul>
        <li>
          <IconButton disabled icon={<PlusLg />} clear />
        </li>
        <li>
          <Button disabled>default disable</Button>
        </li>
        <li>
          <Button disabled clear>
            clear disable
          </Button>
        </li>
        <li>
          <Button disabled outline>
            outline disable
          </Button>
        </li>
      </ul>
    </Examples>
  );
}
