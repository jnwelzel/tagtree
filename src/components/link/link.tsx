import { Slot, component$ } from "@builder.io/qwik";
import type { LinkProps as QwikLinkProps } from "@builder.io/qwik-city";
import { Link as QwikLink } from "@builder.io/qwik-city";

interface LinkProps {
  underline?: boolean;
}

type Props = QwikLinkProps & LinkProps;

export const Link = component$<Props>((props) => {
  const { class: classProp, underline } = props;

  return (
    <QwikLink class={`${underline ? "underline" : ""} ${classProp}`} {...props}>
      <Slot></Slot>
    </QwikLink>
  );
});
