const markdownContent = `
        Here's the improved Markdown content for the Thai Personal Income Tax rates, incorporating the updated tax brackets:

**Understanding Thailand's Progressive Tax System**

Thailand's personal income tax system is progressive, meaning your tax rate increases as your income rises. Let's break down how it works.

### Tax Brackets

| Net Income (Baht/Year) | Tax Rate |
|---|---|
| 0 - 150,000 | Exempt |
| 150,001 - 300,000 | 5% |
| 300,001 - 500,000 | 10% |
| 500,001 - 750,000 | 15% |
| 750,001 - 1,000,000 | 20% |
| 1,000,001 - 2,000,000 | 25% |
| 2,000,001 - 5,000,000 | 30% |
| Over 5,000,000 | 35% |

### How to Calculate Your Tax

**Let's use an example:**

Suppose your annual taxable income is 700,000 Baht. Here's how to calculate your tax:

1. **First 150,000 Baht:** Exempt from tax.
2. **Next 150,000 Baht (150,001 - 300,000):** Taxed at 5% = 7,500 Baht.
3. **Next 200,000 Baht (300,001 - 500,000):** Taxed at 10% = 20,000 Baht.
4. **Remaining 200,000 Baht (500,001 - 700,000):** Taxed at 15% = 30,000 Baht.

**Total Tax:** 7,500 + 20,000 + 30,000 = 57,500 Baht.

**Note:** The tax brackets and rates are subject to change. For the most accurate and up-to-date information, please refer to the official Thai Revenue Department website or consult a tax advisor.


### Tax Residency

You're considered a tax resident in Thailand if you spend 180 days or more in the country during a calendar year.

**Want to calculate your tax?**

**Just provide your annual income, and I can help you figure out your tax liability.** 

*For more accurate calculations, consult a tax professional.*

Here's the improved Markdown content for the Thai Personal Income Tax allowances, incorporating the information from the image you provided:

**Understanding Personal Allowances in Thailand**

After deducting expenses, you can claim various personal allowances to reduce your taxable income. Here's a breakdown of the allowances available:

### Personal Allowances

| Allowance | Amount (Baht) |
|---|---|
| Taxpayer | 60,000 |
| Spouse (if spouse has no income) | 60,000 |
| Legitimate child of the taxpayer or spouse (without limit), each | 30,000 |
| Additional allowance for legitimate child of the taxpayer or spouse from the second child onwards who was born in or after 2018, each | 30,000 |
| Taxpayer's adopted child (maximum 3), each (If there are legitimate and adopted children together, a maximum of only 3 children is allowed) | 30,000 |
| Parental care, each | 30,000 |
| Care of disabled or incapacitated family members, each | 60,000 |
| Care of a disabled or incapacitated person other than a family member | 60,000 |

**Note:** A resident of Thailand who is 65 years of age or older is entitled to personal income tax exemption on income up to an amount not exceeding 190,000 Baht.

By understanding these allowances, you can effectively reduce your taxable income and minimize your tax liability. 

## Here's the improved Markdown content for the Thai Personal Income Tax allowances, incorporating the information from the image you provided:

**Understanding Specific Allowances in Thailand**

In addition to the general personal allowances, there are specific allowances that can further reduce your taxable income. Here are some of them:

### Specific Allowances

* **Life Insurance Premiums:**
  * Life insurance premiums paid to an insurer not exceeding Baht 100,000 per year.
  * Deposits with banks in the type similar to life insurance, for a minimum period of ten years and the insurer is not exceeding Baht 100,000 per year. However, the total amount of life insurance premium and deposits with banks in the type similar to life insurance, for a minimum period of ten years, should not exceed Baht 100,000 in each tax year.
* **Health Insurance Premium:**
  * A health insurance premium, up to a maximum of Baht 15,000 per year, paid to a life insurance company in Thailand.
  * A health insurance premium, up to a maximum of Baht 100,000 per year, paid to a health insurance company in Thailand. However, the total amount of life insurance premium and health insurance premium together must not exceed Baht 100,000 in each tax year.
* **Pension Fund Contributions:**
  * Qualified pension life insurance premiums paid to a Thai insurer in an amount not exceeding 15% of assessable income received which is subject to income tax, with a maximum of Baht 200,000.
  * Contributions to a registered provident fund in an amount not exceeding 15% of assessable income received which is subject to income tax, with a maximum of Baht 200,000.
  * Investment in a super savings fund in an amount not exceeding 30% of the assessable income received which is subject to income tax, with a maximum of Baht 200,000.
* **Mortgage Interest:**
  * Mortgage interest incurred for the purchase or construction of a residential house in Thailand, up to a maximum of Baht 100,000.
* **Donations:**
  * Donations to the government's social security fund.
  * Donations to educational institutions, public health facilities, religious institutions, approved charities, and the Office of the Permanent Secretary, Prime Minister's Office.
  * Donations to the National Vaccine Institute (NVI) to support research, development, manufacture, and distribution of vaccines.

**Note:** These allowances are subject to certain conditions and limitations. It's recommended to consult a tax professional for specific advice and the most up-to-date information.

By understanding these specific allowances, you can further optimize your tax planning and reduce your overall tax liability. 
`;

const getTaxAnswer = async (question: string) => {
    console.log("Question:", question);
    let answer = '';

    try {
        const systemPrompt = `
            Answers questions about Thai personal income tax based on provided data.
            Use the sources to answer the questions; if there isn't enough data in provided sources, say that you don't know.
            Be brief and straight to the point. Wrote in chat format.
        `;
        const sources = `### Relevant Information:\n\n${markdownContent}`;

        console.log("Source", sources);

        const response = await fetch('http://localhost:3001/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "Mathstral",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `${question}\n\nSOURCES:\n${sources}` }
                ],
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            console.error("Error: HTTP status", response.status);
            return 'An error occurred while fetching the answer.';
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Check if `choices` exists in the response and has content
        if (data.choices && data.choices[0] && data.choices[0].message) {
            answer = data.choices[0].message.content;
        } else {
            console.error("Unexpected response format:", data);
            answer = 'No answer available due to an unexpected response format.';
        }

        return answer;

    } catch (error) {
        console.error("Error fetching answer:", error);
        return 'An error occurred while fetching the answer.';
    }
};

export default getTaxAnswer;

