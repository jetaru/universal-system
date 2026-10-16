import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cn } from "@/lib/utils";

describe("Utils - cn helper (Unit Tests)", () => {
  it("debe fusionar clases condicionales simples", () => {
    const result = cn("base-class", true && "active-class", false && "hidden-class");
    assert.equal(result, "base-class active-class");
  });

  it("debe resolver conflictos de Tailwind dando prioridad a la última clase", () => {
    const result = cn("p-4 text-red-500", "p-8 text-blue-500");
    assert.equal(result, "p-8 text-blue-500");
  });

  it("debe ignorar valores nulos, indefinidos y booleanos falsos", () => {
    const result = cn("class-a", null, undefined, false, 0 && "zero", "class-b");
    assert.equal(result, "class-a class-b");
  });
});
