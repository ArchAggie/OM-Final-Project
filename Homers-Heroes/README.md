
## Homers-Heroes-Project

## Ready To Roll Up Your Sleeves and Volunteer With Team Depot?

##### As you know, one our core values is "Giving Back". We were inspired to create this project to bring more awareness to our store associates surrounding the many projects and partnerships we have to reinforce our outreach. Homer's Heroes makes it easier for store associates to create new projects in their community, and rally our heroes to join in. This application makes that process simple and efficient! Here is more info about the impact of Team Depot:

##### Together with The Home Depot Foundation, Team Depot, The Home Depot’s associate volunteer force, improves the homes and lives of veterans and helps communities affected by natural disasters.

##### In 2022, more than 45,000 associate volunteers helped further the mission and impact of The Home Depot Foundation by completing more than 2,200 projects in communities across the country.

##### +DID YOU KNOW: Since 2011, Team Depot has volunteered more than 2 million hours of sweat equity to address the immediate needs within its neighborhoods.

##### Follow #TeamDepot for more information.

| Requirements |          |
|--------------|:-------------:| 
| Java JDK     | https://www.oracle.com/java/technologies/downloads/ | 
| Postgresql   |   https://www.postgresql.org/download/   | 
| IDE   |   https://www.jetbrains.com/idea/download/download-thanks.html   | 
| Postman   |   https://www.postman.com/downloads/  | 

### Install Java JDK

1. Download the Java JDK installer from the official Oracle website: https://www.oracle.com/java/technologies/javase-downloads.html
2. Run the installer and follow the on-screen instructions to install Java JDK on your machine.
3. Verify that Java JDK is installed correctly by opening a command prompt or terminal and typing the following command:

```bash
 java -version
 ```

This should display the version of Java JDK that you have installed.

### Install PostgreSQL

1. Download the PostgreSQL installer from the official PostgreSQL website: https://www.postgresql.org/download/
2. Run the installer and follow the on-screen instructions to install PostgreSQL on your machine.
3. During the installation process, you will be prompted to set a password for the default database user (postgres). Make sure to remember this password, as you will need it later to connect to the database.
4. Verify that PostgreSQL is installed correctly by opening a command prompt or terminal and typing the following command:

```bash
psql --version
 ```

This should display the version of PostgreSQL that you have installed.

### Set up the Java Spring Boot Backend Application with PostgreSQL

1. Clone the repository to your local machine.

```bash
git clone git@github.com:Q523ZX1_thdgit/Homers-Heroes.git
```

2. Create a new database named: homerheroes.
3. To Create Tables for Projects and Volunteers, run the command below:
```bash
 CREATE TABLE Projects (
 	project_id serial PRIMARY KEY,
 	project_name VARCHAR ( 50 )  NOT NULL,
 	project_date VARCHAR(20) NOT NULL,
 	project_description VARCHAR ( 255 )  NULL
);

 CREATE TABLE Volunteers (
 	Volunteer_id serial PRIMARY KEY,
 	firstName VARCHAR ( 50 )  NOT NULL,
 	lastName VARCHAR ( 50 )  NOT NULL,
 	preferredContact VARCHAR(10) NOT NULL,
 	phoneNumber varchar(20),
 	emailAddress varchar(50),
    project_id INTEGER REFERENCES projects (project_id)
);
```
4. To Add Foreign Key constraint, run the command below:

```bash
ALTER TABLE Volunteers
ADD CONSTRAINT fk_projects_Volunteers FOREIGN KEY (project_id) REFERENCES projects (project_id);
```

5. Select Queries:

```bash
select * from Volunteers;
select * from projects;
```

6. Insert sample data into Projects table manually until we establish the crud for Projects table.

```bash
insert into Projects values (1,'Bake Sale','2023-01-02','Cake Bake');
```
7. Modify the `src/main/resources/application.properties` file to specify the database connection properties. The default configuration assumes that the PostgreSQL server is running on the same machine on port 5432, and that the `homerheroes` database has been created.

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/homerheroes
spring.datasource.username=postgres
spring.datasource.password=mysecretpassword
```

Replace `mysecretpassword` with the password you set during the PostgreSQL installation process.

8. Build the Java Spring Boot application.

```bash
./mvnw clean package
```

9. Start the backend server.

Run the application in your IDE

10. You can use Postman to test the API Endpoints independent of the application. Here is a tutorial below.

`https://www.youtube.com/watch?v=VywxIQ2ZXw4&ab_channel=freeCodeCamp.org`

