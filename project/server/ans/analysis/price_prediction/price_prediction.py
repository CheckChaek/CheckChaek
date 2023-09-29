def price_prediction(image_status):
    best_status_num = 0.7
    high_status_num = 0.6
    medium_status_num = 0.5
    low_status_num = 0.4

    print(image_status['origin_price'])
    origin_pirce = image_status['origin_price']
    probs = image_status['all_data']

    all_price = []
    all_price.append(origin_pirce * probs[0] * best_status_num)
    all_price.append(origin_pirce * probs[1] * high_status_num)
    all_price.append(origin_pirce * probs[2] * medium_status_num)
    all_price.append(origin_pirce * probs[3] * low_status_num)


    return sum(all_price)
