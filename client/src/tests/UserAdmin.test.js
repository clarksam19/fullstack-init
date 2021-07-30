import React from "react";
import "@testing-library/react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserAdmin from "../components/UserAdmin";

describe("Toggling between login and signup forms", () => {
  let component;

  beforeEach(() => {
    component = render(<UserAdmin />);
  });
  test("Displays login form and hides signup form on login button click", () => {
    const loginButton = component.getByTestId("btn-login");
    expect(loginButton).toHaveTextContent("login");
    fireEvent.click(loginButton);
    const loginForm = component.getByTestId("form-login");
    const signupForm = component.getByTestId("form-signup");
    expect(loginForm).toBeVisible();
    expect(signupForm).not.toBeVisible();
  });
  test("Displays signup form and hides login form on signup button click", () => {
    const signupButton = component.getByTestId("btn-signup");
    expect(signupButton).toHaveTextContent("signup");
    fireEvent.click(signupButton);
    const loginForm = component.getByTestId("form-login");
    const signupForm = component.getByTestId("form-signup");
    expect(loginForm).not.toBeVisible();
    expect(signupForm).toBeVisible();
  });
});
