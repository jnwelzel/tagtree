import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Link } from "./link";
import { QwikCityMockProvider } from "@builder.io/qwik-city";

const meta: Meta = {
  component: Link,
};

type Story = StoryObj;

export default meta;

export const Default: Story = {
  render: () => {
    return (
      <QwikCityMockProvider>
        <Link href="/">Some link</Link>
      </QwikCityMockProvider>
    );
  },
};
