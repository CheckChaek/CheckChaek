def price_prediction(image_status):
    status = image_status['image_status']

    if status == 'best':
        status_percent = 0.8
    elif status == 'high':
        status_percent = 0.6
    elif status == 'medium':
        status_percent = 0.4
    else:
        status_percent = 0
    
    price = status_percent * image_status['image_price'] * 0.8

    return price
