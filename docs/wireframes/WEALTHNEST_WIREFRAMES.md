# WealthNest — Low-Fidelity Wireframes & Screen Planning Blueprint

**Project:** WealthNest — Unified Wealth, Insurance, Tax & Estate Ecosystem  
**Author:** Person 1 — UI/UX & Product Design  
**Date:** October 2026  
**Document Version:** 1.0  
**Scope:** Low-Fidelity Layout Schematics, Component Hierarchy, Grid Allocations & Interaction Blueprints for WealthNest's 5 Core Financial Domains.

---

## Screen Directory & Information Architecture

1. **Screen W-01:** Value-First Onboarding & Goal Profiling (`/onboarding`)
2. **Screen W-02:** Unified Net Worth & Investments Dashboard (`/investments`)
3. **Screen W-03:** Insurance Protection Hub & Coverage Gap Analyzer (`/insurance`)
4. **Screen W-04:** Income Tax Optimizer & Dual-Regime Comparator (`/tax`)
5. **Screen W-05:** Inheritance Vault & Digital Nominee Allocator (`/inheritance`)
6. **Screen W-06:** Global Navigation & Master Dashboard Shell (`/app-shell`)

---

## 1. Value-First Onboarding (`/onboarding`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| WealthNest                              [Help]   [Save & Exit]   Step 2 of 3  |
+-------------------------------------------------------------------------------+
| [===== PROGRESS: STEP 2 - DEFINE YOUR FINANCIAL FREEDOM PROFILE =====-------] |
|                                                                               |
|                   TELL US ABOUT YOUR WEALTH MILESTONES                        |
|   We calibrate your asset allocation and tax shield before asking for KYC.    |
|                                                                               |
|   1. What is your primary investment objective?                               |
|   [ ] Early Retirement (FIRE)    [x] Wealth Compounding    [ ] Child Higher Ed|
|   [ ] Real Estate Purchase       [ ] Tax Optimization      [ ] Estate Security|
|                                                                               |
|   2. Monthly Surplus for Deployment:                                          |
|   [ ₹ 50,000 / month                                                        ] |
|   (Min: ₹ 5,000  ================O================= Max: ₹ 5,00,000)          |
|                                                                               |
|   3. Scenario Risk Calibration:                                               |
|   "If market volatility causes your portfolio to drop 12% in 3 weeks, you..." |
|   ( ) Panic and sell everything to protect capital                            |
|   (o) Hold steady and let systematic SIP rebalance over time                  |
|   ( ) Deploy additional cash reserves to buy the dip at discount              |
|                                                                               |
|   [SIMULATED 10-YEAR PROJECTION PREVIEW]                                      |
|   Invested Capital: ₹60,00,000  ====>  Projected Value (@12%): ₹1,16,16,954   |
|                                                                               |
|   [ <- BACK TO BASIC INFO ]                   [ LOCK TARGET & CONTINUE -> ]   |
|   Auto-saved 10 seconds ago * AES-256 Cloud Encrypted                         |
+-------------------------------------------------------------------------------+
```

---

## 2. Investments & Portfolio Dashboard (`/investments`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| WealthNest   [Investments]   Insurance   Tax   Inheritance   [Search ⌘K]  (User)|
+-------------------------------------------------------------------------------+
| TOTAL PORTFOLIO NET WORTH                             [1-CLICK REBALANCE REQ] |
| ₹ 48,25,400.00                                        Variance: Equity +6.2%  |
| [ + ₹ 34,200.00 (+0.71%) TODAY ]   [ XIRR: 15.4% ]    [EXECUTE REBALANCE ->]  |
|                                                                               |
| +-----------------------------------------+ +-------------------------------+ |
| | ASSET ALLOCATION DONUT (INTERACTIVE)    | | TOP MOVERS & PERFORMANCE      | |
| |        ###########                      | | NIFTY 50: 25,140 (+0.4%)      | |
| |     ### Equity 64%###                   | | S&P BSE SENSEX: 82,200 (+0.3%)| |
| |   ##               ##                   | |                               | |
| |  #   Debt 24%       #                   | | [Equity Holdings: ₹30.8L]     | |
| |   ##               ##                   | | Parag Parikh Flexi Cap: +21.4%| |
| |     ### Gold 12% ###                    | | Mirae Asset Large Cap:  +14.8%| |
| |        ###########                      | |                               | |
| | Tap any slice to filter holdings below  | | [Debt / Arbitrage: ₹11.5L]    | |
| | Target: 60% Eq / 30% Debt / 10% Gold    | | ICICI Corporate Bond:    +7.6%| |
| +-----------------------------------------+ +-------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | FILTERED HOLDINGS DIRECTORY [SEARCH ASSET...]      [+ START NEW SIP / LUMPSUM]
| | Asset Name             Type      Invested      Current Value    Return (%)| |
| |---------------------------------------------------------------------------| |
| | Parag Parikh Flexi     MF (Eq)   ₹ 8,00,000    ₹ 11,42,000      +42.7%    | |
| | HDFC Balanced Adv.     Hybrid    ₹ 5,00,000    ₹  6,85,000      +37.0%    | |
| | Sovereign Gold Bonds   Gold      ₹ 3,50,000    ₹  5,20,000      +48.5%    | |
| | SBI 1-Year Fixed Dep.  Debt      ₹ 5,00,000    ₹  5,35,000       +7.0%    | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 3. Insurance Protection Hub (`/insurance`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| WealthNest   Investments   [Insurance]   Tax   Inheritance   [Search ⌘K]  (User)|
+-------------------------------------------------------------------------------+
| FAMILY PROTECTION SCORE: 82 / 100               [CRITICAL GAP: CRITICAL ILL]  |
| "Your Life coverage is optimal; Health requires ₹10L Super Top-Up buffer."    |
|                                                                               |
| [ LIFE COVER: ₹2.0 CRORE (15x Inc) ]     [ HEALTH COVER: ₹25 LAKHS (Adequate)]|
|                                                                               |
| ACTIVE POLICIES IN FORCE (3)                                                  |
| +-----------------------------------+ +-------------------------------------+ |
| | HDFC LIFE CLICK 2 PROTECT         | | CARE HEALTH OPTIMA RESTORE          | |
| | Type: Pure Term Life Insurance    | | Type: Comprehensive Family Floater  | |
| | Sum Insured: ₹ 2,00,00,000        | | Sum Insured: ₹ 25,00,000            | |
| | Covered: Self (Age 32)            | | Covered: Self, Spouse, 1 Child      | |
| | Annual Premium: ₹ 18,400          | | Annual Premium: ₹ 26,500            | |
| | Next Renewal: 14 Nov 2026 (43 days)| Next Renewal: 02 Jan 2027            | |
| | [VIEW POLICY DOCS] [SUBMIT CLAIM] | | [VIEW CASHLESS HOSPITALS] [CLAIM]   | |
| +-----------------------------------+ +-------------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | EMERGENCY CASHLESS CLAIMS ASSISTANT                                       | |
| | In hospital? Tap to initiate 30-minute cashless approval assist.          | |
| | [ INITIATE EMERGENCY HOSPITAL ADMISSION CLAIM ]   [ 24/7 HELPLINE SPEED-DIAL|
| +---------------------------------------------------------------------------+ |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 4. Income Tax Optimizer (`/tax`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| WealthNest   Investments   Insurance   [Tax]   Inheritance   [Search ⌘K]  (User)|
+-------------------------------------------------------------------------------+
| FISCAL YEAR 2026-27 TAX PROJECTION             [RECOMMENDATION: NEW REGIME]   |
| "The New Tax Regime saves you ₹ 24,800 compared to Old Regime exemptions."   |
|                                                                               |
| +-----------------------------------------+ +-------------------------------+ |
| | REGIME COMPARATOR PREVIEW               | | DEDUCTIONS OPTIMIZATION BAR   | |
| | Metric             Old Regime   New Reg | | Section 80C (PPF/ELSS/EPF)    | |
| | Gross Total:       ₹24,00,000   ₹24.0L  | | [====================] ₹1.50L | |
| | Total Deductions:  ₹ 3,75,000   ₹ 0.75L | | STATUS: 100% EXHAUSTED (MAX)  | |
| | Taxable Income:    ₹20,25,000   ₹23.25L | |                               | |
| | Net Tax Payable:   ₹ 4,34,200   ₹4,09,400 | Section 80D (Health Ins.)     | |
| | You Save with New:             +₹24,800 | | [============--------] ₹18.4K| |
| | [SWITCH TAX FILING REGIME TO NEW]       | | GAP: Save ₹6.6K more in taxes | |
| +-----------------------------------------+ +-------------------------------+ |
|                                                                               |
| ADVANCE TAX QUARTERLY TIMELINE                                                |
| Q1 (Jun 15): [PAID: ₹60,000 v]  ===>  Q2 (Sep 15): [PAID: ₹60,000 v]          |
| Q3 (Dec 15): [DUE IN 74 DAYS - Est: ₹62,000] ===> Q4 (Mar 15): [PENDING]     |
|                                                                               |
| [ DOWNLOAD FORM 16 & CAPITAL GAINS SCHEDULE FOR ITR FILING (EXCEL/PDF) ]      |
+-------------------------------------------------------------------------------+
```

