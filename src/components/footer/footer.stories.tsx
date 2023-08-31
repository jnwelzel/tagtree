import type { Meta, StoryObj } from "storybook-framework-qwik";
import Footer from "./footer";

const meta: Meta = {
  component: Footer,
};

type Story = StoryObj;

export default meta;

export const Primary: Story = {
  render: () => {
    return <Footer />;
  },
};
