import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Brand } from "@/components/brand";

describe("Brand", () => {
  it("mantém nome e identificação acessível na versão completa", () => {
    render(<Brand />);
    expect(screen.getByLabelText("MatchHub")).toBeInTheDocument();
    expect(screen.getByText("PlayMatch")).toBeInTheDocument();
    expect(screen.getByAltText("Símbolo do PlayMatch")).toBeInTheDocument();
  });

  it("oculta apenas o texto na versão compacta", () => {
    render(<Brand compact />);
    expect(screen.queryByText("PlayMatch")).not.toBeInTheDocument();
    expect(screen.getByAltText("Símbolo do PlayMatch")).toBeInTheDocument();
  });
});
