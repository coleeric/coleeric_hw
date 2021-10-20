const Author = {
    data() {
      return {
        "person": {},
         books: [],
        "bookForm":{}
        }
    },
    computed:{
      prettyBirthday(){
        return dayjs(this.person.dob.date)
        .format('D MMM YYYY')
      }
    },
    methods:{
        fetchUserData(){
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.person = parsedJson.results[0]
            })
            .catch( err => {
                console.error(err)
            })
        },
    prettyDollar(n) {
        const d = new Intl.NumberFormat("en-US").format(n);
        return "$ " + d;
    },
    fetchBookData() {
        fetch('/api/book/')
        .then( response => response.json() )
        .then( (parsedJson) => {
            console.log(parsedJson);
            this.books = parsedJson
        })
        .catch( (err) => {
            console.error(err);
        })
    },
    //postBook(evt) {
       // console.log ("Test:", this.selectedBook);
      //if (this.selectedBook) {
          //this.postEditBook(evt);
      //} else {
          //this.postNewBook(evt);
      //}
    //},
    postNewBook(evt) {
        fetch('api/book/create.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form
            this.bookForm = {};
          });
      }
},
    created() {
        this.fetchBookData();
    }
  }
  
  
Vue.createApp(Author).mount('#AuthorApp');