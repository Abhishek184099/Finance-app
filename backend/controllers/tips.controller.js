const User = require('../model/User');
const Transaction = require('../model/Transaction');
const kmeans = require('../utils/kmeans');
const { provideFinancialTips, groupUsersByClusters } = require('../utils/financialTips');

const getFinancialTips = async (req, res) => {
    try {
        const users = await User.find();
        const transactions = await Transaction.find();

        // Prepare data for clustering
        const userSpending = users.map(user => {
            const userTransactions = transactions.filter(t => t.userId.equals(user._id));

            // Calculate total income
            const incomeTransactions = userTransactions.filter(t => t.type === "income");
            const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

            // Calculate total expenses
            const expenseTransactions = userTransactions.filter(t => t.type === "expense");
            const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

            // Calculate spending ratio (expense / income)
            const spendingRatio = totalIncome === 0 ? 0 : totalExpense / totalIncome;

            return { userId: user._id, totalIncome, totalExpense, spendingRatio };
        });

        // Extract spendingRatio for clustering
        const spendingData = userSpending.map(us => us.spendingRatio);

        // Determine the optimal number of clusters using the Elbow Method
        const maxClusters = 10;
        let distortions = [];
        for (let k = 1; k <= maxClusters; k++) {
            const { distortion } = kmeans(spendingData, k);
            distortions.push(distortion);
        }

        // Find the elbow point (optimal k)
        const optimalK = findElbowPoint(distortions);

        // Perform K-means clustering with the optimal k
        const { clusters } = kmeans(spendingData, optimalK);

        // Assign clusters to users
        userSpending.forEach((us, index) => {
            us.cluster = clusters[index];
        });

        // Group users by their clusters
        const groupedClusters = groupUsersByClusters(userSpending, optimalK);

        // Generate financial tips based on clusters
        const tips = provideFinancialTips(groupedClusters, userSpending);

        res.status(200).json({ tips });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function findElbowPoint(distortions) {
    let elbowPoint = 1;
    for (let i = 1; i < distortions.length - 1; i++) {
        if (distortions[i] - distortions[i + 1] < distortions[i - 1] - distortions[i]) {
            elbowPoint = i + 1;
            break;
        }
    }
    return elbowPoint;
}

module.exports = { getFinancialTips };