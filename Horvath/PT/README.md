# Devops G1
  - Harald Beier
  - Susanne Peer
  - Patrick Prugger
  - Philipp Palatin

We worked mostly via the Liveshare extension, so there can often be uneven pushes in the Git repository.

---

This is the subfolder / repository for the courses DEVOPS ILV and DEVOPS PT - MCCE second semester for the lecturer Kevin Horvath

# Table of Contents

- [Devops G1](#devops-g1)
- [Table of Contents](#table-of-contents)
  - [Task](#task)
  - [📁 Project structure](#-project-structure)
  - [End-to-End Test Sequence Diagram Analysis](#end-to-end-test-sequence-diagram-analysis)
    - [Actor and Participant Layout (Top)](#actor-and-participant-layout-top)
    - [CI/CD Integration Section](#cicd-integration-section)
    - [End-to-End Flow Automation Groups](#end-to-end-flow-automation-groups)
      - [Group 1: Enter Vehicle Data](#group-1-enter-vehicle-data)
      - [Group 2: Enter Insurant Data](#group-2-enter-insurant-data)
      - [Group 3: Enter Product Data](#group-3-enter-product-data)
      - [Group 4: Select Price Option](#group-4-select-price-option)
      - [Group 5: Send Quote](#group-5-send-quote)
    - [Validations Section (Validierungen)](#validations-section-validierungen)
    - [Test Report Generation Section](#test-report-generation-section)
    - [Integration with Our Testing Architecture](#integration-with-our-testing-architecture)
  - [End-to-End Test Flowchart Analysis](#end-to-end-test-flowchart-analysis)
    - [Test Scenario Categories](#test-scenario-categories)
      - [1. Vehicle Factors](#1-vehicle-factors)
      - [2. Driver Demographics](#2-driver-demographics)
      - [3. Insurance Parameters](#3-insurance-parameters)
      - [4. Coverage Options](#4-coverage-options)
      - [5. Price Verification](#5-price-verification)
      - [Test Coverage Overview](#test-coverage-overview)
      - [Expected Price Variations](#expected-price-variations)
    - [CI/CD Integration Layer](#cicd-integration-layer)
    - [Test Execution Environment Decision Point](#test-execution-environment-decision-point)
    - [End-to-End Flow Automation (Center Section)](#end-to-end-flow-automation-center-section)
    - [Application Response Processing (Middle)](#application-response-processing-middle)
    - [Comprehensive Validation Strategy (Lower Section)](#comprehensive-validation-strategy-lower-section)
    - [Test Report Generation (Bottom)](#test-report-generation-bottom)
    - [Visual Integration Summary](#visual-integration-summary)
  - [WebdriverIO GitHub Actions Workflow Explanation](#webdriverio-github-actions-workflow-explanation)
    - [Workflow Triggers](#workflow-triggers)
    - [Browser Matrix Strategy](#browser-matrix-strategy)
    - [Environment Setup](#environment-setup)
    - [Browser Installation](#browser-installation)
    - [Test Execution](#test-execution)
    - [Artifact Upload](#artifact-upload)
  - [WebdriverIO Test File Analysis](#webdriverio-test-file-analysis)
    - [Test Structure Overview](#test-structure-overview)
    - [Dynamic Test Generation](#dynamic-test-generation)
    - [Test Flow Architecture](#test-flow-architecture)
      - [Data Entry Steps (1-3)](#data-entry-steps-1-3)
      - [Price Option Selection (Step 4)](#price-option-selection-step-4)
      - [Quote Submission (Step 5)](#quote-submission-step-5)
    - [Cross-Browser Compatibility Features](#cross-browser-compatibility-features)
    - [Integration with GitHub Actions](#integration-with-github-actions)
    - [Test Validation Patterns](#test-validation-patterns)
  - [Test Data Class Analysis](#test-data-class-analysis)
    - [Dynamic Date Generation](#dynamic-date-generation)
    - [Test Scenario Architecture](#test-scenario-architecture)
    - [Risk Factor Testing Strategy](#risk-factor-testing-strategy)
    - [Expected Price Validation](#expected-price-validation)
  - [🎉 Poké-Catch \& Release: A Light-hearted Wrap-Up](#-poké-catch--release-a-light-hearted-wrap-up)

## Task

```
🙎‍♂️
/|\\ Group 1: "We choose you!"
💥
\\
\\
\\
💫
\\
\\
🔴 Pokéball
|
▼
⚙️ GitHub Actions
🧪 WebdriverIO
```


> [!WARNING]
> Some test data was wrong in th CSV file, we corrected them in the
> file `Scenarios_Vehicle_Insurance_App.csv` in the Code folder.
> The following changes were made:
>
> Szenario: Female
> 
> Gold: Changed -> 947.0 to 977.0
>
> Szenario: damageInsuranceFullCoverage
>
> Gold: Changed -> 1024.0 to 1027.0

> [!NOTE]
> Website to be tested:
> 
> https://sampleapp.tricentis.com/101/

---

**NOTE**
The aim of the task is to automate the Tricentis Vehicle Insurance App. At least the following requirements must be met in the pipeline configuration:

- The pipeline allows tests to be executed on a local browser (Chrome)
- The pipeline allows tests to be executed on remote browsers (Chrome and Edge)
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

## 📁 Project structure

```
├── .github
│   └── workflows
│       └── test.yml                         # GitHub Actions Workflow for tests
├── Code/
│   ├── plantUML_Mermaid                     # plantUML-Text for diagrams
│   ├── test
│   │   ├── test.e2e.js                      # End-to-End-Tests
│   │   └── VehicleInsuranceTestData.js      # Test data fir E2E-Tests
│   ├── package-lock.json                    # npm package lock file
│   ├── package.json                         # npm package file
│   ├── README.md                            # 🔴 You are here
│   ├── Scenarios_Vehicle_Insurance_App.csv  # CSV file with test scenarios
│   ├── wdio.conf.js                         # WebdriverIO-configuration file
│   ├── diagramms                            # diagrams for markdown
│   └── Unterricht                           # Code we had done during the lessons
```

## End-to-End Test Sequence Diagram Analysis

![](./diagramms/end2endtest.png "End-to-End Test Sequence Diagram Analysis")

> [!NOTE]
> This sequence diagram illustrates the chronological flow of interactions between all system components in the Tricentis Vehicle
> Insurance testing framework, showing how messages flow between actors over time.

### Actor and Participant Layout (Top)

The diagram displays six vertical lifelines representing the key components:

- **Developer** (leftmost actor stick figure)
- **GitHub Actions CI/CD Pipeline** (participant box)
- **WebdriverIO Test Framework** (participant box)
- **Local Chrome Browser** (participant box)
- **Device Cloud (Alternative)** (participant box)
- **Tricentis Insurance Application** (participant box)
- **Test Reports** (database symbol, rightmost)

### CI/CD Integration Section

The sequence begins with a horizontal arrow from Developer to GitHub Actions labeled _"Trigger Pipeline"_. The pipeline becomes **activated** (shown by the highlighted lifeline) and sends messages to itself (_"Initialize Test Environment"_) and then to WebdriverIO (_"Start Test Execution"_).

An **alternative fragment** (alt box) shows two execution paths:

- **Primary path**: WebdriverIO → Local Chrome ("Launch Local Chrome") with a note _"Primary execution path"_
- **Alternative path**: WebdriverIO → Device Cloud ("Connect to Device Cloud") with a note _"Alternative execution path"_

Both paths converge with arrows pointing to the Tricentis Application (_"Navigate to application"_).

### End-to-End Flow Automation Groups

The diagram shows five **group fragments**, each representing a test step:

#### Group 1: Enter Vehicle Data

- Chrome → App: _"Fill vehicle information"_
- App → Chrome: _"Navigate to next step"_

#### Group 2: Enter Insurant Data

- Chrome → App: _"Fill insurant information"_
- App → Chrome: _"Navigate to next step"_

#### Group 3: Enter Product Data

- Chrome → App: _"Configure product options"_
- App → Chrome: _"Navigate to next step"_

#### Group 4: Select Price Option

- Chrome → App: _"Choose price plan"_
- App → Chrome: _"Display selected option"_
- Chrome → Chrome: _"Capture price information"_ (self-message)
- Note attached: _"Store price for validation"_

#### Group 5: Send Quote

- Chrome → App: _"Submit quote request"_
- App → Chrome: _"Show confirmation page"_

### Validations Section (Validierungen)

The diagram shows **self-messages** on the Chrome lifeline:

- _"Validate Price Per Year"_ with detailed note: _"Verify price for ALL available price options: Silver, Gold, Platinum, Any other options"_
- _"Validate Quote Confirmation"_ with note: _"Confirm request was successfully submitted"_

Each validation includes **alternative fragments** showing success/failure paths:

- **Success**: Chrome → WebdriverIO (_"validation passed"_)
- **Failure**: Chrome → WebdriverIO (_"validation failed"_) → Test Reports (_"Log error"_)

### Test Report Generation Section

The final sequence shows:

- WebdriverIO → Test Reports: _"Collect all test results"_
- WebdriverIO → Test Reports: _"Generate comprehensive report"_
- Test Reports → Test Reports: _"Create HTML report"_ (self-message)
- Detailed note: _"Report includes: E2E flow results, Price validations, Confirmation status, Screenshots, Execution logs"_
- Test Reports → Pipeline: _"Store report as artifact"_
- Pipeline → Developer: _"Notify completion with report link"_
- Pipeline **deactivates** (lifeline returns to normal)

### Integration with Our Testing Architecture

This sequence diagram effectively shows the **temporal relationships** between our components:

- **GitHub Actions Workflow**: Orchestrates the entire sequence and manages artifacts
- **WebdriverIO Test File**: Controls the step-by-step automation flow through the groups
- **Test Data Class**: Implicitly drives the validation logic shown in the Validations section

> [!IMPORTANT]
> The diagram demonstrates how our **16 test scenarios** would each follow this same interaction pattern, with the validation
> steps comparing actual results against the expected prices stored in our Test Data Class
> across all browser combinations in the GitHub Actions matrix.

## End-to-End Test Flowchart Analysis

![](./diagramms/flowchart.png "Flowchart Diagram")

> [!NOTE]
> This flowchart diagram visualizes the complete automated testing pipeline from CI/CD trigger to test report generation
> illustrating how all components work together in the Tricentis Vehicle Insurance testing framework.

### Test Scenario Categories

#### 1. Vehicle Factors
- Engine performance variations:
  - Base case: 500 HP
  - High performance: 1500 HP (Expected price increase: ~2%)
- Vehicle age impact:
  - Recent model: 3 years old
  - Older model: 10 years old (Expected price increase: ~1%)
- List price ranges:
  - Standard: 20,000
  - Premium: 75,000 (Expected price increase: ~40%)

#### 2. Driver Demographics
- Age group risk factors:
  - Young drivers: 21 years
  - Standard: 26 years
  - Senior: 62 years
- Gender influence assessment:
  - Male (base case)
  - Female (price equivalence test)
- Location and occupation impact:
  - Country: United States
  - Occupation: Employee

#### 3. Insurance Parameters
- Coverage level variations:
  - Standard: 7M coverage
  - Premium: 25M coverage (Expected price increase: ~2%)
- Merit rating impact:
  - Best case: Super Bonus (Expected price reduction: ~3%)
  - Worst case: Malus 13 (Expected price increase: ~12%)
- Start date flexibility:
  - Standard: Next month
  - Extended: Two months ahead

#### 4. Coverage Options
- Damage insurance (None/Partial/Full)
- Euro protection
- Legal defense
- Courtesy car

#### 5. Price Verification
Each scenario validates four price tiers:
- Silver
- Gold
- Platinum
- Ultimate
#### Test Coverage Overview
- Total Scenarios: 16
- Test Cases per Scenario: 2
- Total Test Cases: 32
- Validation Points per Test: 5
  - Form completion
  - Navigation flow
  - Price calculation
  - Data persistence
  - Confirmation message

#### Expected Price Variations
| Scenario Factor    | Silver | Gold  | Platinum | Ultimate |
|-------------------|--------|-------|----------|----------|
| Base Case         | 331.0  | 977.0 | 1917.0   | 3652.0   |
| High Performance  | 337.0  | 993.0 | 1949.0   | 3712.0   |
| Premium List Price| 466.0  | 1374.0| 2697.0   | 5137.0   |
| Super Bonus       | 322.0  | 948.0 | 1861.0   | 3546.0   |

> [!NOTE]
> Price variations demonstrate the impact of different risk factors on insurance calculations.
> All prices are validated across multiple browser environments.

### CI/CD Integration Layer

The flowchart begins with the **GitHub Actions workflow** trigger showing the progression from _"Developer Trigger"_ → _"GitHub Actions Pipeline"_ → _"Initialize WebdriverIO"_. This represents the automatic pipeline activation when developers push code or create pull requests, directly connecting to our multi-browser testing strategy across Chrome and Edge.

### Test Execution Environment Decision Point

The diagram shows a decision diamond for "Execution Strategy?" with two paths:

- **Primary path**: Local Chrome Browser (for development testing)
- **Alternative path**: Device Cloud (for CI/CD execution)

> [!NOTE]
> This illustrates the execution flexibility where tests can run locally during development or in the GitHub Actions environment
> aligning with the `BROWSER` environment variable usage in our WebdriverIO configuration.

### End-to-End Flow Automation (Center Section)

The flowchart displays five sequential steps in rectangular boxes:

1. **Step 1: Enter Vehicle Data** → Vehicle Form Interaction
2. **Step 2: Enter Insurant Data** → Insurant Form Interaction
3. **Step 3: Enter Product Data** → Product Configuration
4. **Step 4: Select Price Option** → Price Selection Interface
5. **Step 5: Send Quote** → Quote Submission

> [!NOTE]
> This section maps directly to the **5-step user journey** in our WebdriverIO test file, showing how each form interaction uses
> scenario data from our Test Data Class with cross-browser JavaScript execution.

### Application Response Processing (Middle)

The diagram shows data flow arrows with labels:

- _"[Vehicle Data, Insurant Data, Product Data Processed]"_
- _"[Price Options Displayed]"_
- _"[Confirmation Page Shown]"_

> [!NOTE]
> These represent how the Tricentis application processes each form submission and generates the pricing calculations that our
> test scenarios validate.

### Comprehensive Validation Strategy (Lower Section)

The flowchart displays multiple decision diamonds for price validation:

- **Silver Valid?** → Silver Passed/Failed
- **Gold Valid?** → Gold Passed/Failed
- **Platinum Valid?** → Platinum Passed/Failed
- **Other Options Valid?** → Other Passed/Failed
- **Confirmation Present?** → Confirmation Passed/Failed

> [!NOTE]
> This section demonstrates the **price verification logic** from our WebdriverIO test suite, where each
> pricing tier is individually validated against expected values from the 16 test scenarios in our Test Data Class.11bd8083

### Test Report Generation (Bottom)

The final section shows:

- _"Collect Test Results"_ → _"Generate HTML Test Report"_
- A note box containing: "• _E2E Flow Results_ • _Price Validation Summary_ • _Confirmation Status_ • _Screenshots & Logs_ "
- _"Store as Pipeline Artifact"_ → _"Notify Developer"_

> [!NOTE]
> This connects to the **artifact upload** functionality in our GitHub Actions workflow, where test results,
> logs, and screenshots are automatically collected and stored as pipeline artifacts for post-execution
> analysis across all browser combinations.

### Visual Integration Summary

The flowchart effectively illustrates the complete testing ecosystem where our three core components integrate seamlessly:

- **GitHub Actions Workflow** (top section) manages pipeline execution
- **WebdriverIO Test File** (middle section) implements automation logic
- **Test Data Class** (throughout) provides the 16 scenarios driving comprehensive validation

> [!NOTE]
> The visual flow demonstrates how data moves from test scenarios through WebdriverIO automation into the application, with
> application, with validation results feeding back into the CI/CD reporting system.

## WebdriverIO GitHub Actions Workflow Explanation

In the .github folder is the test.yml in this YAML a is a GitHub Actions workflow defined that automatically runs WebdriverIO tests across multiple browsers whenever code is pushed or pull requests are created.

### Workflow Triggers

```yaml
on:
  push:
    branches: [main]
    paths:
      - "Horvath/PT/Code/**"
  pull_request:
    branches: [main]
    paths:
      - "Horvath/PT/Code/**"
```

> [!NOTE]
> The workflow runs on two events:
>
> - When code is pushed to the `main` branch
> - When a pull request is opened targeting the `main` branch
>
> The workflow is only run when there are changes under the path "Horvath/PT/Code".
> This is necessary because we have the work for all 3 lectors in one repository.

### Browser Matrix Strategy

```yaml
strategy:
  matrix:
    browser: [chrome, edge]
```

> **_NOTE:_** This creates two parallel jobs, one for each browser. Each job runs independently with a different browser configuration.

### Environment Setup

```yaml
- uses: actions/checkout@v3
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: "22"
- name: Install dependencies
  run: npm install
```

> [!NOTE]
> These steps prepare the environment by checking out the code, installing Node.js 22, and installing project dependencies.

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

## WebdriverIO Test File Analysis

This WebdriverIO test file demonstrates automated testing of a vehicle insurance application using data-driven testing principles.

### Test Structure Overview

```javascript
describe("Tricentis Vehicle Insurance Tests", () => {
  let testData = new VehicleInsuranceTestData();
  // Test implementation
});
```

The test suite uses a **data-driven approach** where test scenarios are externalized in a separate `VehicleInsuranceTestData.js` file. This allows multiple test scenarios to run with different input data without duplicating test code.

### Dynamic Test Generation

```javascript
Object.entries(testData.scenarios).forEach(([scenarioName, scenario]) => {
  describe(`Scenario: ${scenarioName}`, () => {
    // Individual test cases
  });
});
```

> [!NOTE]
> The code dynamically creates test suites for each scenario in the test data. This pattern generates multiple test cases at runtime, making it highly scalable for testing different data combinations.

### Test Flow Architecture

> [!IMPORTANT]
> Each test follows a 5-step user journey:
>
> - Vehicle Data Entry - Car specifications (make, engine, fuel type)
> - Insurant Data Entry - Personal information (name, address, occupation)
> - Product Data Entry - Insurance preferences (coverage amount, start date)
> - Price Option Selection - Choose insurance tier (Silver, Gold, Platinum, Ultimate)
> - Quote Submission - Send email with user credentials

Now we will look a bit more into the details in the code from the tests of the **5-step user journey**:

#### Data Entry Steps (1-3)

```javascript
await $("#make").selectByVisibleText("BMW");
await $("#engineperformance").setValue(scenario.enginePerformance);
await $("#firstname").setValue("John");
await $("#country").selectByVisibleText(scenario.country);
```

The first three steps simulate form filling across multiple pages. Each step uses **scenario-specific data** from the test data object, allowing the same test logic to run with different input combinations. The test navigates between pages using "Next" buttons after completing each form section.

#### Price Option Selection (Step 4)

```javascript
await browser.execute(() => {
  document.querySelector("#selectsilver").click();
});
```

After entering all insurance parameters, the application calculates and displays four pricing tiers. The test selects the Silver option using JavaScript execution to ensure reliable clicking across all browsers in the GitHub Actions matrix.


#### Quote Submission (Step 5)

```javascript
await $("#email").setValue("test@example.com");
await $("#sendemail").click();
await expect($(".sweet-alert")).toHaveText(
  expect.stringContaining("Sending e-mail success!")
);
```

The final step submits the quote request with contact information and validates the success message. This end-to-end verification ensures the complete user workflow functions correctly across all browser environments.

### Cross-Browser Compatibility Features

The test uses several techniques to handle browser inconsistencies:

```javascript
await browser.execute((gender) => {
  document.querySelector(`input[name="Gender"][value="${gender}"]`).click();
}, scenario.gender);
```

> [!IMPORTANT] > **JavaScript execution** bypasses WebDriver limitations with certain UI elements, ensuring tests work reliably across Chrome and Edge browsers in the GitHub Actions workflow.

### Integration with GitHub Actions

This test file directly supports the multi-browser GitHub Actions workflow through:

> [!NOTE]
>
> - **Environment variable usage**: The test configuration can read the `BROWSER` environment variable set by the GitHub Actions matrix
> - **Artifact generation**: Test results and logs are automatically captured in the `./test-results/` and `./logs/` directories
> - **Cross-browser reliability**: JavaScript execution ensures consistent behavior across all three browsers in the CI pipeline

### Test Validation Patterns

```javascript
const silverPrice = await $("#selectsilver_price").getText();
expect(silverPrice).toBe(scenario.prices.silver.toLocaleString("en-US"));
```

> [!TIP] > **Price Option Selection** as the fourth test case demonstrates **price verification**, comparing actual application prices against expected values from the test data. This ensures the insurance calculation logic works correctly across different scenarios.

## Test Data Class Analysis

This test data class implements a **data-driven testing strategy** that separates test logic from test data, enabling comprehensive insurance calculation testing across multiple scenarios.

### Dynamic Date Generation

```javascript
function yearsAgo(years) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return formatDate(d);
}

function monthsAndDaysFromNow(months, days) {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}
```

> [!NOTE]
> The utility functions generate **relative dates** instead of hardcoded values. This ensures tests remain valid over time - manufacturing dates stay consistently "3 years ago" and start dates remain "1 month from now" regardless of when tests execute in the GitHub Actions workflow.

### Test Scenario Architecture

```javascript
class VehicleInsuranceTestData {
  constructor() {
    this.scenarios = {
      straightThrough: {
        /* baseline scenario */
      },
      enginePerformance1000to2000: {
        /* modified parameter */
      },
      // ... 16 total scenarios
    };
  }
}
```

The class contains **16 distinct test scenarios**, each representing different insurance calculation edge cases. This data structure directly feeds the dynamic test generation in the WebdriverIO test file, where `Object.entries(testData.scenarios).forEach()` creates individual test suites.

### Risk Factor Testing Strategy

> [!IMPORTANT] Each scenario isolates specific **insurance risk variables**:
>
> - **Vehicle factors**: Engine performance (500 vs 1500), manufacturing date (3 vs 10 years)
> - **Personal factors**: Age groups (18-25, 56-70), gender (Male vs Female)
> - **Coverage factors**: Insurance sum (7M vs 25M), damage coverage (None, Partial, Full)
> - **Optional products**: Euro Protection, Legal Defense, Courtesy Car

### Expected Price Validation

```javascript
prices: {
  silver: 331.0,
  gold: 977.0,
  platinum: 1917.0,
  ultimate: 3652.0,
}
```

> [!NOTE] Each scenario includes **expected pricing for all four tiers**.
> This enables the price verification test in the WebdriverIO suite to validate
> that insurance calculations remain accurate across different input combinations and browser environments.

## 🎉 Poké-Catch & Release: A Light-hearted Wrap-Up

Hey Kevin! 👋

As **Team (Group 1)**, we’ve embarked on a wild journey through the world of CI/CD and E2E test automation—just like a band of aspiring Pokémon Trainers. Here’s our final Pokédex entry:

- **🎯 Pokéball = GitHub Actions**  
  We threw our Pokéballs with a matrix strategy—capturing Chrome and Edge in one go! No browser monster can escape our automated workflow.

- **⚡️ Pikachu-Power = WebdriverIO**  
  With electrifying data-driven tests, we’ve zapped through the five evolution stages:

  1. Vehicle Data
  2. Insurant Data
  3. Product Data
  4. Price Option
  5. Quote Submission

> [!TIP]
> Each step sparkles with JavaScript commands ensuring our team’s moves hit every target.

- **📖 Pokédex of Scenarios = Test Data Class**  
  Seventeen unique _“species”_ of test scenarios—with relative dates as _“rare candies”_ and expected prices as _“base stats”_ — guarantee full coverage across all insurance adventures.

- **🏆 League Badges = Reports & Artifacts**  
  After each run, we earn our badges: an HTML report complete—ready to display in Kevin’s trophy case (or GitHub Actions artifacts tab).

---

🔮 **From Group 1 to Professor Horvath**  
With this setup, you’ve taught us the art of:

1. **Version Control Mastery** (GitHub Actions)
2. **Multi-Browser Gym Battles** (Matrix Strategy)
3. **Data-Driven Evolution** (Reusable Test Data)
4. **Transparent Victory Records** (Reports & Artifacts)

We’re now fully “evolved” and ready to take on any cloud-native challenge—whether it’s battling container orchestrators or catching elusive performance bugs. Thanks for guiding our team to “Gotta Test ’Em All!” status. We can’t wait for our next lesson in the Masterclass arena.

> [!IMPORTANT]
> — Team (Group 1) - Patrick Prugger, Susanne Peer, Harald Beier, Philipp Palatin
