# Introduction
This component is one of 3 that combine to give you the ability to store a document or details of a permit or pass, to link those documents to users that can view and be able to have different access for internal and external users. With a front end it will enable most processes to capture, share and view details of permits and or licence style information

__Permit Repository:__ https://github.com/DEFRA/water-abstraction-permit-repository
__IDM:__ https://github.com/DEFRA/water-abstraction-tactical-idm
__CRM:__ https://github.com/DEFRA/water-abstraction-tactical-crm

# water-abstraction-permit-repository
[![Maintainability](https://api.codeclimate.com/v1/badges/9b655c0bca44bb73f068/maintainability)](https://codeclimate.com/github/DEFRA/water-abstraction-permit-repository/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9b655c0bca44bb73f068/test_coverage)](https://codeclimate.com/github/DEFRA/water-abstraction-permit-repository/test_coverage)

The permit repository is a lightweight general purpose data store for licences and permits.

The licences are organised in the following heirarchy:

Regime > Licence Type > Licence

These are:

__Regime__: a high level means of grouping licences, e.g. ‘Water’ or ‘Waste’
__Licence Type__: a means of grouping licences within a regime, e.g. ‘Water Abstraction Licence’, ‘Water Impoundment Licence’
__Licence__: holds the licence data within a particular regime and licence type

The store is developed in HAPI/NodeJS and backed by a Postgres SQL database.  All data is transferred via a REST API with JWT authentication.

The REST API supports basic filtering and pagination operations on all endpoints.

Licence data itself is stored as a blob of JSON data, together with start and expiry dates and reference number.

Implementation of user interfaces, CRM, and access control is left open to the specific use case requirements.

## Prerequisitites

Gulp (global)

## Installation

```
npm install --only=dev
gulp clean && gulp copy-govuk-files && gulp install-govuk-files && gulp copy-static-assets && gulp sass
```

## Environment variables

A `.env` file should be created in the root directory with the following optional configuration variables

### PORT
Specify the port for the service to run on

`PORT=[port]`

### DATABASE_URL
Database connection string

`DATABASE_URL: postgres://[user]:[password]@[host]:[port]/[database]`

### cacheKey
32+ characters used to secure session variables

`cacheKey=a-string-of-at-least-32-characters`

### JWT_SECRET
The secret key used to encrypt tokens

## Launching

`node index.js`

## On-Boarding

TODO: How does a new department/regime set up the permit repository

TODO: How does a department/regime create a new licence/permit type

## Security

A valid JWT token is required for requests to the API. This should be appended to the URL in the format /API/1.0/org?token=[insert token here].

Please note that a mechanism for obtaining the JWT token is not yet in place.

## Usage

The following RESTful endpoints are exposed:

### GET /API/1.0/org

Returns a list of available regimes

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "regime_nm": "Water Licencing",
            "regime_id": "1"
        }
    ]
}
```

### POST /API/1.0/org

Create a new regime

#### Example Payload

```
{
            "regime_nm": "New Org 1"
}
```

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "regime_id": "5"
        }
    ]
}
```

### GET /API/1.0/field

Returns a list of available system level datatypes

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "field_nm": "DateField",
            "field_definition": {
                "type": "date"
            },
            "field_active": "1",
            "field_id": "17",
            "field_is_search_key": null
        }
    ]
}
```

### GET /API/1.0/org/[id]

Returns regime details

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "regime_nm": "Example Org",
            "regime_id": "1"
        }
    ]
}
```

### GET /API/1.0/org/[org id]/licencetype

Returns list of licence types for regime [org id]

#### Example Response

```
{
  "error": null,
  "data": [
      {
          "type_nm": "Example Licence",
          "type_id": 1
      },
    ]
}
```

### POST /API/1.0/org/[org id]/licencetype

Create a licence type for regime [org id]

#### Example request

```
{"type_nm":"sample licence"}
```

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "type_id": 4
        }
    ]
}
```

### POST /API/1.0/[org id]/1/licencetype/[type id]/field

Add a single field to licence type [type id] for regime [org id].

#### Example request

```
{
	"field_id":"20",
	"is_required":"0",
	"is_public_domain":"1",
	"type_field_alias":"test4"
}
```

#### Example Response

```
{
    "error": null,
    "data": []
}
```

Add a multiple fields to licence type [type id] for regime [org id].

#### Example request

```
{"types":
  [
    {
    	"field_id":"20",
    	"is_required":"0",
    	"is_public_domain":"1",
    	"type_field_alias":"test4"
    },
    {
      "field_id":"20",
      "is_required":"0",
      "is_public_domain":"1",
      "type_field_alias":"test5"
    }
  ]
}
```

#### Example Response

```
{
    "error": null,
    "data": []
}
```


### GET /API/1.0/org/[org id]/licencetype/[type id]

Returns custom attribute definition of a licence of type [type id] for regime [org id]

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "type_id": 1,
            "attributedata": [
                {
                    "type_fields_id": 4,
                    "field_id": 10,
                    "type_field_alias": "Attribute1",
                    "field_definition": {
                        "type": "text"
                    },
                    "is_required": "1",
                    "is_public_domain": null,
                    "field_nm": "ArrayField"
                }
            ]
        }
    ]
}
```

### GET /API/1.0/org/[org id]/licencetype/[type id]/licence

Returns list of licences of type [type id] for regime [org id]

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "licence_id": "1",
            "licence_ref": "Example Licence 1",
            "licence_search_key": "SearchKey"
        }
}
```

### POST /API/1.0/org/[org id]/licencetype/[type id]/licence

Create a licence of type [type id] for regime [org id]

#### Example Request

```
{
	"licence_ref": "New Licence",
	"licence_start_dt": "2017-01-01T00:00:00.000Z",
	"licence_end_dt": "2018-01-01T00:00:00.000Z",
	"licence_status_id": "1",
	"attributes": {
		"Attribute1": "Text Value"
	}
}
```

#### Example Response

```
{
    "licence_id": "51"
}
```

### PUT /API/1.0/org/[org id]/licencetype/[type id]/licence/[licence id]

Update a licence with ID [licence id] of type [type id] for regime [org id]

#### Example request

```
{
	"licence_ref": "New Licence",
	"licence_start_dt": "2017-01-01T00:00:00.000Z",
	"licence_end_dt": "2018-01-01T00:00:00.000Z",
	"licence_status_id": "1",
	"attributes": {
		"Attribute1": "Text Value"
	}
}
```

#### Example Response

```
{
    "error": null,
    "data": [
        {
          "licence_id": "51"
        }
    ]
}
```

### GET /API/1.0/org/[org id]/licencetype/[type id]/licence/[licence id]

Returns detail of licence [licence id] of type [type id] for regime [org id]

#### Example Response

```
{
    "licence_id": "1",
    "licence_ref": "Example Licence 1",
    "licence_start_dt": "2017-01-01T00:00:00.000Z",
    "licence_end_dt": "2018-01-01T00:00:00.000Z",
    "licence_status_id": "1",
    "licence_type_id": "1",
    "licence_regime_id": "1",
    "attributes": {
        "Attribute1": "Attribute value"
    }
}
```

## Contributing to this project

Please read the [contribution guidelines](/CONTRIBUTING.md) before submitting a pull request.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

>Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.

## Development Team

This module was developed by the Water Resource Licensing Service team as part of a digital transformation project at [DEFRA](https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs), a department of the UK government

To find out more about planned reforms to the abstraction licensing service, see the policy paper: [Water abstraction plan: Abstraction licensing service](https://www.gov.uk/government/publications/water-abstraction-plan-2017/water-abstraction-plan-abstraction-licensing-service)
