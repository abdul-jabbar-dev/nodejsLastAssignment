live hostion link: https://job-portal15.cyclic.app/

| Candidate | Hiring Manager |Admin|
|--|--|--|
| abduljabbar1532002@gmail.com pass:1532002 | alim@gmail.com pass: 123456|admin@gamil.com pass:Admin123#


|   jobs route   		| Defination   |Authorization |filter|
|-----------------------|--------------|--------------|--------------|
|`get:/jobs`    		|Get all Jobs    |Candidate	  |`?sort=salary&location=Uttara`|
|`get:/jobs/:id`  		|Get single Job |Candidate 	  |
|`post:/jobs/:id/apply` |Apply job circular |Candidate     |
|`post:/jobs`  			|Areate a circular    |Hiring Manager|
|`update:/jobs/:id`  	|Update a circular    |Hiring Manager|


|      users route               |Defination    	|Authorization |
|--------------------------------|------------------|--------------|
|`get:/users`               	 |Get all users        |Admin         |
|`get:/users/candidate   `       |Get all candidate   |Admin       |
|`get:/users/candidate/:id`      |Get a candidate     |Admin         |
|`get:/users/hiring_managers/:id`|Get a Hiring managers |Admin        |
|`update:/users/userauth`        |Update user role        |Admin       |
|`post:/users/signup`            |Create a user       |
|`post:/users/signup`            |Login user with token|
|`get:/users/me`                 |Get user information | token required

|          manager route    |Defination    |Authorization |
|---------------------------|--------------|--------------|
|`get:/manager/jobs`        |Tokened hiring manager's all Jobs |Hiring Manager|
|`get:/manager/jobs/:id`    |Tokened hiring manager's a Job     |Hiring Manager|