# API Endpoints


## Get All Projects
#### Method: GET

`URL: localhost:8080/projects`

#### API Response:
[{"project_id": 1,
"project_name": "Bake Sale",
"project_date": "2023-01-02",
"project_description": "Cake Bake"
},
{
"project_id": 2,
"project_name": "Big Event",
"project_date": "2023-03-05",
"project_description": "Helping hands"
},
{
"project_id": 3,
"project_name": "Big Event",
"project_date": "2023-03-05",
"project_description": "Helping hands"
}
]
**********************************************************
## Create Project
#### Method: POST

`URL: localhost:8080/projects`


#### API Request:
{
"project_name": "Big Event",
"project_date": "2023-03-05",
"project_description": "Helping hands"
}

#### API Response:
{
"project_id": 3,
"project_name": "Big Event",
"project_date": "2023-03-05",
"project_description": "Helping hands"
}


**********************************************************
## Update Projects
#### Method: PUT

`URL: localhost:8080/projects/1`


#### API Request:
{
"project_name": "Big Event",
"project_date": "2023-03-05",
"project_description": "Helping hands"
}


#### API Response:

{
"project_id": 1,
"project_name": "Bake Sale",
"project_date": "2023-01-02",
"project_description": "Cake Bake"
}

**********************************************************
## Delete Projects
#### Method: DELETE

(You can't delete an entry from project table if the project id exist in Volunteer table.
As of now , we will keep this DELETE not available

`URL: localhost:8080/projects/1`


**********************************************************


## Get All Volunteers

#### Method: GET

`URL: localhost:8080/Volunteers`

#### API Response:
[
{
"firstName": "Taylor",
"lastName": "Day",
"preferredContact": "EMAIL",
"phoneNumber": "2045",
"emailAddress": "Taylor.Day@gmail.com",
"project_id": 1,
"volunteer_id": 5
},
{
"firstName": "Taylor2",
"lastName": "Da2y",
"preferredContact": "EMAIL",
"phoneNumber": "2333345",
"emailAddress": "Taylor.Day@gmail.com",
"project_id": 1,
"volunteer_id": 6
},
{
"firstName": "Taylor2",
"lastName": "Da2y",
"preferredContact": "EMAIL",
"phoneNumber": "2333567673",
"emailAddress": "Taylor.Day@gmail.com",
"project_id": 1,
"volunteer_id": 7
}
]
**********************************************************


## Create Volunteer

#### Method: POST

`URL: localhost:8080/Volunteers`


### API Request:
{
"firstName":"Taylor2",
"lastName":"Da2y",
"preferredContact":"EMAIL",
"phoneNumber":2333567673,
"emailAddress":"Taylor.Day@gmail.com",
"project_id":"1"

}


### API Response:

{
"firstName": "Taylor2",
"lastName": "Da2y",
"preferredContact": "EMAIL",
"phoneNumber": "2333567673",
"emailAddress": "Taylor.Day@gmail.com",
"project_id": 1,
"volunteer_id": 7
}

**********************************************************


## Update a Volunteer

Method: PUT

`URL: localhost:8080/Volunteers/7`


#### API Request:

No mandatory fields required.The fields that need to be updated will be sent.
(Assuming it as PATCH)

{
"firstName": "Taylor2",
"lastName": "Da2y",
"preferredContact": "EMAIL",
"phoneNumber": "2333567673",
"emailAddress": "Taylor.Day@gmail.com",
"project_id": 1,
"volunteer_id": 7
}



#### API Response:

{
"firstName": "Taylor2",
"lastName": "Da2y",
"preferredContact": "EMAIL",
"phoneNumber": "2333567673",
"emailAddress": "Taylor.Day@gmail.com",
"project_id": 1,
"volunteer_id": 7
}


**********************************************************


## Delete a Volunteer

Method: DELETE

`URL: localhost:8080/Volunteers/4`

#### API Response:

No response.
**********************************************************

## Dependencies

This application uses the following dependencies:

- Spring Boot
- PostgreSQL Driver
- Spring Data JPA

These dependencies are managed by Maven and will be automatically downloaded when you build the application.



