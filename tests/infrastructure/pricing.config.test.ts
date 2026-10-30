import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  GLOBAL_PRICING_CONFIG,
  calculateRegularPriceCLP,
  formatCLP,
} from "@/infrastructure/config/pricing.config";

describe("Global Pricing Configuration (Single Source of Truth)", () => {
  it("debe mantener el 20% de descuento inicial y los valores globales solicitados", () => {
    assert.equal(GLOBAL_PRICING_CONFIG.launchDiscountPercent, 20);
    assert.equal(GLOBAL_PRICING_CONFIG.isDiscountActive, true);
    assert.equal(GLOBAL_PRICING_CONFIG.plans.basico.discountedMonthlyCLP, 17000);
    assert.equal(GLOBAL_PRICING_CONFIG.plans.basico.levelsIncluded, 1);
    assert.equal(GLOBAL_PRICING_CONFIG.plans.intermedio.discountedMonthlyCLP, 30000);
    assert.equal(GLOBAL_PRICING_CONFIG.plans.intermedio.levelsIncluded, 2);
    assert.equal(GLOBAL_PRICING_CONFIG.plans.avanzado.discountedMonthlyCLP, 42000);
    assert.equal(GLOBAL_PRICING_CONFIG.plans.avanzado.levelsIncluded, 3);
    assert.equal(GLOBAL_PRICING_CONFIG.plans.intensivo.schedulesIncluded, 2);
    assert.ok(GLOBAL_PRICING_CONFIG.plans.intensivo.discountedMonthlyCLP > 42000);
  });

  it("debe definir exactamente 2 horarios iniciales (normal y vespertino) y soporte diagnóstico en $10.000 CLP", () => {
    const scheduleKeys = Object.keys(GLOBAL_PRICING_CONFIG.schedules);
    assert.deepEqual(scheduleKeys, ["normal", "vespertino"]);
    assert.equal(GLOBAL_PRICING_CONFIG.supportRates.analysisAndQuoteCLP, 10000);
  });

  it("debe calcular de forma exacta el precio de lista previo al 20% de descuento", () => {
    assert.equal(calculateRegularPriceCLP(17000, 20), 21250);
    assert.equal(calculateRegularPriceCLP(30000, 20), 37500);
    assert.equal(calculateRegularPriceCLP(42000, 20), 52500);
    assert.equal(calculateRegularPriceCLP(52000, 20), 65000);
  });

  it("debe formatear montos CLP de manera determinista sin discrepancias de hidratación", () => {
    assert.equal(formatCLP(10000), "$10.000");
    assert.equal(formatCLP(17000, true), "$17.000 CLP");
    assert.equal(formatCLP(42000), "$42.000");
  });
});
