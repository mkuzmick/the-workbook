# action basics

```
{
  "openapi": "3.1.0",
  "info": {
    "title": "HackMD API",
    "description": "API for creating markdown docs on HackMD.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://api.hackmd.io",
      "description": "HackMD API server"
    }
  ],
  "paths": {
    "/v1/teams/ll-24-25/notes": {
      "post": {
        "operationId": "createNote",
        "summary": "Create a markdown note with user content",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "content": {
                    "type": "string",
                    "description": "The content of the note in markdown, always with the title as the first part following a single hashtag # and then a line break and the rest of the content as H1.",
                    "example": "# New Note\nnew note content"
                  }
                },
                "required": ["content"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Note created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "publishLink": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKeyAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "API_KEY"
      }
    },
    "schemas": {}
  }
}
```


### Airtable sample

```
{
  "openapi": "3.1.0",
  "info": {
    "title": "Airtable API",
    "description": "API for querying records from an Airtable base.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://api.airtable.com/v0",
      "description": "Airtable API server"
    }
  ],
  "paths": {
    "/{baseId}/{tableName}": {
      "get": {
        "operationId": "queryRecords",
        "summary": "Query records from a table",
        "parameters": [
          {
            "name": "baseId",
            "in": "path",
            "required": true,
            "description": "The ID of the base",
            "default": "appN3NB28TdhG2S7x",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "tableName",
            "in": "path",
            "required": true,
            "default": "tblHsMq7e2MwOiqsd",
            "description": "The name of the table",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "filterByFormula",
            "in": "query",
            "required": false,
            "description": "A formula used to filter records",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "maxRecords",
            "in": "query",
            "required": false,
            "description": "The maximum number of records to return",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A list of records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "records": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "fields": {
                            "type": "object",
                            "additionalProperties": true
                          },
                          "createdTime": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKeyAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "API_KEY"
      }
    },
    "schemas": {}
  }
}
```


### Gonzalo's

```
{
  "openapi": "3.1.0",
  "info": {
    "title": "Airtable Data Management",
    "description": "Retrieves, creates, and deletes data in a specified Airtable Base and Table.",
    "version": "v1.0.0"
  },
  "servers": [
    {
      "url": "https://api.airtable.com/v0/appHghEnRPrn3FNbI"
    }
  ],
  "paths": {
    "/{tableName}": {
      "get": {
        "description": "Get data from a specific Airtable Table",
        "operationId": "GetAirtableData",
        "parameters": [
          {
            "name": "tableName",
            "in": "path",
            "description": "The name of the Table within the Airtable Base",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "filterByFormula",
            "in": "query",
            "description": "A formula used to filter records",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "maxRecords",
            "in": "query",
            "description": "The maximum number of records to return",
            "required": false,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response with the requested data",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "records": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "fields": {
                            "type": "object",
                            "additionalProperties": true
                          },
                          "createdTime": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized - Invalid API key"
          },
          "404": {
            "description": "Not Found - Table not found"
          }
        },
        "deprecated": false
      },
      "post": {
        "description": "Create a new record in a specific Airtable Table",
        "operationId": "CreateAirtableRecord",
        "parameters": [
          {
            "name": "tableName",
            "in": "path",
            "description": "The name of the Table within the Airtable Base",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "The record data to be created",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "records": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "fields": {
                          "type": "object",
                          "additionalProperties": true
                        }
                      },
                      "required": [
                        "fields"
                      ]
                    }
                  }
                },
                "required": [
                  "records"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Record created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "fields": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "createdTime": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized - Invalid API key"
          },
          "404": {
            "description": "Not Found - Table not found"
          }
        },
        "deprecated": false
      }
    },
    "/{tableName}/{recordId}": {
      "delete": {
        "description": "Delete a specific record from a specific Airtable Table",
        "operationId": "DeleteAirtableRecord",
        "parameters": [
          {
            "name": "tableName",
            "in": "path",
            "description": "The name of the Table within the Airtable Base",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "recordId",
            "in": "path",
            "description": "The ID of the record to delete",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Record deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "deleted": {
                      "type": "boolean"
                    },
                    "id": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized - Invalid API key"
          },
          "404": {
            "description": "Not Found - Table or record not found"
          }
        },
        "deprecated": false
      }
    }
  },
  "/{tableName}/{recordId}": {
    "patch": {
      "description": "Update a specific record in a specific Airtable Table",
      "operationId": "UpdateAirtableRecord",
      "parameters": [
        {
          "name": "tableName",
          "in": "path",
          "description": "The name of the Table within the Airtable Base",
          "required": true,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "recordId",
          "in": "path",
          "description": "The ID of the record to update",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "requestBody": {
        "description": "The fields to be updated",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "fields": {
                  "type": "object",
                  "additionalProperties": true
                },
                "typecast": {
                  "type": "boolean",
                  "description": "Automatic data conversion from string values"
                }
              },
              "required": [
                "fields"
              ]
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Record updated successfully",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "createdTime": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "fields": {
                    "type": "object",
                    "additionalProperties": true
                  }
                }
              }
            }
          }
        },
        "401": {
          "description": "Unauthorized - Invalid API key"
        },
        "404": {
          "description": "Not Found - Table or record not found"
        }
      }
    }
  },
  "components": {
    "schemas": {}
  }
}
```


### potential vision:

{
  "openapi": "3.1.0",
  "info": {
    "title": "Questionnaire API",
    "description": "API for retrieving a list of questions from a QuestionList (with linked Questions) and saving user answers to Airtable.",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://api.airtable.com/v0/appXm127n9jm1vO95",
      "description": "Airtable API server"
    }
  ],
  "paths": {
    "/QuestionLists/{questionListId}/Questions": {
      "get": {
        "operationId": "getQuestions",
        "summary": "Retrieve questions for a specific Question List",
        "parameters": [
          {
            "name": "questionListId",
            "in": "path",
            "required": true,
            "description": "The ID of the Question List",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A list of questions from the selected Question List",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "records": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": { "type": "string" },
                          "fields": {
                            "type": "object",
                            "properties": {
                              "text": { "type": "string" },
                              "type": { "type": "string" },
                              "order": { "type": "integer" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/Answers": {
      "post": {
        "operationId": "createAnswer",
        "summary": "Save a user's answer to a question",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "records": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "fields": {
                          "type": "object",
                          "properties": {
                            "questionId": {
                              "type": "string",
                              "description": "The ID of the question being answered"
                            },
                            "userId": {
                              "type": "string",
                              "description": "Identifier for the user or session"
                            },
                            "answer": {
                              "type": "string",
                              "description": "The answer provided by the user"
                            }
                          },
                          "required": [
                            "questionId",
                            "userId",
                            "answer"
                          ]
                        }
                      },
                      "required": ["fields"]
                    }
                  }
                },
                "required": ["records"]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Answer created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "fields": {
                      "type": "object",
                      "properties": {
                        "questionId": { "type": "string" },
                        "userId": { "type": "string" },
                        "answer": { "type": "string" }
                      }
                    },
                    "createdTime": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKeyAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "API_KEY"
      }
    },
    "schemas": {}
  }
}
