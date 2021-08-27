import { connect } from 'mongoose';

connect("mongodb+srv://Magicoo51889:<1tgw6K1CquZC5Cj3>@cluster0.7xetp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Ego is connected to mongodb"));


