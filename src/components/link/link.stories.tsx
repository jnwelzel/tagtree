import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Link } from "./link";

const meta: Meta = {
  component: Link,
};

type Story = StoryObj;

export default meta;

export const Primary: Story = {
  render: () => {
    return <Link href="/">Some link</Link>;
  },
};
