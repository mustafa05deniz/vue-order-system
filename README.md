# firebase setup

```
change firebase.js file

const db = firebase.initializeApp({
  your Options
}).firestore()

Please setup your static document in your firestore like below picture

statics => default => { 
  "New":0,
  "Accepted":0,
  "Cooking":0,
  "Ready":0,
  "Delivered":0,
  "Completed":0
}
```
![](screenshots/Screenshot_1.png)
![](screenshots/addNewOrder.png)<br>
![](screenshots/OrderList.png)
![](screenshots/filterBar.png)
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


### Lints and fixes files
```
npm run fix
```

