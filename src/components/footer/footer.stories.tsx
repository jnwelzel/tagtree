import type { Meta, StoryObj } from "storybook-framework-qwik";
import Footer from "./footer";

const meta: Meta = {
  component: Footer,
};

type Story = StoryObj;

export default meta;

export const Translucid: Story = {
  render: () => {
    return (
      <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[1500px]">
        <Footer />
      </div>
    );
  },
};

export const Normal: Story = {
  render: () => {
    return (
      <div class="w-[1500px]">
        <Footer translucid={false} />
      </div>
    );
  },
};
