# Backend Elasticsearch

## Routes

GET
```
    localhost:3098/api/v1/people/ea/

    localhost:3098/api/v1/people/ea/<ID>
    
    localhost:3098/api/v1/people/ea/search/?q=text
```

POST
```
    localhost:3098/api/v1/people/ea/

    {
        "fullname": "Noel Rath",
        "email": "Noel.Davis@hotmail.com",
        "company": "Batz - Cole",
        "desc": "Tools dynamic henry International quam hack stravage Alexandria web Industrial",
        "address": "97360 Clovis Plain"
    }
```

PUT
```
    localhost:3098/api/v1/people/ea/<ID>

    {
        "fullname": "Kyle North",
        "email": "kyle.North@hotmail.com",
        "company": "Forge.INC",
        "desc": "Tools dynamic henry International quam hack stravage Alexandria web Industrial",
        "address": "97360 Clovis Plain"
    }
```

DELETE
```
    localhost:3098/api/v1/people/ea/<ID>
```