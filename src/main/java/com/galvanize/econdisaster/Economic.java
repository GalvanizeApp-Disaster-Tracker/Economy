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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMyZip() { return myZip; }
    public void setMyZip(String myZip) { this.myZip = myZip; }
}
