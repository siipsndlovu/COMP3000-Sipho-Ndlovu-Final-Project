-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema complete_fitness_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema complete_fitness_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `complete_fitness_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `complete_fitness_db` ;

-- -----------------------------------------------------
-- Table `complete_fitness_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`users` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `First_Name` VARCHAR(255) NULL DEFAULT NULL,
  `Last_Name` VARCHAR(255) NULL DEFAULT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Account_Init` TINYINT(1) NOT NULL DEFAULT '0',
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`userInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`userInfo` (
  `Gender` VARCHAR(255) NOT NULL,
  `DOB` VARCHAR(2555) NOT NULL,
  `Height` INT(255) NOT NULL,
  `Weight` INT(255) NOT NULL,
  `HealthGoal` VARCHAR(255) NOT NULL,
  `Calories` INT(255) NOT NULL,
  `Fat` INT(255) NOT NULL,
  `Protein` INT(255) NOT NULL,
  `Sugar` INT(255) NOT NULL,
  `Fiber` INT(255) NOT NULL,
  `Sodium` INT(255) NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `users_UserID` INT NOT NULL,
  INDEX `fk_userInfo_users_idx` (`users_UserID` ASC) VISIBLE,
  CONSTRAINT `fk_userInfo_users`
    FOREIGN KEY (`users_UserID`)
    REFERENCES `complete_fitness_db`.`users` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`mondays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`mondays` (
  `MondayID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`MondayID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`tuesdays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`tuesdays` (
  `TuesdayID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`TuesdayID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`wednesdays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`wednesdays` (
  `WdnesdayID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`WdnesdayID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`thursdays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`thursdays` (
  `ThursdayID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ThursdayID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`fridays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`fridays` (
  `FrdayID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`FrdayID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`saturdays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`saturdays` (
  `SaturdayID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SaturdayID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`sundays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`sundays` (
  `SundaysID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SundaysID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`schedules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`schedules` (
  `ScheduleID` INT NOT NULL AUTO_INCREMENT,
  `users_UserID` INT NOT NULL,
  `MondayID_MondayID` INT NOT NULL,
  `tuesdays_TuesdayID` INT NOT NULL,
  `wednesdays_WdnesdayID` INT NOT NULL,
  `thursdays_ThursdayID` INT NOT NULL,
  `fridays_FrdayID` INT NOT NULL,
  `saturdays_SaturdayID` INT NOT NULL,
  `sundays_SundaysID` INT NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ScheduleID`),
  INDEX `fk_schedule_users1_idx` (`users_UserID` ASC) VISIBLE,
  INDEX `fk_schedules_MondayID1_idx` (`MondayID_MondayID` ASC) VISIBLE,
  INDEX `fk_schedules_tuesdays1_idx` (`tuesdays_TuesdayID` ASC) VISIBLE,
  INDEX `fk_schedules_wednesdays1_idx` (`wednesdays_WdnesdayID` ASC) VISIBLE,
  INDEX `fk_schedules_thursdays1_idx` (`thursdays_ThursdayID` ASC) VISIBLE,
  INDEX `fk_schedules_fridays1_idx` (`fridays_FrdayID` ASC) VISIBLE,
  INDEX `fk_schedules_saturdays1_idx` (`saturdays_SaturdayID` ASC) VISIBLE,
  INDEX `fk_schedules_sundays1_idx` (`sundays_SundaysID` ASC) VISIBLE,
  CONSTRAINT `fk_schedule_users1`
    FOREIGN KEY (`users_UserID`)
    REFERENCES `complete_fitness_db`.`users` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedules_MondayID1`
    FOREIGN KEY (`MondayID_MondayID`)
    REFERENCES `complete_fitness_db`.`mondays` (`MondayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedules_tuesdays1`
    FOREIGN KEY (`tuesdays_TuesdayID`)
    REFERENCES `complete_fitness_db`.`tuesdays` (`TuesdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedules_wednesdays1`
    FOREIGN KEY (`wednesdays_WdnesdayID`)
    REFERENCES `complete_fitness_db`.`wednesdays` (`WdnesdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedules_thursdays1`
    FOREIGN KEY (`thursdays_ThursdayID`)
    REFERENCES `complete_fitness_db`.`thursdays` (`ThursdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedules_fridays1`
    FOREIGN KEY (`fridays_FrdayID`)
    REFERENCES `complete_fitness_db`.`fridays` (`FrdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedules_saturdays1`
    FOREIGN KEY (`saturdays_SaturdayID`)
    REFERENCES `complete_fitness_db`.`saturdays` (`SaturdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedules_sundays1`
    FOREIGN KEY (`sundays_SundaysID`)
    REFERENCES `complete_fitness_db`.`sundays` (`SundaysID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`workouts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`workouts` (
  `WorkoutID` INT NOT NULL AUTO_INCREMENT,
  `Time` VARCHAR(255) NOT NULL,
  `mondays_MondayID` INT NULL,
  `tuesdays_TuesdayID` INT NULL,
  `wednesdays_WdnesdayID` INT NULL,
  `thursdays_ThursdayID` INT NULL,
  `fridays_FrdayID` INT NULL,
  `saturdays_SaturdayID` INT NULL,
  `sundays_SundaysID` INT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`WorkoutID`),
  INDEX `fk_workouts_mondays1_idx` (`mondays_MondayID` ASC) VISIBLE,
  INDEX `fk_workouts_tuesdays1_idx` (`tuesdays_TuesdayID` ASC) VISIBLE,
  INDEX `fk_workouts_wednesdays1_idx` (`wednesdays_WdnesdayID` ASC) VISIBLE,
  INDEX `fk_workouts_thursdays1_idx` (`thursdays_ThursdayID` ASC) VISIBLE,
  INDEX `fk_workouts_fridays1_idx` (`fridays_FrdayID` ASC) VISIBLE,
  INDEX `fk_workouts_saturdays1_idx` (`saturdays_SaturdayID` ASC) VISIBLE,
  INDEX `fk_workouts_sundays1_idx` (`sundays_SundaysID` ASC) VISIBLE,
  CONSTRAINT `fk_workouts_mondays1`
    FOREIGN KEY (`mondays_MondayID`)
    REFERENCES `complete_fitness_db`.`mondays` (`MondayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_tuesdays1`
    FOREIGN KEY (`tuesdays_TuesdayID`)
    REFERENCES `complete_fitness_db`.`tuesdays` (`TuesdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_wednesdays1`
    FOREIGN KEY (`wednesdays_WdnesdayID`)
    REFERENCES `complete_fitness_db`.`wednesdays` (`WdnesdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_thursdays1`
    FOREIGN KEY (`thursdays_ThursdayID`)
    REFERENCES `complete_fitness_db`.`thursdays` (`ThursdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_fridays1`
    FOREIGN KEY (`fridays_FrdayID`)
    REFERENCES `complete_fitness_db`.`fridays` (`FrdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_saturdays1`
    FOREIGN KEY (`saturdays_SaturdayID`)
    REFERENCES `complete_fitness_db`.`saturdays` (`SaturdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_sundays1`
    FOREIGN KEY (`sundays_SundaysID`)
    REFERENCES `complete_fitness_db`.`sundays` (`SundaysID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`exerciseItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`exerciseItems` (
  `ExerciseItemID` INT NOT NULL AUTO_INCREMENT,
  `Exercise_Name` VARCHAR(255) NOT NULL,
  `MET` INT(255) NOT NULL,
  `Reps` INT(255) NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ExerciseItemID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`exercises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`exercises` (
  `ExerciseID` INT NOT NULL AUTO_INCREMENT,
  `workouts_WorkoutID` INT NOT NULL,
  `exerciseItems_ExerciseItemID` INT NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ExerciseID`),
  INDEX `fk_exercises_workouts1_idx` (`workouts_WorkoutID` ASC) VISIBLE,
  INDEX `fk_exercises_exerciseItems1_idx` (`exerciseItems_ExerciseItemID` ASC) VISIBLE,
  CONSTRAINT `fk_exercises_workouts1`
    FOREIGN KEY (`workouts_WorkoutID`)
    REFERENCES `complete_fitness_db`.`workouts` (`WorkoutID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exercises_exerciseItems1`
    FOREIGN KEY (`exerciseItems_ExerciseItemID`)
    REFERENCES `complete_fitness_db`.`exerciseItems` (`ExerciseItemID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`meals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`meals` (
  `MealID` INT NOT NULL AUTO_INCREMENT,
  `Time` VARCHAR(255) NOT NULL,
  `mondays_MondayID` INT NULL,
  `tuesdays_TuesdayID` INT NULL,
  `wednesdays_WdnesdayID` INT NULL,
  `thursdays_ThursdayID` INT NULL,
  `fridays_FrdayID` INT NULL,
  `saturdays_SaturdayID` INT NULL,
  `sundays_SundaysID` INT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`MealID`),
  INDEX `fk_workouts_mondays1_idx` (`mondays_MondayID` ASC) VISIBLE,
  INDEX `fk_workouts_tuesdays1_idx` (`tuesdays_TuesdayID` ASC) VISIBLE,
  INDEX `fk_workouts_wednesdays1_idx` (`wednesdays_WdnesdayID` ASC) VISIBLE,
  INDEX `fk_workouts_thursdays1_idx` (`thursdays_ThursdayID` ASC) VISIBLE,
  INDEX `fk_workouts_fridays1_idx` (`fridays_FrdayID` ASC) VISIBLE,
  INDEX `fk_workouts_saturdays1_idx` (`saturdays_SaturdayID` ASC) VISIBLE,
  INDEX `fk_workouts_copy1_sundays1_idx` (`sundays_SundaysID` ASC) VISIBLE,
  CONSTRAINT `fk_workouts_mondays10`
    FOREIGN KEY (`mondays_MondayID`)
    REFERENCES `complete_fitness_db`.`mondays` (`MondayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_tuesdays10`
    FOREIGN KEY (`tuesdays_TuesdayID`)
    REFERENCES `complete_fitness_db`.`tuesdays` (`TuesdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_wednesdays10`
    FOREIGN KEY (`wednesdays_WdnesdayID`)
    REFERENCES `complete_fitness_db`.`wednesdays` (`WdnesdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_thursdays10`
    FOREIGN KEY (`thursdays_ThursdayID`)
    REFERENCES `complete_fitness_db`.`thursdays` (`ThursdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_fridays10`
    FOREIGN KEY (`fridays_FrdayID`)
    REFERENCES `complete_fitness_db`.`fridays` (`FrdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_saturdays10`
    FOREIGN KEY (`saturdays_SaturdayID`)
    REFERENCES `complete_fitness_db`.`saturdays` (`SaturdayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workouts_copy1_sundays1`
    FOREIGN KEY (`sundays_SundaysID`)
    REFERENCES `complete_fitness_db`.`sundays` (`SundaysID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`foodItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`foodItems` (
  `FoodItemID` INT NOT NULL AUTO_INCREMENT,
  `Food_Name` VARCHAR(255) NOT NULL,
  `Calories` INT(255) NOT NULL,
  `Fat` INT(255) NOT NULL,
  `Protein` INT(255) NOT NULL,
  `Sugar` INT(255) NOT NULL,
  `Fiber` INT(255) NOT NULL,
  `Sodium` INT(255) NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`FoodItemID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `complete_fitness_db`.`foods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `complete_fitness_db`.`foods` (
  `FoodID` INT NOT NULL,
  `meals_MealID` INT NOT NULL,
  `foodItems_FoodItemID` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`FoodID`),
  INDEX `fk_foods_meals1_idx` (`meals_MealID` ASC) VISIBLE,
  INDEX `fk_foods_foodItems1_idx` (`foodItems_FoodItemID` ASC) VISIBLE,
  CONSTRAINT `fk_foods_meals1`
    FOREIGN KEY (`meals_MealID`)
    REFERENCES `complete_fitness_db`.`meals` (`MealID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_foods_foodItems1`
    FOREIGN KEY (`foodItems_FoodItemID`)
    REFERENCES `complete_fitness_db`.`foodItems` (`FoodItemID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;