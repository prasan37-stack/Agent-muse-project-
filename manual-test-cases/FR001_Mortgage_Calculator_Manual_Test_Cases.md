# FR001 — Mortgage Calculator: Manual Test Cases (Detailed)

Source: `Detailed_TestCases_FR001_Mortgage_Calculator.xlsx` — 25 test cases.
Each case below follows the full manual test case template. Fill in **Actual Results** and **Status** during execution.

---

## Test Case ID
`TC_FR001_01`

## Test Description
Verify calculator URL loads successfully

## Preconditions
User has internet access

## Test Steps
1. Open browser
2. Navigate to https://www.wellsfargo.com/mortgage/tools/rate_calc/input_page
3. Wait for page load

## Test Data
| Field | Value |
| ----- | ----- |
| URL | https://www.wellsfargo.com/mortgage/tools/rate_calc/input_page |

## Expected Results
HTTP 200; Page loads <3s; Calculator form visible with Wells Fargo header

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Page Load | **Test Type:** Smoke | **Priority:** Critical | **Notes:** Baseline test for all others

---

## Test Case ID
`TC_FR001_02`

## Test Description
Verify page elements render on supported browsers

## Preconditions
User has Chrome/Firefox/Safari

## Test Steps
1. Open URL in Chrome, Firefox, Safari, Edge
2. Verify calculator form, headers, footer, and branding render correctly

## Test Data
| Field | Value |
| ----- | ----- |
| Browsers | Chrome 120+, Firefox 115+, Safari 17+, Edge 120+ |

## Expected Results
UI renders consistently; no broken layout; all form fields visible and accessible

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Page Load | **Test Type:** Compatibility | **Priority:** High | **Notes:** Test on desktop + mobile viewports

---

## Test Case ID
`TC_FR001_03`

## Test Description
Verify Loan Purpose dropdown displays Purchase option

## Preconditions
Calculator page loaded

## Test Steps
1. Click 'Loan Purpose' dropdown
2. Verify 'Purchase' option exists
3. Select 'Purchase'

## Test Data
| Field | Value |
| ----- | ----- |
| Loan Purpose | Purchase |

## Expected Results
'Purchase' option present and selectable

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-a | **Module/Feature:** Loan Purpose | **Test Type:** Functional | **Priority:** High

---

## Test Case ID
`TC_FR001_04`

## Test Description
Verify Loan Purpose dropdown displays Refinance option

## Preconditions
Calculator page loaded

## Test Steps
1. Click 'Loan Purpose' dropdown
2. Verify 'Refinance' option exists
3. Select 'Refinance'

## Test Data
| Field | Value |
| ----- | ----- |
| Loan Purpose | Refinance |

## Expected Results
'Refinance' option present and selectable

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-a | **Module/Feature:** Loan Purpose | **Test Type:** Functional | **Priority:** High

---

## Test Case ID
`TC_FR001_05`

## Test Description
Verify Loan Purpose is mandatory field

## Preconditions
Calculator page loaded

## Test Steps
1. Leave 'Loan Purpose' blank
2. Fill all other required fields
3. Click 'Calculate Rates and Payments'
4. Check for validation

## Test Data
| Field | Value |
| ----- | ----- |
| Loan Purpose | [blank] |

## Expected Results
Validation message: 'Loan Purpose is required' and calculation blocked

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-a | **Module/Feature:** Loan Purpose | **Test Type:** Negative | **Priority:** High

---

## Test Case ID
`TC_FR001_06`

## Test Description
Verify Home Value accepts minimum valid amount

## Preconditions
Calculator page loaded

## Test Steps
1. Enter '50000' in Home Value
2. Tab out of field
3. Verify no error

## Test Data
| Field | Value |
| ----- | ----- |
| Home Value | 50000 |

## Expected Results
Value accepted; no validation error

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-b | **Module/Feature:** Home Value | **Test Type:** Boundary | **Priority:** High | **Notes:** Check min loan amount per product

---

## Test Case ID
`TC_FR001_07`

## Test Description
Verify Home Value accepts maximum valid amount

## Preconditions
Calculator page loaded

## Test Steps
1. Enter '10000000' in Home Value
2. Tab out of field
3. Verify no error

## Test Data
| Field | Value |
| ----- | ----- |
| Home Value | 10000000 |

## Expected Results
Value accepted; no validation error or 'exceeds max' error per business rules

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-b | **Module/Feature:** Home Value | **Test Type:** Boundary | **Priority:** Medium | **Notes:** Check max jumbo limit

---

## Test Case ID
`TC_FR001_08`

## Test Description
Verify Home Value accepts decimal values

## Preconditions
Calculator page loaded

## Test Steps
1. Enter '450000.50' in Home Value
2. Verify field accepts decimals

## Test Data
| Field | Value |
| ----- | ----- |
| Home Value | 450000.50 |

