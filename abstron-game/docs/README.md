Note: All HTTP API calls utilize POST due to the nature of graphql. The following are graphql calls.  

**Queries**:  

**user(username: String!): user**   
Desc: Returns a user object; password will be redacted.  
Example:  
```
query {  
    user(username: "boo") {  
        username  
    }  
}
```

**users: [user]**   
Desc: Returns an array of user objects; passwords will be redacted  
Example:  
```
query {  
    users {  
        username  
    }  
}  
```

**highScores(num: Int): [Score]**  
Desc: Returns num number of top scores. Defaults to 10.  
Example:  
```
query {  
    highScores() {  
        username  
        score  
    }  
}  
```

**Mutations:**  

**saveSub(username: String!, subscription: String!): Sub**  
Desc: Used to save service worker's stringified subscription objects  
Example:  
```
mutation {  
    saveSub(username: "boo", subscription: <json stringified subscription object>) {  
        username  
    }  
}  
```

**createUser(username: String!, firstName: String!, lastName: String!, password: String!): User**  
Desc: Creates a new user.  
Example:  
```
mutation {  
    createUser(firstName: "Albion", lastName: "Fung", username: "Boo", password: "abcd1234") {  
        username  
    }  
}  
```

**login(username: String!, password: String!): User**  
Desc: Logs a user in  
Example:  
```
mutation {  
    login(username: "Boo", password: "abcd1234") {  
        username  
    }  
}  
```

**logout(username: String!): User**  
Desc: Logs a user out  
Example:  
```
mutation {  
    logout(username: "Boo") {  
        username  
    }  
}  
```

**setUserHighScore(username: String!, score: Int!): Score**  
Desc: Set user's score  
Example:  
```
mutation {  
    setUserHighScore(username: "Boo", score: 30) {  
        username  
        score  
    }  
}    
```
