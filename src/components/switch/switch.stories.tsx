import type { Meta, StoryObj } from "storybook-framework-qwik";
import Switch from "./switch";

const meta: Meta = {
  component: Switch,
};

type Story = StoryObj;

export default meta;

export const Primary: Story = {
  render: () => {
    return <Switch />;
  },
};