## Expected Results
Decimals accepted and formatted correctly, e.g. $450,000.50

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-b | **Module/Feature:** Home Value | **Test Type:** Functional | **Priority:** Medium | **Notes:** Verify rounding rules

---

## Test Case ID
`TC_FR001_09`

## Test Description
Verify Home Value rejects alphabetic characters

## Preconditions
Calculator page loaded

## Test Steps
1. Enter 'FourHundredK' in Home Value
2. Tab out
3. Verify inline error

## Test Data
| Field | Value |
| ----- | ----- |
| Home Value | FourHundredK |

## Expected Results
Inline error: 'Please enter a valid number' and field highlighted

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-b | **Module/Feature:** Home Value | **Test Type:** Negative | **Priority:** Medium

---

## Test Case ID
`TC_FR001_10`

## Test Description
Verify Home Value rejects special characters & symbols

## Preconditions
Calculator page loaded

## Test Steps
1. Enter '$500,000!' in Home Value
2. Tab out
3. Verify inline error

## Test Data
| Field | Value |
| ----- | ----- |
| Home Value | $500,000! |

## Expected Results
Inline error: 'Please enter a valid number'; special chars stripped or rejected

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-b | **Module/Feature:** Home Value | **Test Type:** Negative | **Priority:** Medium

---

## Test Case ID
`TC_FR001_11`

## Test Description
Verify Loan Amount accepts valid amount < Home Value

## Preconditions
Home Value = 500000 entered

## Test Steps
1. Home Value = 500000
2. Enter Loan Amount = 400000
3. Verify no error

## Test Data
| Field | Value |
| ----- | ----- |
| Home Value | 500000, Loan Amount: 400000 |

## Expected Results
Value accepted; LTV = 80% which is valid

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-c | **Module/Feature:** Loan Amount | **Test Type:** Functional | **Priority:** High | **Notes:** 80% LTV common threshold

---

## Test Case ID
`TC_FR001_12`

## Test Description
Verify Loan Amount rejects 0 or negative values

## Preconditions
Home Value = 500000 entered

## Test Steps
1. Enter Loan Amount = 0
2. Tab out
3. Verify error
4. Enter -10000
5. Verify error

## Test Data
| Field | Value |
| ----- | ----- |
| Loan Amount | 0, -10000 |

## Expected Results
Error: 'Loan amount must be greater than $0'

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-c | **Module/Feature:** Loan Amount | **Test Type:** Negative | **Priority:** High | **Notes:** Boundary: 0

---

## Test Case ID
`TC_FR001_13`

## Test Description
Verify Loan Amount rejects value > Home Value (LTV > 100%)

## Preconditions
Home Value = 300000 entered

## Test Steps
1. Home Value = 300000
2. Enter Loan Amount = 350000
3. Click Calculate
4. Verify LTV error

## Test Data
| Field | Value |
| ----- | ----- |
| Home Value | 300000, Loan Amount: 350000 |

## Expected Results
Error: 'Loan amount cannot exceed home value' or LTV error shown

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-c | **Module/Feature:** Loan Amount | **Test Type:** Negative | **Priority:** Critical | **Notes:** Key business rule

---

## Test Case ID
`TC_FR001_14`

## Test Description
Verify Loan Amount accepts decimal values

## Preconditions
Home Value = 500000 entered

## Test Steps
1. Enter Loan Amount = 399999.99
2. Verify field accepts decimals

## Test Data
| Field | Value |
| ----- | ----- |
| Loan Amount | 399999.99 |

## Expected Results
Decimals accepted; $399,999.99 displays

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-c | **Module/Feature:** Loan Amount | **Test Type:** Functional | **Priority:** Medium | **Notes:** Check .99 handling

---

## Test Case ID
`TC_FR001_15`

## Test Description
Verify Loan Amount mandatory field validation

## Preconditions
All other fields filled

## Test Steps
1. Leave Loan Amount blank
2. Fill other fields
3. Click Calculate
4. Verify 'Required field' error

## Test Data
| Field | Value |
| ----- | ----- |
| Loan Amount | [blank] |

## Expected Results
Error: 'Loan Amount is required' and field highlighted

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-c | **Module/Feature:** Loan Amount | **Test Type:** Negative | **Priority:** High

---

## Test Case ID
`TC_FR001_16`

## Test Description
Verify State dropdown contains all 50 US states + DC

## Preconditions
Calculator page loaded

## Test Steps
1. Click State dropdown
2. Scroll list
3. Verify 50 states + DC present
4. Verify sorted A-Z

## Test Data
| Field | Value |
| ----- | ----- |
| State | Check full list |

## Expected Results
All 50 states + DC present; 'New Jersey' exists; List sorted alphabetically

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-d | **Module/Feature:** Location | **Test Type:** Functional | **Priority:** High | **Notes:** Validate against USPS list

---

## Test Case ID
`TC_FR001_17`

## Test Description
Verify State dropdown defaults to blank/Select State

## Preconditions
Calculator page loaded

## Test Steps
1. Load page fresh
2. Check State dropdown default value

