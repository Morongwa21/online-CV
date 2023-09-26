-- Create User table
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    name VARCHAR(255),
    phone_number VARCHAR(20)
);

-- Create CV table
CREATE TABLE CV (
    cv_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    contact_info VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Create Education table
CREATE TABLE Education (
    education_id INT AUTO_INCREMENT PRIMARY KEY,
    cv_id INT,
    institution VARCHAR(255),
    degree VARCHAR(255),
    major VARCHAR(255),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (cv_id) REFERENCES CV(cv_id)
);

-- Create WorkExperience table
CREATE TABLE WorkExperience (
    work_experience_id INT AUTO_INCREMENT PRIMARY KEY,
    cv_id INT,
    organization VARCHAR(255),
    position VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT,
    FOREIGN KEY (cv_id) REFERENCES CV(cv_id)
);

-- Create Skills table
CREATE TABLE Skills (
    skills_id INT AUTO_INCREMENT PRIMARY KEY,
    cv_id INT,
    skill_name VARCHAR(255),
    proficiency_level VARCHAR(50),
    FOREIGN KEY (cv_id) REFERENCES CV(cv_id)
);

-- Create Objective table
CREATE TABLE Objective (
    objective_id INT AUTO_INCREMENT PRIMARY KEY,
    cv_id INT,
    objective_text TEXT,
    FOREIGN KEY (cv_id) REFERENCES CV(cv_id)
);
