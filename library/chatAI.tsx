const markdownContent = `
 **Here's a more concise version of the Markdown content:**

## Thai Personal Income Tax

**Understanding Thailand's Progressive Tax System**

Thailand's income tax system is progressive, with higher income brackets taxed at higher rates. 

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

### Tax Calculation Example

For a taxable income of 700,000 Baht:

1. **First 150,000 Baht:** Exempt
2. **Next 150,000 Baht:** 5% tax = 7,500 Baht
3. **Next 200,000 Baht:** 10% tax = 20,000 Baht
4. **Remaining 200,000 Baht:** 15% tax = 30,000 Baht

**Total Tax:** 57,500 Baht

### Tax Residency

You're a tax resident if you spend 180+ days in Thailand per year.

### Personal Allowances

* **Basic Allowance:** 60,000 Baht per person
* **Spouse Allowance:** 60,000 Baht (if spouse has no income)
* **Child Allowance:** 30,000 Baht per child
* **Parent/Disabled Care Allowance:** 30,000-60,000 Baht
* **Other Allowances:** Life insurance, health insurance, pension contributions, mortgage interest, donations

**For accurate calculations and personalized advice, consult a tax professional.**
`;

const getTaxAnswer = async (question: string) => {
    console.log("Question:", question);
    let answer = '';

    try {
        const systemPrompt = `
            Answers questions about Thai personal income tax based on provided data.
            Use the sources to answer the questions; if there isn't enough data in provided sources, say that you don't know.
            Be brief and straight to the point. Wrote in chat clear format.
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