---

## 5. Inheritance & Estate Vault (`/inheritance`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| WealthNest   Investments   Insurance   Tax   [Inheritance]   [Search ⌘K]  (User)|
+-------------------------------------------------------------------------------+
| FAMILY ESTATE & LEGACY VAULT                    [VAULT STATUS: 100% BALANCED] |
| All ₹48.25L registered assets have designated nominees and legal custody.     |
|                                                                               |
| BENEFICIARY ALLOCATION MATRIX (TOTAL: 100%)                                   |
| +---------------------------------------------------------------------------+ |
| | Nominee 1: Ananya Mapari (Spouse) - Primary Beneficiary                   | |
| | Allocation: 60%  (₹ 28,95,240)                                            | |
| | [==========================================----------------------] 60%   | |
| | Assigned Assets: Demat Stock Portfolio, HDFC Term Life, Primary Residence | |
| |                                                                           | |
| | Nominee 2: Kabir Mapari (Son, Minor)                                       | |
| | Allocation: 40%  (₹ 19,30,160) - Guardian: Ananya Mapari                  | |
| | [------------------------------------------======================] 40%   | |
| | Assigned Assets: PPF Account, Sovereign Gold Bonds, Mutual Funds SIP      | |
| |                                                                           | |
| | [ + ADD ANOTHER BENEFICIARY ]              [ AUTO-BALANCE EQUALLY TO 100%]| |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| +-----------------------------------------+ +-------------------------------+ |
| | DIGITAL WILL GENERATION ASSISTANT       | | EMERGENCY HANDOVER PROTOCOL   | |
| | Status: Valid Draft Ready               | | Inactivity Trigger: 180 Days  | |
| | 3 Witnesses Registered                  | | 2-Tier Nominee Verification   | |
| | Legal Stamp Fee: Paid                   | | Physical Vault Location: Pune | |
| | [DOWNLOAD ATTESTED WILL PREVIEW (PDF)]  | | [CONFIGURE HANDOVER KEYS]     | |
| +-----------------------------------------+ +-------------------------------+ |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

*Authored by Person 1 (UI/UX & Product Design) — WealthNest Wireframe Planning.*
