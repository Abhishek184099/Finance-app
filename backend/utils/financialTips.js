function provideFinancialTips(clusters, userSpendingData) {
    const tips = [];
    clusters.forEach((cluster, index) => {
        const avgSpendingRatio = cluster.reduce((sum, user) => sum + user.spendingRatio, 0) / cluster.length;
        const avgIncome = cluster.reduce((sum, user) => sum + user.totalIncome, 0) / cluster.length;
        const avgExpense = cluster.reduce((sum, user) => sum + user.totalExpense, 0) / cluster.length;

        let tip = `Cluster ${index + 1} (Avg Spending Ratio: ${avgSpendingRatio.toFixed(2)}, Avg Income: ${avgIncome}, Avg Expense: ${avgExpense}):\n`;
        if (avgSpendingRatio < 0.15) {
            tip += "  - You are a **low spender**. You're saving a significant portion of your income. Consider investing in long-term assets like stocks or mutual funds.";
        } else if (avgSpendingRatio >= 0.15 && avgSpendingRatio <= 0.45) {
            tip += "  - You are an **average spender**. You're managing your finances well. Consider creating a budget to optimize your savings further.";
        } else if (avgSpendingRatio > 0.45) {
            tip += "  - You are a **high spender**. Your expenses are high relative to your income. Review your spending habits and identify areas where you can cut back.";
        }
        tips.push(tip);
    });

    return tips;
}

function groupUsersByClusters(userSpending, k) {
    const clusters = Array.from({ length: k }, () => []);
    userSpending.forEach(us => {
        clusters[us.cluster].push(us);
    });
    return clusters;
}

module.exports = {
    provideFinancialTips,
    groupUsersByClusters,
};