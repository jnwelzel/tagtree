import type { Meta, StoryObj } from "storybook-framework-qwik";
import * as Icons from "./index";

const meta: Meta = {
  title: "Icons",
};

type Story = StoryObj;

export default meta;

export const All: Story = {
  render: () => {
    const icons = Object.values(Icons);

    return (
      <div class="flex">
        {icons.map((Icon, index) => (
          <div key={index} class="w-6 h-6 flex items-center">
            <Icon />
          </div>
        ))}
      </div>
    );
  },
};
