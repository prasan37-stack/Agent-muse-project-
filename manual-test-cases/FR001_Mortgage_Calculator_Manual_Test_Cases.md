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
2. Navigate to https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy&refdm=DMIWE7AW9T
3. Wait for page load

## Test Data
| Field | Value |
| ----- | ----- |
| URL | https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy&refdm=DMIWE7AW9T |

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

# FR001 — Get Prequalified Flow: Manual Test Cases (Steps 1–6)

New prequalification URL: `https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy&refdm=DMIWE7AW9T`

---

## Test Case ID
`TC_FR001_26`

## Test Description
Prequal page loads with HTTP 200 and shows Step 1 of 6

## Preconditions
User has internet access

## Test Steps
1. Open browser
2. Navigate to https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy&refdm=DMIWE7AW9T
3. Wait for page load

## Test Data
| Field | Value |
| ----- | ----- |
| URL | https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy&refdm=DMIWE7AW9T |

## Expected Results
HTTP 200; Page loads <3s; 'Step 1 of 6' and 'Get Prequalified' heading visible

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Prequal Landing | **Test Type:** Smoke | **Priority:** Critical

---

## Test Case ID
`TC_FR001_27`

## Test Description
Credit-impact disclaimer is visible before starting

## Preconditions
Prequal page loaded

## Test Steps
1. Load the prequal page
2. Read the intro text above Question 1

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
Text states the user's credit will not be affected by providing details

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Prequal Landing | **Test Type:** Functional | **Priority:** High

---

## Test Case ID
`TC_FR001_28`

## Test Description
Prequal vs full application explainer is shown

## Preconditions
Prequal page loaded

## Test Steps
1. Load the prequal page
2. Locate the explainer text about prequalification vs full loan application

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
Explainer clarifies a prequalification is not the same as completing a full loan application

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Prequal Landing | **Test Type:** Functional | **Priority:** Medium

---

## Test Case ID
`TC_FR001_29`

## Test Description
Mortgage consultant phone CTA is present and dialable

## Preconditions
Prequal page loaded

## Test Steps
1. Load the prequal page
2. Find the 'Call us' number 1-888-446-2350
3. Verify it is a tel: link

## Test Data
| Field | Value |
| ----- | ----- |
| Phone | 1-888-446-2350 |

## Expected Results
Phone number visible; link uses tel: so it dials on mobile devices

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Prequal Landing | **Test Type:** Functional | **Priority:** Medium

---

## Test Case ID
`TC_FR001_30`

## Test Description
Equal Housing Lender disclosure is present

## Preconditions
Prequal page loaded

## Test Steps
1. Load the prequal page
2. Scroll to footer disclosures

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
'Equal Housing Lender' and 'Wells Fargo Home Mortgage is a division of Wells Fargo Bank, N.A.' are visible

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Prequal Landing | **Test Type:** Compliance | **Priority:** High

---

## Test Case ID
`TC_FR001_31`

## Test Description
Answering Step 1 question advances to Step 2

## Preconditions
Prequal page loaded at Step 1

## Test Steps
1. Read Question 1
2. Select an answer option
3. Wait for transition

## Test Data
| Field | Value |
| ----- | ----- |
| Question 1 | any valid option |

## Expected Results
Flow advances to 'Step 2 of 6'; selected answer recorded

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Step Navigation | **Test Type:** Functional | **Priority:** Critical

---

## Test Case ID
`TC_FR001_32`

## Test Description
Progress indicator advances as steps complete

## Preconditions
Prequal page loaded at Step 1

## Test Steps
1. Note the 'Step 1 of 6' indicator
2. Answer Question 1
3. Observe the indicator

## Test Data
| Field | Value |
| ----- | ----- |
| Question 1 | any valid option |

## Expected Results
Indicator updates to 'Step 2 of 6'; completed step marked done

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Step Navigation | **Test Type:** Functional | **Priority:** High

---

## Test Case ID
`TC_FR001_33`

## Test Description
Back navigation returns to the previous step

## Preconditions
User is on Step 2

## Test Steps
1. Answer Question 1 to reach Step 2
2. Click Back
3. Verify current step

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
Flow returns to 'Step 1 of 6' without errors

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Step Navigation | **Test Type:** Functional | **Priority:** High

---

## Test Case ID
`TC_FR001_34`

## Test Description
Previous answer is retained after back navigation

## Preconditions
User is on Step 2 after answering Question 1

## Test Steps
1. Answer Question 1 (remember the choice)
2. Click Back to Step 1
3. Check the options

## Test Data
| Field | Value |
| ----- | ----- |
| Question 1 | first option selected |

## Expected Results
Previously selected option is still selected on Step 1

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Step Navigation | **Test Type:** Functional | **Priority:** High

---

## Test Case ID
`TC_FR001_35`

## Test Description
Cannot advance without answering the current question

## Preconditions
Prequal page loaded at Step 1, no option selected

## Test Steps
1. Leave Question 1 unanswered
2. Click Next/Continue (if present)
3. Observe behavior

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
Flow stays on Step 1; a validation message prompts the user to answer

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Validation — behavior may vary if flow auto-advances on selection | **Test Type:** Negative | **Priority:** High

---

## Test Case ID
`TC_FR001_36`

## Test Description
Page works with tracking params stripped

## Preconditions
User has internet access

## Test Steps
1. Navigate to https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy (no _gl/_ga params)
2. Wait for load

## Test Data
| Field | Value |
| ----- | ----- |
| URL | https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy |

## Expected Results
HTTP 200; Step 1 renders normally without analytics params

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Prequal Landing | **Test Type:** Functional | **Priority:** Medium

---

## Test Case ID
`TC_FR001_37`

## Test Description
Refresh mid-flow keeps the user in the flow

## Preconditions
User is on Step 2

## Test Steps
1. Answer Question 1 to reach Step 2
2. Refresh the browser
3. Observe the restored state

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
User remains in the prequal flow (Step 1 or 2 restored); no blank page or error

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Resilience | **Test Type:** Functional | **Priority:** Medium

---

## Test Case ID
`TC_FR001_38`

## Test Description
Step questions are keyboard navigable

## Preconditions
Prequal page loaded at Step 1

## Test Steps
1. Press Tab repeatedly
2. Verify focus moves visibly through options
3. Select an option with keyboard

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
All options reachable and operable by keyboard; focus indicator visible

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Accessibility | **Test Type:** Accessibility | **Priority:** Medium

---

## Test Case ID
`TC_FR001_39`

## Test Description
Page has no console errors on load

## Preconditions
DevTools console open; Prequal page loading

## Test Steps
1. Open DevTools console
2. Load the prequal page
3. Check for errors

## Test Data
| Field | Value |
| ----- | ----- |
| Input | N/A |

## Expected Results
No uncaught exceptions or console errors on initial load

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Resilience | **Test Type:** Non-functional | **Priority:** Medium

---

## Test Case ID
`TC_FR001_40`

## Test Description
Prequal landing renders on supported browsers

## Preconditions
Chrome/Firefox/Safari available

## Test Steps
1. Open the prequal URL in Chrome, Firefox, Safari, Edge
2. Verify heading, step indicator, and options render

## Test Data
| Field | Value |
| ----- | ----- |
| Browsers | Chrome 120+, Firefox 115+, Safari 17+, Edge 120+ |

## Expected Results
UI renders consistently; no broken layout; all Step 1 elements visible and usable

## Actual Results
_(fill in during execution)_

## Status
`Pass / Fail` _(fill in during execution)_

## Notes
**Req ID:** FR001 | **Module/Feature:** Prequal Landing | **Test Type:** Compatibility | **Priority:** High
