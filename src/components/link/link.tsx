import { Slot, component$ } from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";
import { QwikCityMockProvider, Link as QwikLink } from "@builder.io/qwik-city";

export const Link = component$<LinkProps>((props) => {
  const { class: classProp } = props;

  return (
    <QwikCityMockProvider>
      <QwikLink class={`underline ${classProp}`} {...props}>
        <Slot></Slot>
      </QwikLink>
    </QwikCityMockProvider>
  );
});
