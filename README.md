# Thocky API :keyboard:
A RESTful API for your next thocky keyboard. Get access to full specifications of swithces and keycaps.
> Since the API is deployed on Heroku running on free dynos, your first request might take a bit longer.

## Our Database (as of 24 Apr 2022)
Switch collections completed (checked) and in progress:
- [x] Cherry MX
- [x] Kailh Box
- [x] Kailh Speed
- [x] Kailh Pro
- [ ] Other Kailh Switches

Keycap collections completed (checked) and in progress:
- [ ] GMK Keycaps
- [ ] MT3 Keycaps

## Overview
Base URL:
```
https://thocky-api.herokuapp.com
```
Endpoints:
- [ Authentication ](#authentication)
  - [ `POST /token` ](#post-token)
- [ Switches ](#switches)
  - [ `GET /switches` ](#get-switches)
  - [ `GET /switches/:switchId` ](#get-switchesswitchid)
- [ Keycaps ](#keycaps)
  - [ `GET /keycaps` ](#get-keycaps)
  - [ `GET /keycaps/:keycapsId` ](#get-keycapskeycapsid)

## Authentication
### `POST /token`
To use the API, you have to first request an access token as follow:
```
POST https://thocky-api.herokuapp.com/token
Content-Type: application/json

{
  "email": <your-email>,
  "password": <your-password>
}
```
You should receive a response in the following format:
```
{
  "email": <your-email>,
  "token-type": "bearer",
  "access-token": <your-token>
}
```
`<your-token>` is your access token and needs to be passed along the `Authorization` header with your request for other endpoints. For example:
```
GET https://thocky-api.herokuapp.com/switches
Authorization: Bearer <your-token>
```
In case you lose your access token, you can request a new one through the `POST /token` endpoint, but `<your-password>` has to be the same as the one you used to register with `<your-email>`.

## Switches

### `GET /switches`
**Returns a list of switches.**

Optional query parameters:
| Parameter | Type | Description |
| --- | --- | --- |
| `manufacturer` | String | Any switch manufacturer to filter the list on, with spaces replaced with `-`. |
| `brand` | String | Any switch brand to filter the list on, with spaces replaced with `-`. |
| `type` | String | Any switch type to filter the list on. |

Example request:
```
GET https://thocky-api.herokuapp.com/switches?brand=cherry-mx&type=tactile
```
Example response:
```
[
  {
    "_id": "625ef8c09e8ecad7f6e30cd2",
    "name": "Cherry MX Brown",
    "manufacturer": "Cherry",
    "brand": "Cherry MX",
    "type": "Tactile"
  },
  {
    "_id": "625efa849e8ecad7f6e30cda",
    "name": "Cherry MX Clear",
    "manufacturer": "Cherry",
    "brand": "Cherry MX",
    "type": "Tactile"
  },
  {
    "_id": "625efd1e9e8ecad7f6e30cdf",
    "name": "Cherry MX Grey",
    "manufacturer": "Cherry",
    "brand": "Cherry MX",
    "type": "Tactile"
  }
]
```

### `GET /switches/:switchId`
**Returns details of the switch with `_id` of `switchId`.**

Required path paramter:
| Parameter | Type | Description |
| --- | --- | --- |
| `switchId` | String | `_id` of the switch you would like to request. |

Example request:
```
GET https://thocky-api.herokuapp.com/switches/62600eae6e437650b5e9f827
```
Example response:
```
{
  "_id": "62600eae6e437650b5e9f827",
  "name": "Kailh Speed Silver",
  "manufacturer": "Kailh",
  "brand": "Kailh",
  "type": "Linear",
  "mount": {
    "plate": true,
    "pcb": false
  },
  "materials": {
    "stem": "POM",
    "top": "PC",
    "bottom": "Nylon"
  },
  "spring": {
    "type": "Standard",
    "weight": [
      {
        "actuate": 50,
        "bottom": 70
      }
    ]
  },
  "travel": {
    "pre": 1.1,
    "total": 3.5
  }
}
```

## Keycaps

### `GET /keycaps`
**Returns a list of keycaps.**

Optional query parameters:
| Paramter | Type | Description |
| --- | --- | --- |
| `manufacturer` | String | Any keycap manufacturer to filter the list on, with spaces replaced with `-`. |
| `brand` | String | Any keycap brand to filter the list on, with spaces replaced with `-`. |
| `profile` | String | Any keycap profile to filter the list on. |
| `material` | String | Any keycap material to filter the list on. |

Example request:
```
GET http://thocky-api.herokuapp.com/keycaps?manufacturer=gmk&brand=drop
```
Example response:
```
[
  {
    "_id": "6260658077413dc9d497d90c",
    "name": "GMK Blue Samurai",
    "manufacturer": "GMK",
    "brand": "Drop",
    "profile": "Cherry",
    "material": "ABS"
  },
  {
    "_id": "626067c877413dc9d497d918",
    "name": "GMK Godspeed",
    "manufacturer": "GMK",
    "brand": "Drop",
    "profile": "Cherry",
    "material": "ABS"
  },
  {
    "_id": "6260664277413dc9d497d912",
    "name": "GMK Hennessey",
    "manufacturer": "GMK",
    "brand": "Drop",
    "profile": "Cherry",
    "material": "ABS"
  },
]
```

### `GET /keycaps/:keycapsId`
**Returns details of the set of keycaps with `_id` of `keycapsId`.**

Required path paramter:
| Parameter | Type | Description |
| --- | --- | --- |
| `keycapsId` | String | `_id` of the set of keycaps you would like to request. |

Example request:
```
http://thocky-api.herokuapp.com/keycaps/62606e068cface33adad69a2
```
Example response:
```
{
  "_id": "62606e068cface33adad69a2",
  "name": "MT3 Susuwatari",
  "manufacturer": "Drop",
  "brand": "Drop",
  "designer": "Matt3o",
  "profile": "MT3",
  "material": "ABS",
  "legends": "Doubleshot"
}
```

## Contact Me
If you think there are mistakes in our data, feel free to tell me at koberrick11@gmail.com.
