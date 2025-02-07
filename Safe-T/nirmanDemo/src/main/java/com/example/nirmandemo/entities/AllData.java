package com.example.nirmandemo.entities;


public class AllData {
    private Double heartRate;
    private Double spo2;
    private Double bodyTemp;
    private Boolean sos;
    private Double envTemp;
    private Double humidity;
    private Integer ledStatus;
    private Double aqi;


    public AllData() {
    }

    public AllData(Double heartRate, Double spo2, Double bodyTemp, Boolean sos, Double envTemp, Double humidity,Integer ledStatus, Double aqi) {
        this.heartRate = heartRate;
        this.spo2 = spo2;
        this.bodyTemp = bodyTemp;
        this.sos = sos;
        this.envTemp = envTemp;
        this.humidity = humidity;
        this.ledStatus = ledStatus;
//        this.aqi = aqi;
    }

    public void setHeartRate(Double heartRate) {
        this.heartRate = heartRate;
    }

    public void setSpo2(Double spo2) {
        this.spo2 = spo2;
    }

    public void setBodyTemp(Double bodyTemp) {
        this.bodyTemp = bodyTemp;
    }

    public void setSos(Boolean sos) {
        this.sos = sos;
    }

    public void setEnvTemp(Double envTemp) {
        this.envTemp = envTemp;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }

    public void setLedStatus(Integer ledStatus){
        this.ledStatus = ledStatus;
    }

    public void setAqi(Double aqi) {
        this.aqi = aqi;
    }

    private AllData(Builder builder) {
        this.heartRate = builder.heartRate;
        this.spo2 = builder.spo2;
        this.bodyTemp = builder.bodyTemp;
        this.sos = builder.sos;
        this.envTemp = builder.envTemp;
        this.humidity = builder.humidity;
        this.ledStatus = builder.ledStatus;
        this.aqi = builder.aqi;
    }

    public Double getHeartRate() {
        return heartRate;
    }

    public Double getSpo2() {
        return spo2;
    }

    public Double getBodyTemp() {
        return bodyTemp;
    }

    public Boolean getSos() {
        return sos;
    }

    public Double getEnvTemp() {
        return envTemp;
    }

    public Double getHumidity() {
        return humidity;
    }

    public Integer getLedStatus(){
        return ledStatus;
    }
    public Double getAqi() {
        return aqi;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Double heartRate;
        private Double spo2;
        private Double bodyTemp;
        private Boolean sos;
        private Double envTemp;
        private Double humidity;
        private Integer ledStatus;
        private Double aqi;

        public Builder heartRate(Double heartRate) {
            this.heartRate = heartRate;
            return this;
        }

        public Builder spo2(Double spo2) {
            this.spo2 = spo2;
            return this;
        }

        public Builder bodyTemp(Double bodyTemp) {
            this.bodyTemp = bodyTemp;
            return this;
        }

        public Builder sos(Boolean sos) {
            this.sos = sos;
            return this;
        }

        public Builder envTemp(Double envTemp) {
            this.envTemp = envTemp;
            return this;
        }

        public Builder humidity(Double humidity) {
            this.humidity = humidity;
            return this;
        }

        public Builder ledStatus(Integer ledStatus){
            this.ledStatus = ledStatus;
            return this;
        }

        public Builder aqi(Double aqi) {
            this.aqi = aqi;
            return this;
        }

        public AllData build() {
            return new AllData(this);
        }
    }

    @Override
    public String toString() {
        return "AllData{" +
                "heartRate=" + heartRate +
                ", spo2=" + spo2 +
                ", bodyTemp=" + bodyTemp +
                ", sos=" + sos +
                ", envTemp=" + envTemp +
                ", humidity=" + humidity +
                ", ledStatus=" + ledStatus +
                '}';
    }
}


