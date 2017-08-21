
# prototype-permit-repository

Data agnostic permit repository project for the GOV.UK Water Abstraction service, using the HAPI engine for Node.js + the Handlebars view engine, with a Postgres datastore.

## Admin Interface

A simple admin UI is exposed at /admin

This exposes a hierarchical view of the orgs/licence types/licences and enables additional attributes to be added to licence types

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

## Launching

`node index.js`

## Security

A valid JWT token is required for requests to the API. This should be appended to the URL in the format /API/1.0/org?token=[insert token here].

Please note that a mechanism for obtaining the JWT token is not yet in place.

## Usage

The following RESTful endpoints are exposed:

### GET /API/1.0/org

Returns a list of available organisations

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "org_nm": "Water Licencing",
            "org_id": "1"
        }
    ]
}
```

### POST /API/1.0/org

Create a new organisation

#### Example Payload

```
{
            "org_nm": "New Org 1"
}
```

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "org_id": "5"
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

Returns organisation details

#### Example Response

```
{
    "error": null,
    "data": [
        {
            "org_nm": "Example Org",
            "org_id": "1"
        }
    ]
}
```

### GET /API/1.0/org/[org id]/licencetype

Returns list of licence types for organisation [org id]

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

Create a licence type for organisation [org id]

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

### GET /API/1.0/org/[org id]/licencetype/[type id]

Returns custom attribute definition of a licence of type [type id] for organisation [org id]

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

Returns list of licences of type [type id] for organisation [org id]

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

Create a licence of type [type id] for organisation [org id]

#### Example Request

```
{
	"licence_ref": "New Licence",
	"licence_start_dt": "2017-01-01T00:00:00.000Z",
	"licence_end_dt": "2018-01-01T00:00:00.000Z",
	"licence_status_id": "1",
	"licence_type_id": "1",
	"licence_org_id": "1",
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

Update a licence with ID [licence id] of type [type id] for organisation [org id]

#### Example request

```
{
	"licence_ref": "New Licence",
	"licence_start_dt": "2017-01-01T00:00:00.000Z",
	"licence_end_dt": "2018-01-01T00:00:00.000Z",
	"licence_status_id": "1",
	"licence_type_id": "1",
	"licence_org_id": "1",
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

Returns detail of licence [licence id] of type [type id] for organisation [org id]

#### Example Response

```
{
    "licence_id": "1",
    "licence_ref": "Example Licence 1",
    "licence_start_dt": "2017-01-01T00:00:00.000Z",
    "licence_end_dt": "2018-01-01T00:00:00.000Z",
    "licence_status_id": "1",
    "licence_type_id": "1",
    "licence_org_id": "1",
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
