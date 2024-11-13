
def linear_regression(x, y):
    # Calculate mean of x and y
    x_mean = sum(x) / len(x)
    y_mean = sum(y) / len(y)

    # Calculate slope (m) and intercept (c) for y = mx + c
    numerator = sum((xi - x_mean) * (yi - y_mean) for xi, yi in zip(x, y))
    denominator = sum((xi - x_mean) ** 2 for xi in x)
    m = numerator / denominator
    c = y_mean - m * x_mean

    return m, c

def predict_future_expense(x, y, future_period):
    m, c = linear_regression(x, y)
    future_x = max(x) + future_period
    return m * future_x + c
