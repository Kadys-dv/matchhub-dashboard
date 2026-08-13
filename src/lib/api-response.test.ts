import { describe, expect, it } from "vitest";
import { forwardResponse } from "@/lib/api-response";

describe("forwardResponse", () => {
  it("preserva status, corpo e content-type da API", async () => {
    const source = new Response(JSON.stringify({ status: "UP" }), {
      status: 202,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
    const result = await forwardResponse(source);
    expect(result.status).toBe(202);
    expect(result.headers.get("Content-Type")).toBe("application/json;charset=UTF-8");
    await expect(result.json()).resolves.toEqual({ status: "UP" });
  });

  it("trata respostas sem corpo", async () => {
    const result = await forwardResponse(new Response(null, { status: 204 }));
    expect(result.status).toBe(204);
    expect(await result.text()).toBe("");
  });
});
