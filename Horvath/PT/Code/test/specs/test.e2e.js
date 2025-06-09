import { expect, browser, $ } from "@wdio/globals";
import VehicleInsuranceTestData from "./VehicleInsuranceTestData.js";

describe("Tricentis Vehicle Insurance Tests", () => {
  let testData = new VehicleInsuranceTestData();

  beforeEach(async () => {
    // Navigate to the application
    await browser.url("https://sampleapp.tricentis.com/101/");
  });

  it("should complete automobile insurance quote flow", async () => {
    const scenario = testData.getScenario("straightThrough");

    // Step 1: Enter Vehicle Data
    await $("#nav_automobile").click();
    await $("#make").selectByVisibleText("BMW");
    await $("#engineperformance").setValue(scenario.enginePerformance);
    await $("#dateofmanufacture").setValue(scenario.dateOfManufacture);
    await $("#numberofseats").selectByVisibleText(
      scenario.numberOfSeats.toString()
    );
    await $("#fuel").selectByVisibleText(scenario.fuelType);
    await $("#listprice").setValue(scenario.listPrice);
    await $("#licenseplatenumber").setValue("ABC123");
    await $("#annualmileage").setValue(scenario.annualMileage);
    await $("#nextenterinsurantdata").click();

    // Step 2: Enter Insurant Data
    await $("#firstname").setValue("John");
    await $("#lastname").setValue("Doe");
    await $("#birthdate").setValue("01/01/1990");
    // Use JavaScript to click the radio button
    await browser.execute((gender) => {
      document.querySelector(`input[name="Gender"][value="${gender}"]`).click();
    }, scenario.gender);
    await $("#streetaddress").setValue("123 Main St");
    await $("#country").selectByVisibleText(scenario.country);
    await $("#zipcode").setValue("12345");
    await $("#city").setValue("New York");
    await $("#occupation").selectByVisibleText(scenario.occupation);
    await $("#website").setValue("https://example.com");
    // Select hobby using JavaScript to bypass overlay
    await browser.execute(() => {
      document.querySelector("#other").click();
    });
    await $("#nextenterproductdata").click();

    // Step 3: Enter Product Data
    await $("#startdate").setValue(scenario.preferredStartDate);
    // Format insurance sum to match the exact format in the select options
    const formattedInsuranceSum = ` ${(scenario.insuranceSum / 1000000).toFixed(
      0
    )}.000.000,00`;
    await $("#insurancesum").selectByVisibleText(formattedInsuranceSum);
    await $("#meritrating").selectByVisibleText(scenario.meritRating);
    await $("#damageinsurance").selectByVisibleText(scenario.damageInsurance);
    if (scenario.euroProtection) {
      await browser.execute(() => {
        document.querySelector("#EuroProtection").click();
      });
    }
    if (scenario.legalDefenseInsurance) {
      await browser.execute(() => {
        document.querySelector("#LegalDefenseInsurance").click();
      });
    }
    await $("#courtesycar").selectByVisibleText(
      ` ${scenario.courtesyCarOption}`
    );
    await $("#nextselectpriceoption").click();

    // Step 4: Select Price Option
    await browser.execute(() => {
      document.querySelector("#selectsilver").click();
    });
    await $("#nextsendquote").click();

    // Step 5: Send Quote
    await $("#email").setValue("test@example.com");
    await $("#phone").setValue("1234567890");
    await $("#username").setValue("testuser");
    await $("#password").setValue("Test123!");
    await $("#confirmpassword").setValue("Test123!");
    await $("#Comments").setValue("Test comment");
    await $("#sendemail").click();

    // Verify success message
    await expect($(".sweet-alert")).toBeExisting();
    await expect($(".sweet-alert")).toHaveText(
      expect.stringContaining("Sending e-mail success!")
    );
  });

  it("should verify price options match expected values", async () => {
    const scenario = testData.getScenario("straightThrough");

    // Navigate through steps to reach price options
    await $("#nav_automobile").click();
    await $("#make").selectByVisibleText("BMW");
    await $("#engineperformance").setValue(scenario.enginePerformance);
    await $("#dateofmanufacture").setValue(scenario.dateOfManufacture);
    await $("#numberofseats").selectByVisibleText(
      scenario.numberOfSeats.toString()
    );
    await $("#fuel").selectByVisibleText(scenario.fuelType);
    await $("#listprice").setValue(scenario.listPrice);
    await $("#licenseplatenumber").setValue("ABC123");
    await $("#annualmileage").setValue(scenario.annualMileage);
    await $("#nextenterinsurantdata").click();

    // Fill insurant data
    await $("#firstname").setValue("John");
    await $("#lastname").setValue("Doe");
    await $("#birthdate").setValue("01/01/1990");
    // Use JavaScript to click the radio button
    await browser.execute((gender) => {
      document.querySelector(`input[name="Gender"][value="${gender}"]`).click();
    }, scenario.gender);
    await $("#streetaddress").setValue("123 Main St");
    await $("#country").selectByVisibleText(scenario.country);
    await $("#zipcode").setValue("12345");
    await $("#city").setValue("New York");
    await $("#occupation").selectByVisibleText(scenario.occupation);
    await $("#website").setValue("https://example.com");
    // Select hobby using JavaScript to bypass overlay
    await browser.execute(() => {
      document.querySelector("#other").click();
    });
    await $("#nextenterproductdata").click();

    // Fill product data
    await $("#startdate").setValue(scenario.preferredStartDate);
    // Format insurance sum to match the exact format in the select options
    const formattedInsuranceSum = ` ${(scenario.insuranceSum / 1000000).toFixed(
      0
    )}.000.000,00`;
    await $("#insurancesum").selectByVisibleText(formattedInsuranceSum);
    await $("#meritrating").selectByVisibleText(scenario.meritRating);
    await $("#damageinsurance").selectByVisibleText(scenario.damageInsurance);
    if (scenario.euroProtection) {
      await browser.execute(() => {
        document.querySelector("#EuroProtection").click();
      });
    }
    if (scenario.legalDefenseInsurance) {
      await browser.execute(() => {
        document.querySelector("#LegalDefenseInsurance").click();
      });
    }
    await $("#courtesycar").selectByVisibleText(
      ` ${scenario.courtesyCarOption}`
    );
    await $("#nextselectpriceoption").click();

    // Verify prices
    const silverPrice = await $("#selectsilver_price").getText();
    expect(silverPrice).toBe(
      scenario.prices.silver.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );

    const goldPrice = await $("#selectgold_price").getText();
    expect(goldPrice).toBe(
      scenario.prices.gold.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );

    const platinumPrice = await $("#selectplatinum_price").getText();
    expect(platinumPrice).toBe(
      scenario.prices.platinum.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );

    const ultimatePrice = await $("#selectultimate_price").getText();
    expect(ultimatePrice).toBe(
      scenario.prices.ultimate.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  });
});
