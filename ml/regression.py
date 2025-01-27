def linear_regression(x, y):

    n = len(x)
    x_sum = sum(x)
    y_sum = sum(y)
    xy_sum = sum(x_i * y_i for x_i, y_i in zip(x, y))
    xx_sum = sum(x_i * x_i for x_i in x)

    # Calculating slope (m) and intercept (b)
    m = (n * xy_sum - x_sum * y_sum) / (n * xx_sum - x_sum**2)
    b = (y_sum - m * x_sum) / n

    next_month = max(x) + 1
    prediction = max(min(y), m * next_month + b)
    return prediction

