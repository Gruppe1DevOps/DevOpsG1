# Devops G1

This is the subfolder / repository for the courses DEVOPS ILV and DEVOPS PT - MCCE second semester for the lecturer Kevin Horvath

## Task

**We chose:**

> [!IMPORTANT]
> CI/CD Platform
>
> - Platform: GitHub Actions

> Automation Framework
>
> - Wdio
>
> Website for testing:
> https://sampleapp.tricentis.com/101/

> [!WARNING]
> some test data were wrong in th CSV file, we corrected them in the file `Scenarios_Vehicle_Insurance_App.csv` in the root folder of this repository. Following changes were made:
> Szenario: Female
> Gold: Changed -> 947.0 to 977.0
>
> Szenario: damageInsuranceFullCoverage
> Gold: Changed -> 1024.0 to 1027.0

---

**NOTE**
The aim of the task is to automate the Tricentis Vehicle Insurance App. At least the following requirements must be met in the pipeline configuration:

- The pipeline allows tests to be executed on a local browser (Google Chrome)
- The pipeline allows tests to be executed on remote browsers (e.g. Chrome, Firefox,...)
- A test report is saved as an artifact for each pipeline run

---

> [!NOTE]
> The aim is to automate the end-to-end flow of the web app, which includes the following steps:
>
>     Enter Vehicle Data  --> Home --> Automobile Insurance --> Enter Vehicle Data
>     Enter Insurant Data --> Enter Vehicle Data --> next
>     Enter Product Data  --> Enter Insurant Data --> next
>     Select Price Option --> Enter Product Data --> next
>     Send Quote          --> Select Price Option --> next
>
> Each group should vary at least one of the following attributes:
>
> - Merit Rating --> Enter Product Data
> - Damage Insurance --> Enter Product Data
> - Optional Products --> Enter Product Data
> - Courtesy Car --> Enter Product Data
> - Price Options
>
> The following validations must also be carried out:
>
>     - Price per year for the selected price option (silver, gold, platinum, etc.)
>     - Confirmation that the request has been sent

---

## 📁 Projectstructure

```
├── Code/
│   ├── .github
│   ├── plantUML_Mermaid                                       # plantUML text part for the generation of the figures in the ILV
│   ├── test
│       ├── test.e2e.js                                        # e2e tests
│       ├── VehicleInsuranceTestData.js                        # test data for the e2e tests
│   ├── package-lock.json                                      # npm package lock file
│   ├── package.json                                           # npm package file
│   ├── README.md                                              # 🔴 You are here
│   ├── Scenarios_Vehicle_Insurance_App.csv                    # CSV file with the test data
│   ├── wdio.conf.js                                           # Wdio configuration file
│   ├── diagramms                                              # Diagramms use in markdown for visualisation
│   ├── Latex                                                  # Latex code for additional PDF projectreport if needed
│   ├── Unterricht                                             # code from task during course (first testcase tricentis)
```

### WebdriverIO GitHub Actions Workflow Explanation

In the .github folder is the test.yml in this YAML a is a GitHub Actions workflow defined that automatically runs WebdriverIO tests across multiple browsers whenever code is pushed or pull requests are created.

#### Workflow Triggers

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

> [!NOTE]
> The workflow runs on two events:
>
> - When code is pushed to the `main` branch
> - When a pull request is opened targeting the `main` branch

### Browser Matrix Strategy

```yaml
strategy:
  matrix:
    browser: [chrome, firefox, edge]
```

> **_NOTE:_** This creates three parallel jobs, one for each browser. Each job runs independently with a different browser configuration.

### Environment Setup

```yaml
- uses: actions/checkout@v3
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: "18"
- name: Install dependencies
  run: npm install
```

> [!NOTE]
> These steps prepare the environment by checking out the code, installing Node.js 18, and installing project dependencies.

### Browser Installation

```yaml
- name: Install Chrome
  if: matrix.browser == 'chrome'
  run: |
    sudo apt-get update
    sudo apt-get install -y google-chrome-stable
```

