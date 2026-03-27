import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CookieConsent from "./CookieConsent";

describe("CookieConsent", () => {
  it("aceita e some", async () => {
    localStorage.removeItem("inm.cookieConsent.v1");

    render(<CookieConsent />);
    expect(screen.getByText(/Privacidade|Privacy/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /Aceitar|Accept/i }));
    expect(screen.queryByText(/Privacidade|Privacy/i)).not.toBeInTheDocument();
    expect(localStorage.getItem("inm.cookieConsent.v1")).toBe("accepted");
  });
});

