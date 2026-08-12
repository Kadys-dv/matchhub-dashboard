import { describe, expect, it } from "vitest";
import { formatMatchDate, occupancyPercentage } from "@/lib/format";

describe("occupancyPercentage", () => {
  it("calcula a ocupação e limita o resultado", () => {
    expect(occupancyPercentage(5, 10)).toBe(50);
    expect(occupancyPercentage(20, 10)).toBe(100);
    expect(occupancyPercentage(1, 0)).toBe(0);
    expect(occupancyPercentage(-2, 10)).toBe(0);
  });
});

describe("formatMatchDate", () => {
  it("trata datas inválidas", () => expect(formatMatchDate("inválida")).toBe("Data indisponível"));
});