> [!NOTE]
> Each browser is installed conditionally based on the matrix value. The `if` condition ensures only the required browser is installed for each job.

### Test Execution

```yaml
- name: Run WebdriverIO tests
  run: npx wdio run wdio.conf.js
  env:
    BROWSER: ${{ matrix.browser }}
```

> [!NOTE]
> The tests run using the WebdriverIO CLI command. The `BROWSER` environment variable passes the current matrix browser name to the test configuration.

### Artifact Upload

```yaml
- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: test-results-${{ matrix.browser }}
    path: |
      ./test-results/
      ./logs/
```

> [!NOTE]
> Test results and logs are uploaded as artifacts after each run. The `if: always()` ensures artifacts are saved even if tests fail.

### WebdriverIO Test File Analysis

This WebdriverIO test file demonstrates automated testing of a vehicle insurance application using data-driven testing principles.

#### Test Structure Overview

```javascript
describe("Tricentis Vehicle Insurance Tests", () => {
  let testData = new VehicleInsuranceTestData();
  // Test implementation
});
```

The test suite uses a **data-driven approach** where test scenarios are externalized in a separate `VehicleInsuranceTestData.js` file. This allows multiple test scenarios to run with different input data without duplicating test code.

#### Dynamic Test Generation

```javascript
Object.entries(testData.scenarios).forEach(([scenarioName, scenario]) => {
  describe(`Scenario: ${scenarioName}`, () => {
    // Individual test cases
  });
});
```

#### Dynamic Test Generation

```javascript
Object.entries(testData.scenarios).forEach(([scenarioName, scenario]) => {
  describe(`Scenario: ${scenarioName}`, () => {
    // Individual test cases
  });
});
```

> [!NOTE]
> The code dynamically creates test suites for each scenario in the test data. This pattern generates multiple test cases at runtime, making it highly scalable for testing different data combinations.

#### Test Flow Architecture

> [!IMPORTANT]
> Each test follows a 5-step user journey:
>
> - Vehicle Data Entry - Car specifications (make, engine, fuel type)
> - Insurant Data Entry - Personal information (name, address, occupation)
> - Product Data Entry - Insurance preferences (coverage amount, start date)
> - Price Option Selection - Choose insurance tier (Silver, Gold, Platinum, Ultimate)
> - Quote Submission - Send email with user credentials

Now we will look a bit more into the details in the code from the tests of the **5-step user journey**:

##### Data Entry Steps (1-3)

```javascript
await $("#make").selectByVisibleText("BMW");
await $("#engineperformance").setValue(scenario.enginePerformance);
await $("#firstname").setValue("John");
await $("#country").selectByVisibleText(scenario.country);
```

The first three steps simulate form filling across multiple pages. Each step uses **scenario-specific data** from the test data object, allowing the same test logic to run with different input combinations. The test navigates between pages using "Next" buttons after completing each form section.

##### Price Option Selection (Step 4)

```javascript
await browser.execute(() => {
  document.querySelector("#selectsilver").click();
});
```

After entering all insurance parameters, the application calculates and displays four pricing tiers. The test selects the Silver option using JavaScript execution to ensure reliable clicking across all browsers in the GitHub Actions matrix.

##### Quote Submission (Step 5)

```javascript
await $("#email").setValue("test@example.com");
await $("#sendemail").click();
await expect($(".sweet-alert")).toHaveText(
  expect.stringContaining("Sending e-mail success!")
);
```

The final step submits the quote request with contact information and validates the success message. This end-to-end verification ensures the complete user workflow functions correctly across all browser environments.

#### Cross-Browser Compatibility Features

The test uses several techniques to handle browser inconsistencies:

```javascript
await browser.execute((gender) => {
  document.querySelector(`input[name="Gender"][value="${gender}"]`).click();
}, scenario.gender);
```

> [!IMPORTANT]
