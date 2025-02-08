from datetime import datetime, timedelta


def get_period_status(last_period_date: str, period_duration: int, cycle_length=28):
    td = datetime.today().date()
    lps = datetime.strptime(last_period_date, "%Y-%m-%d").date()
    nps = lps + timedelta(days=cycle_length)

    if lps <= td < (lps + timedelta(days=period_duration)):
        return 2
    elif (nps - timedelta(days=3)) <= td < nps:
        return 1
    else:
        return 0

