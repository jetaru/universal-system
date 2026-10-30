import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  siteContentBundles,
  trustMetricsEs,
  trustMetricsEn,
  servicePillarsEs,
  servicePillarsEn,
} from "@/data/site-content";

describe("i18n & Bilingual Content System (Unit Tests)", () => {
  it("debe contener paquetes de contenido para español (es) e inglés (en)", () => {
    assert.ok(siteContentBundles.es, "El bundle en español debe existir");
    assert.ok(siteContentBundles.en, "El bundle en inglés debe existir");
  });

  it("debe mantener paridad exacta en la cantidad de métricas de confianza entre idiomas", () => {
    assert.equal(
      siteContentBundles.es.trustMetrics.length,
      siteContentBundles.en.trustMetrics.length,
      "Ambos idiomas deben tener la misma cantidad de métricas"
    );
    assert.equal(trustMetricsEs.length, 4);
    assert.equal(trustMetricsEn.length, 4);
  });

  it("debe mantener paridad en los tres pilares de servicio y sus beneficios", () => {
    assert.equal(servicePillarsEs.length, 3);
    assert.equal(servicePillarsEn.length, 3);

    for (let i = 0; i < servicePillarsEs.length; i++) {
      const es = servicePillarsEs[i];
      const en = servicePillarsEn[i];

      assert.equal(es.id, en.id, `El id del pilar ${i} debe coincidir`);
      assert.equal(es.number, en.number, `El número del pilar ${i} debe coincidir`);
      assert.ok(en.title.length > 0, "El título en inglés no debe estar vacío");
      assert.ok(en.description.length > 0, "La descripción en inglés no debe estar vacía");
      assert.equal(
        es.benefits.length,
        en.benefits.length,
        `La cantidad de beneficios para el pilar ${i} debe coincidir`
      );
    }
  });

  it("debe mantener paridad en el desglose general de niveles, horarios, planes y tarifas de soporte", () => {
    const es = siteContentBundles.es;
    const en = siteContentBundles.en;

    assert.equal(es.curriculumLevels.length, 3);
    assert.equal(es.curriculumLevels.length, en.curriculumLevels.length);
    assert.equal(es.scheduleModalities.length, 2);
    assert.equal(es.scheduleModalities.length, en.scheduleModalities.length);
    assert.equal(es.pricingPlans.length, 4);
    assert.equal(es.pricingPlans.length, en.pricingPlans.length);
    assert.equal(es.supportRates.length, en.supportRates.length);

    for (let i = 0; i < es.pricingPlans.length; i++) {
      assert.equal(es.pricingPlans[i].id, en.pricingPlans[i].id);
      assert.equal(es.pricingPlans[i].highlights.length, en.pricingPlans[i].highlights.length);
    }

    for (let i = 0; i < es.supportRates.length; i++) {
      assert.equal(es.supportRates[i].id, en.supportRates[i].id);
      assert.equal(es.supportRates[i].priceCLP, en.supportRates[i].priceCLP);
    }
  });

  it("debe mantener paridad en los pasos del checklist de laboratorio", () => {
    const esLab = siteContentBundles.es.labChecklist;
    const enLab = siteContentBundles.en.labChecklist;

    assert.equal(esLab.length, 4);
    assert.equal(enLab.length, 4);

    for (let i = 0; i < esLab.length; i++) {
      assert.equal(esLab[i].id, enLab[i].id);
      assert.equal(esLab[i].stepNumber, enLab[i].stepNumber);
      assert.ok(enLab[i].title.length > 0);
      assert.ok(enLab[i].metric.length > 0);
    }
  });

  it("debe mantener paridad en testimonios y metodología", () => {
    assert.equal(siteContentBundles.es.testimonials.length, siteContentBundles.en.testimonials.length);
    assert.equal(siteContentBundles.es.methodologySteps.length, siteContentBundles.en.methodologySteps.length);
  });
});
