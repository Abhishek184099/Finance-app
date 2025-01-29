function kmeans(data, k, maxIterations = 100) {
    
    let centroids = initializeCentroids(data, k);
    let clusters = new Array(data.length);
    let distortion = 0;

    for (let i = 0; i < maxIterations; i++) {
        
        clusters = assignClusters(data, centroids);

        // Calculate new centroids
        const newCentroids = calculateCentroids(data, clusters, k);

        // Check for convergence
        if (centroids.every((c, index) => c === newCentroids[index])) {
            break;
        }

        centroids = newCentroids;
    }

    // Calculate final distortion
    distortion = calculateDistortion(data, clusters, centroids);

    return { clusters, distortion };
}

function initializeCentroids(data, k) {
    const centroids = [];
    for (let i = 0; i < k; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        centroids.push(data[randomIndex]);
    }
    return centroids;
}

function assignClusters(data, centroids) {
    const clusters = [];
    for (let i = 0; i < data.length; i++) {
        let minDistance = Infinity;
        let clusterIndex = 0;
        for (let j = 0; j < centroids.length; j++) {
            const distance = Math.abs(data[i] - centroids[j]);
            if (distance < minDistance) {
                minDistance = distance;
                clusterIndex = j;
            }
        }
        clusters.push(clusterIndex);
    }
    return clusters;
}

function calculateCentroids(data, clusters, k) {
    const centroids = new Array(k).fill(0);
    const counts = new Array(k).fill(0);

    for (let i = 0; i < data.length; i++) {
        const cluster = clusters[i];
        centroids[cluster] += data[i];
        counts[cluster]++;
    }

    for (let i = 0; i < k; i++) {
        if (counts[i] > 0) {
            centroids[i] /= counts[i];
        }
    }

    return centroids;
}

function calculateDistortion(data, clusters, centroids) {
    let distortion = 0;
    for (let i = 0; i < data.length; i++) {
        const cluster = clusters[i];
        distortion += Math.pow(data[i] - centroids[cluster], 2);
    }
    return distortion;
}

module.exports = kmeans;