## Test Data
| Field | Value |
| ----- | ----- |
| State | Default |

## Expected Results
Default text is 'Select State' or blank, not pre-populated

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-d | **Module/Feature:** Location | **Test Type:** UI | **Priority:** Low

---

## Test Case ID
`TC_FR001_18`

## Test Description
Verify County dropdown disabled until State selected

## Preconditions
Calculator page loaded

## Test Steps
1. Load page
2. Check County dropdown state
3. Verify it is disabled/grayed out

## Test Data
| Field | Value |
| ----- | ----- |
| State | [not selected] |

## Expected Results
County dropdown is disabled until State is chosen

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-d | **Module/Feature:** Location | **Test Type:** UI | **Priority:** Medium | **Notes:** Dependent dropdown logic

---

## Test Case ID
`TC_FR001_19`

## Test Description
Verify County list filters correctly for selected State

## Preconditions
State = 'New Jersey' selected

## Test Steps
1. Select State = 'New Jersey'
2. Click County dropdown
3. Verify only NJ counties listed
4. Select 'Gloucester'

## Test Data
| Field | Value |
| ----- | ----- |
| State | New Jersey, County: Gloucester |

## Expected Results
County list shows 'Atlantic, Bergen, Burlington... Gloucester...'; No out-of-state counties

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-d | **Module/Feature:** Location | **Test Type:** Functional | **Priority:** High | **Notes:** Spot check 3 states

---

## Test Case ID
`TC_FR001_20`

## Test Description
Verify Calculate button enabled only when all required fields filled

## Preconditions
All fields filled with valid data

## Test Steps
1. Fill fields one by one
2. Observe Calculate button state
3. Verify it enables only when all required fields have valid data

## Test Data
| Field | Value |
| ----- | ----- |
| Input | All valid inputs |

## Expected Results
Button disabled/grayed until all required fields valid; Enables when complete

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-e | **Module/Feature:** Calculate Action | **Test Type:** Functional | **Priority:** Critical | **Notes:** Key gating logic

---

## Test Case ID
`TC_FR001_21`

## Test Description
Verify Calculate button triggers API call with valid data

## Preconditions
All fields filled with valid data

## Test Steps
1. Fill all valid: Purchase, 500000, 400000, NJ, Gloucester
2. Open Network tab
3. Click Calculate
4. Verify POST request sent with correct payload

## Test Data
| Field | Value |
| ----- | ----- |
| Payload | {purpose:'Purchase',homeValue:500000,loanAmount:400000,state:'NJ',county:'Gloucester'} |

## Expected Results
Network shows 200 OK; Response contains rates/payments JSON; User navigates to results

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-e | **Module/Feature:** Calculate Action | **Test Type:** Integration | **Priority:** Critical | **Notes:** Check payload mapping

---

## Test Case ID
`TC_FR001_22`

## Test Description
Verify system handles API timeout gracefully

## Preconditions
All fields filled, simulate network delay

## Test Steps
1. Use throttling to simulate 30s+ response
2. Click Calculate
3. Verify loading spinner shows
4. Verify timeout message after threshold

## Test Data
| Field | Value |
| ----- | ----- |
| Network | Slow 3G |

## Expected Results
Loading indicator displays; After 30s, 'Request timed out. Please try again' message

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-e | **Module/Feature:** Calculate Action | **Test Type:** Negative | **Priority:** Medium | **Notes:** Performance/SRE scenario

---

## Test Case ID
`TC_FR001_23`

## Test Description
Verify results page shows estimated rate range

## Preconditions
Calculation completed

## Test Steps
1. Complete valid calculation
2. On results page, locate 'Estimated Rate' section
3. Verify rate or rate range displays

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
Rates displayed, e.g. '3.625% - 4.125% APR' with disclaimer

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-e | **Module/Feature:** Calculate Action | **Test Type:** Functional | **Priority:** High | **Notes:** Verify legal disclaimer present

---

## Test Case ID
`TC_FR001_24`

## Test Description
Verify results page shows monthly payment breakdown

## Preconditions
Calculation completed

## Test Steps
1. Complete valid calculation
2. On results page, locate 'Monthly Payment'
3. Verify Principal+Interest, Taxes, Insurance breakdown shown

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
Monthly payment shows P&I + estimated taxes + insurance + total

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-e | **Module/Feature:** Calculate Action | **Test Type:** Functional | **Priority:** High | **Notes:** Check math accuracy

---

## Test Case ID
`TC_FR001_25`

## Test Description
Verify 'Start Over' or 'Edit' option returns to input page

## Preconditions
Results page displayed

## Test Steps
1. On results page, click 'Edit' or 'Start Over'
2. Verify user returns to input page
3. Verify previous values are retained or cleared per spec

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
User redirected to input page; Fields pre-filled with last search OR cleared

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001-e | **Module/Feature:** Calculate Action | **Test Type:** Usability | **Priority:** Low | **Notes:** Confirm with UX spec
