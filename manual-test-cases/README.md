# Manual Test Cases

This folder holds manual (human-executed) test documentation.

## Files

- `Test_Case_Template.md` — blank template. Copy it for every new test case. Includes Test Case ID, Test Description, Preconditions, Test Steps, Test Data, Expected Results, Actual Results, Status (Pass/Fail), Notes.
- `FR001_Mortgage_Calculator_Manual_Test_Cases.md` — all 40 detailed test cases in the full template format: TC_FR001_01–25 (rate calculator inputs, validation, API, results) and TC_FR001_26–40 (Get Prequalified flow: 6 steps, disclaimers, navigation). Fill in Actual Results and Pass/Fail during execution.
- `All_Test_Cases_Table.md` — all 40 test cases in a single table: Test Case ID, Test Description, Test Steps, Test Data, Expected Results, Actual Results, Pass/Fail.
- `Defect_Log.md` — defect log for manual test execution. Log every defect found while running the 40 test cases: Defect ID, Test Case ID, summary, steps to reproduce, severity, priority, status, retest result.

## Related automation

The Playwright TypeScript automation for the same 40 cases lives in `playwright-mortgage-calculator/tests/mortgage-calculator.spec.ts`.
