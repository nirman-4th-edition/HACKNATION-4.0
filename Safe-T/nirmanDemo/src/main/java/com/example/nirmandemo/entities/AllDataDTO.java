package com.example.nirmandemo.entities;


import lombok.Data;

public class AllDataDTO {
    private Boolean sos;
    private Double envTemp;
    private Double humidity;
    private Double aqi;
    private Integer ledStatus;

    public AllDataDTO(Boolean sos, Double envTemp, Double humidity, Double aqi, Integer ledStatus
    ) {
        this.sos = sos;
        this.envTemp = envTemp;
        this.humidity = humidity;
        this.aqi = aqi;
        this.ledStatus = ledStatus;
    }

    @Override
    public String toString() {
        return "AllDataDTO{" +
                "sos=" + sos +
                ", envTemp=" + envTemp +
                ", humidity=" + humidity +
                '}';
    }

    public Boolean getSos() {
        return sos;
    }

    public void setSos(Boolean sos) {
        this.sos = sos;
    }

    public Double getEnvTemp() {
        return envTemp;
    }

    public void setEnvTemp(Double envTemp) {
        this.envTemp = envTemp;
    }

    public Double getHumidity() {
        return humidity;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }

    public Double getAqi() {
        return aqi;
    }

    public void setAqi(Double aqi) {
        this.aqi = aqi;
    }

    public Integer getLedStatus() {
        return ledStatus;
    }

    public void setLedStatus(Integer ledStatus) {
        this.ledStatus = ledStatus;
    }
}
