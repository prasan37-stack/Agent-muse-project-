# Test Results — FR001 Wells Fargo Mortgage Calculator (Manual Execution)

Record the outcome of each manual test case run here.
Fill in **Actual Result** and **Status** for every case, then summarize below.

| # | Test Case ID | Test Description | Actual Result | Status (Pass/Fail) | Tested By | Date | Notes |
| - | ------------ | ---------------- | ------------- | ------------------ | --------- | ---- | ----- |
| 1 | TC_FR001_01 | Verify calculator URL loads successfully |  |  |  |  |  |
| 2 | TC_FR001_02 | Verify page elements render on supported browsers |  |  |  |  |  |
| 3 | TC_FR001_03 | Verify Loan Purpose dropdown displays Purchase option |  |  |  |  |  |
| 4 | TC_FR001_04 | Verify Loan Purpose dropdown displays Refinance option |  |  |  |  |  |
| 5 | TC_FR001_05 | Verify Loan Purpose is mandatory field |  |  |  |  |  |
| 6 | TC_FR001_06 | Verify Home Value accepts minimum valid amount |  |  |  |  |  |
| 7 | TC_FR001_07 | Verify Home Value accepts maximum valid amount |  |  |  |  |  |
| 8 | TC_FR001_08 | Verify Home Value accepts decimal values |  |  |  |  |  |
| 9 | TC_FR001_09 | Verify Home Value rejects alphabetic characters |  |  |  |  |  |
| 10 | TC_FR001_10 | Verify Home Value rejects special characters & symbols |  |  |  |  |  |
| 11 | TC_FR001_11 | Verify Loan Amount accepts valid amount < Home Value |  |  |  |  |  |
| 12 | TC_FR001_12 | Verify Loan Amount rejects 0 or negative values |  |  |  |  |  |
| 13 | TC_FR001_13 | Verify Loan Amount rejects value > Home Value (LTV > 100%) |  |  |  |  |  |
| 14 | TC_FR001_14 | Verify Loan Amount accepts decimal values |  |  |  |  |  |
| 15 | TC_FR001_15 | Verify Loan Amount mandatory field validation |  |  |  |  |  |
| 16 | TC_FR001_16 | Verify State dropdown contains all 50 US states + DC |  |  |  |  |  |
| 17 | TC_FR001_17 | Verify State dropdown defaults to blank/Select State |  |  |  |  |  |
| 18 | TC_FR001_18 | Verify County dropdown disabled until State selected |  |  |  |  |  |
| 19 | TC_FR001_19 | Verify County list filters correctly for selected State |  |  |  |  |  |
| 20 | TC_FR001_20 | Verify Calculate button enabled only when all required fields filled |  |  |  |  |  |
| 21 | TC_FR001_21 | Verify Calculate button triggers API call with valid data |  |  |  |  |  |
| 22 | TC_FR001_22 | Verify system handles API timeout gracefully |  |  |  |  |  |
| 23 | TC_FR001_23 | Verify results page shows estimated rate range |  |  |  |  |  |
| 24 | TC_FR001_24 | Verify results page shows monthly payment breakdown |  |  |  |  |  |
| 25 | TC_FR001_25 | Verify 'Start Over' or 'Edit' option returns to input page |  |  |  |  |  |
| 26 | TC_FR001_26 | Prequal page loads with HTTP 200 and shows Step 1 of 6 |  |  |  |  |  |
| 27 | TC_FR001_27 | Credit-impact disclaimer is visible before starting |  |  |  |  |  |
| 28 | TC_FR001_28 | Prequal vs full application explainer is shown |  |  |  |  |  |
| 29 | TC_FR001_29 | Mortgage consultant phone CTA is present and dialable |  |  |  |  |  |
| 30 | TC_FR001_30 | Equal Housing Lender disclosure is present |  |  |  |  |  |
| 31 | TC_FR001_31 | Answering Step 1 question advances to Step 2 |  |  |  |  |  |
| 32 | TC_FR001_32 | Progress indicator advances as steps complete |  |  |  |  |  |
| 33 | TC_FR001_33 | Back navigation returns to the previous step |  |  |  |  |  |
| 34 | TC_FR001_34 | Previous answer is retained after back navigation |  |  |  |  |  |
| 35 | TC_FR001_35 | Cannot advance without answering the current question |  |  |  |  |  |
| 36 | TC_FR001_36 | Page works with tracking params stripped |  |  |  |  |  |
| 37 | TC_FR001_37 | Refresh mid-flow keeps the user in the flow |  |  |  |  |  |
| 38 | TC_FR001_38 | Step questions are keyboard navigable |  |  |  |  |  |
| 39 | TC_FR001_39 | Page has no console errors on load |  |  |  |  |  |
| 40 | TC_FR001_40 | Prequal landing renders on supported browsers |  |  |  |  |  |

## Summary

| Total | Passed | Failed | Blocked | Pass % |
| ----- | ------ | ------ | ------- | ------ |
| 40 |  |  |  |  |

