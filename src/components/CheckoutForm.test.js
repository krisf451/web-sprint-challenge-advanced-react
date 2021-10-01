import React from "react";
import MutationObserver from "mutationobserver-shim";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
  render(<CheckoutForm />);
});

test("shows success message on submit with form details", async () => {
  render(<CheckoutForm />);
  const firstName = screen.getByLabelText(/first name:/i);
  const lastName = screen.getByLabelText(/last name:/i);
  const address = screen.getByLabelText(/address/i);
  const city = screen.getByLabelText(/city:/i);
  const state = screen.getByLabelText(/state:/i);
  const zip = screen.getByLabelText(/zip:/i);
  userEvent.type(firstName, "kristian");
  userEvent.type(lastName, "fulkerson");
  userEvent.type(address, "2752 Aquarius Circle");
  userEvent.type(city, "riverside");
  userEvent.type(state, "california");
  userEvent.type(zip, "92504");

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const successMessage = screen.queryByTestId("successMessage");
    const firstNameDisplay = screen.queryByText(/kristian/i);
    const lastNameDisplay = screen.queryByText(/fulkerson/i);
    const addressDisplay = screen.queryByText(/2752 aquarius circle/i);
    const cityDisplay = screen.queryByText(/riverside/i);
    const stateDisplay = screen.queryByText(/california/i);
    const zipDisplay = screen.queryByText(/92504/i);
    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(addressDisplay).toBeInTheDocument();
    expect(cityDisplay).toBeInTheDocument();
    expect(stateDisplay).toBeInTheDocument();
    expect(zipDisplay).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
    expect(successMessage).toBeTruthy();
    expect(successMessage).toHaveTextContent(
      /You have ordered some plants! Woo-hoo! 🎉Your new green friends will be shipped to:kristian fulkerson2752 Aquarius Circleriverside, california 92504/i
    );
  });
});
