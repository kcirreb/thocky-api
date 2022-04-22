# thocky-api
API Status : Deployed on Heroku
An API for keyboard enthusiasts.

Authentication:
To use the API, you have to first register for an access token using the GET token endpoint.
GET /token
Body:
{
  "email": <your-email>,
  "password": <your-password>
}

You should get a response in the following format:
{
  "email": <your-email>,
  "token-type": "bearer",
  "access-token": <your-token>
}
<your-token> is your access token and needs to be passed along the authorization header of every request.
{
  "Authorization": Bearer <your-token>
}

In case you lost your access token, you can request for a new one through the GET token endpoint, but <your-password> will have to be same as the one you used to register with <your-email>.

Usage:
Switches

GET switches
GET /switches
Get the list of all switches.
Query parameters:
name - manufacturer (optional)
type - string
description - manufacturer to filter the list on
name - brand (optional)
type - string
description - brand to filter the list on
name - type (optional)
type - string
description - type to filter the list on

GET switch
GET /switches/:switchId
Get the specifications of a specific switch.
Path parameters:
name - switchId
type - string
description - switchId of the switch you want to request. switchIds of switches can be found using the Get switches endpoint.

Keycaps

GET keycaps
GET /keycaps
Get the list of all keycaps.
Query parameters:
name - manufacturer (optional)
type - string
description - manufacturer to filter the list on
name - brand (optional)
type - string
description - brand to filter the list on
name - profile (optional)
type - string
description - profile to filter the list on
name - material
type - string
description - material to filter the list on

GET keycaps
GET /keycaps/:keycapsId
Get the specifications of a specific set of keycaps.
Path parameters:
name - keycapsId
type - string
description - keycapsId of the set of keycaps you want to request. keycapsId of keycaps can be found using the Get keycaps endpoint.
