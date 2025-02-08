def get_status(temp, humid, hrtbt, spo2, body_temp,
               tempuplim, templowlim, humidup, humidlow,
               heartrateup, heartratedown, spo2up, spo2down,
               body_temp_upper, body_temp_lower):

    status = 0  #  normal status


    # temp_thresholds = [(tempuplim, tempuplim + 3, 1),
    #                    (tempuplim + 3, tempuplim + 7, 2),
    #                    (templowlim - 3, templowlim, 1),
    #                    (templowlim - 7, templowlim - 3, 2)]
    #
    # body_temp_thresholds = [(body_temp_upper, body_temp_upper + 9, 1),
    #                         (body_temp_upper + 9, body_temp_upper + 13, 2),
    #                         (body_temp_lower - 9, body_temp_lower, 1),
    #                         (body_temp_lower - 13, body_temp_lower - 9, 2)]
    #
    # humid_thresholds = [(humidup, humidup + 4, 1),
    #                     (humidup + 4, humidup + 8, 2),
    #                     (humidlow - 4, humidlow, 1),
    #                     (humidlow - 8, humidlow - 4, 2)]
    #
    # hrtbt_thresholds = [(heartrateup, heartrateup + 4, 1),
    #                     (heartrateup + 4, heartrateup + 8, 2),
    #                     (heartratedown - 3, heartratedown, 1),
    #                     (heartratedown - 6, heartratedown - 3, 2)]
    #
    # spo2_thresholds = [(spo2up, spo2up + 3, 1),
    #                    (spo2up + 3, spo2up + 6, 2),
    #                    (spo2down - 3, spo2down, 1),
    #                    (spo2down - 6, spo2down - 3, 2)]

    temp_thresholds = [(tempuplim, tempuplim + 10, 1),
                       (tempuplim + 10, tempuplim + 20, 2),
                       (templowlim - 10, templowlim, 1),
                       (templowlim - 20, templowlim - 10, 2)]

    body_temp_thresholds = [(body_temp_upper, body_temp_upper + 10, 1),
                            (body_temp_upper + 10, body_temp_upper + 20, 2),
                            (body_temp_lower - 10, body_temp_lower, 1),
                            (body_temp_lower - 20, body_temp_lower - 10, 2)]

    humid_thresholds = [(humidup, humidup + 10, 1),
                        (humidup + 10, humidup + 20, 2),
                        (humidlow - 10, humidlow, 1),
                        (humidlow - 20, humidlow - 10, 2)]

    hrtbt_thresholds = [(heartrateup, heartrateup + 10, 1),
                        (heartrateup + 10, heartrateup + 20, 2),
                        (heartratedown - 10, heartratedown, 1),
                        (heartratedown - 20, heartratedown - 10, 2)]

    spo2_thresholds = [(spo2up, spo2up + 10, 1),
                       (spo2up + 10, spo2up + 20, 2),
                       (spo2down - 10, spo2down, 1),
                       (-1000, spo2down - 10, 2)]

    for lower, upper, level in temp_thresholds:
        if lower <= temp < upper:
            status = max(status, level)

    for lower, upper, level in body_temp_thresholds:
        if lower <= body_temp < upper:
            status = max(status, level)

    for lower, upper, level in humid_thresholds:
        if lower <= humid < upper:
            status = max(status, level)

    for lower, upper, level in hrtbt_thresholds:
        if lower <= hrtbt < upper:
            status = max(status, level)

    for lower, upper, level in spo2_thresholds:
        if lower <= spo2 < upper:
            status = max(status, level)

    return status