package com.galvanize.econdisaster;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="economic")
public class Economic {
    @Id
    @GeneratedValue
    private Long id;
    private String myZip;

    private String country;
    private String percchange2018;
    private String percchange2019;
    private String percchange2020;
    private String percchange2021;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMyZip() { return myZip; }
    public void setMyZip(String myZip) { this.myZip = myZip; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getPercchange2018() { return percchange2018; }
    public void setPercchange2018(String percchange2018) { this.percchange2018 = percchange2018; }
    public String getPercchange2019() { return percchange2019; }
    public void setPercchange2019(String percchange2019) { this.percchange2019 = percchange2019; }
    public String getPercchange2020() { return percchange2020; }
    public void setPercchange2020(String percchange2020) { this.percchange2020 = percchange2020; }
    public String getPercchange2021() { return percchange2021; }
    public void setPercchange2021(String percchange2021) { this.percchange2021 = percchange2021; }


}
