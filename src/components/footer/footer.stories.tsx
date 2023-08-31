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
      <div class="bg-gray-500">
        <Footer />
      </div>
    );
  },
};

export const Normal: Story = {
  render: () => {
    return <Footer translucid={false} />;
  },
};
