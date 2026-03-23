package com.bnt.rest.wrapper.dto;

import com.bnt.rest.dto.BaseDto;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class EmployeeDto extends BaseDto {

	String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	int age;
}
