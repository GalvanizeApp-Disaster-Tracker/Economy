package com.galvanize.econdisaster;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="bankruptcy")
public class Bankruptcy {
    @Id
    @GeneratedValue
    private Long id;
    private Long year;
    private Long firstqtr;
    private Long secondqtr;
    private Long thirdqtr;
    private Long fourthqtr;
    private Long total;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getYear() {
        return year;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public Long getFirstqtr() {
        return firstqtr;
    }

    public void setFirstqtr(Long firstqtr) {
        this.firstqtr = firstqtr;
    }

    public Long getSecondqtr() {
        return secondqtr;
    }

    public void setSecondqtr(Long secondqtr) {
        this.secondqtr = secondqtr;
    }

    public Long getThirdqtr() {
        return thirdqtr;
    }

    public void setThirdqtr(Long thirdqtr) {
        this.thirdqtr = thirdqtr;
    }

    public Long getFourthqtr() {
        return fourthqtr;
    }

    public void setFourthqtr(Long fourthqtr) {
        this.fourthqtr = fourthqtr;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}