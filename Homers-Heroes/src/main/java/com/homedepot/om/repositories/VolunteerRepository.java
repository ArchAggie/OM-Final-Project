package com.homedepot.om.repositories;

import com.homedepot.om.models.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
// extends the jpa respository class as interface to let jpa handle our database connection things

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

}
