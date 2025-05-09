package com.sharedule.app.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTimeslotDTO {
    private Date startDateTime;
    private Date endDateTime;
}
