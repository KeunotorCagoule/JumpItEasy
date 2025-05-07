import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

describe("Front page", () => {
  it("renders the home page correctly", () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    );

    // Adjust this text to match something visible on your actual home page
    expect(screen.getByText(/JumpItEasy/i)).toBeInTheDocument();
  });
});
