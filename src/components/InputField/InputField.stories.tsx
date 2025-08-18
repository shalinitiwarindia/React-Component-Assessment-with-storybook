import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react-webpack5";
import { InputField, InputFieldProps } from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
} as Meta;

const Template: StoryFn<InputFieldProps> = (args) => {
  const [value, setValue] = useState(args.value || "");
  return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

// Variants
export const Outlined = Template.bind({});
Outlined.args = {
  label: "Name (Outlined)",
  placeholder: "Enter your name",
  helperText: "Helper text",
  variant: "outlined",
  size: "md",
  clearable: true,
};

export const Filled = Template.bind({});
Filled.args = {
  label: "Password (Filled)",
  placeholder: "Enter password",
  type: "password",
  helperText: "Password must be 6+ characters",
  variant: "filled",
  size: "md",
  clearable: true,
};

export const Ghost = Template.bind({});
Ghost.args = {
  label: "Email (Ghost)",
  placeholder: "Enter your email",
  variant: "ghost",
  size: "sm",
};

// Sizes
export const Small = Template.bind({});
Small.args = { ...Outlined.args, size: "sm", label: "Small Input" };

export const Medium = Template.bind({});
Medium.args = { ...Outlined.args, size: "md", label: "Medium Input" };

export const Large = Template.bind({});
Large.args = { ...Outlined.args, size: "lg", label: "Large Input" };

// Invalid
export const Invalid = Template.bind({});
Invalid.args = {
  label: "Invalid Input",
  placeholder: "Enter invalid value",
  invalid: true,
  errorMessage: "This field is invalid",
};

// Disabled
export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Input",
  placeholder: "Cannot type here",
  disabled: true,
};
