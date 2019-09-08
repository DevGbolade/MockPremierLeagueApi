const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Fixture = require('../models/fixtureModel');
const Team = require('../models/teamModel');

dotenv.config({ path: './config.env'});


const DB = 'mongodb://localhost:27017/sterling-test';




mongoose
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const users = [
    { name: 'Sanni Jokotade', email: 'sannijokotade@gmail.com', password: 'jokotade',  role: 'user'  },
    { name: 'Wahab Anjola',  email: 'Anjy@gmail.com', password: 'anjolawahab', role: 'user'  },
    { name: 'Nwonu Chidera',   email: 'chibaby@gmail.com', password: 'chiderababy', role: 'user'  },
    { name: 'Sebili Qudus',   email: 'ogsebili@gmail.com', password: 'sebiliqudus', role: 'user'  },
    { name: 'Ola mojoyin',  email: 'olamojoyin@gmail.com', password: 'mojoyinola', role:'user'  },
    { name: 'Yomi fagbure',   email: 'yomifagbure@gmail.com', password: 'fagbureyomi', role: 'user'},
    { name: 'Samuel Akinpelumi',  email: 'samakins@gmail.com', password: 'samakinssmart', role: 'admin'  },
    { name: 'Temitope Afolayan',   email: 'temiafolayan@gmail.com', password: 'temitopeafolayan', role: 'admin'},
    { name: 'Godswill king',  email: 'willy@gmail.com', password: 'godswillapakbio', role: 'admin'},
    { name: 'Praise Mbanali',   email: 'ladypraise@gmail.com', password: 'ladypraise', role: 'admin'  },
    { name: 'Yusuf Jimoh',  email: 'yusufjimoh@gmail.com', password: 'billions99', role: 'admin' },
    { name: 'Soyoye Ajibola',  email: 'soyoyeAji@gmail.com', password: 'oceanicranger', role: 'admin'},

];


const seedUsers = async () => {
    // create some event

    // use the User model to insert/save
    try {
        await User.create(users);
        console.log("Data successfully seeded");
       

        
    } catch (err) {
        console.log(err);
        
    }
    process.exit();


};


const seedTeams = async  () => {
    // create some events
    const teams = [
        { teamName: 'Chelsea',  manager: 'Frank Lampard', website: 'https://www.chelsea.com', stadium: 'Old trafford'},
        { teamName: 'Arsenal',  manager: 'Unai Emery', website: 'https://www.arsenal.com', stadium: 'Emirate'},
        { teamName: 'Liverpool',  manager: 'Jurgen Klopp', website: 'https://www.liverpool.com', stadium: 'Anfield'},
        { teamName: 'Tottenham',  manager: 'Rafa Benitez', website: 'https://www.newcastle.com', stadium: 'Wembley'},
        { teamName: 'Manchester city',  manager: 'Pep Guardiolla', website: 'https://www.manchestercity.com', stadium: 'Etihad'},

    ];

    // use the Team model to insert/save
    try {
        await Team.create(users);
        console.log("Data successfully seeded");
        process.exit();

        
    } catch (err) {
        console.log(err);
        
    }
}


const seedFixtures = async  () => {
    // create some events
    const fixtures = [
        { homeTeam: 'Chelsea',  awayTeam: 'Arsenal', matchDate: 07-09-2019, matchWeek: 1, matchTime: '13:00', matchStadium: 'Stamford Bridge'},
        { homeTeam: 'Manchester city',  awayTeam: 'Tottenham', matchDate: 14-09-2019, matchWeek: 2, matchTime: '14:00', matchStadium: 'Etihad'},
        { homeTeam: 'Arsenal',  awayTeam: 'crystal palace', matchDate: 21-09-2019, matchWeek: 20, matchTime: '13:00', matchStadium: 'O2 Arena'},
        { homeTeam: 'Liverpool',  awayTeam: 'Wolves', matchDate: 01-09-2019, matchWeek: 4, matchTime: '13:00', matchStadium: 'Anfield'},
        { homeTeam: 'Manchester united',  awayTeam: 'Burnley', matchDate: 08-09-2019, matchWeek: 3, matchTime: '15:00', matchStadium: 'Old Trafford'},


    ];

    // use the Fixture model to insert/save
    try {
        await Fixture.create(users);
        console.log("Data successfully seeded");
        
    } catch (err) {
        console.log(err);
        
    }
}


const deleteData =  {

   async deleteUser () {
        try {
            await User.deleteMany();
            console.log("Data successfully deleted");
           
        } catch (error) {
            console.log(error);

            
        }
        process.exit();
    },

    async deleteTeam () {
        try {
            await Team.deleteMany();
            console.log("Data successfully deleted");
         

        } catch (error) {
            console.log(error);
            
        }
        process.exit();
    },
    async deleteFixture () {
        try {
            await Fixture.deleteMany();
            console.log("Data successfully deleted");
             process.exit();

        } catch (error) {
            console.log(error);
            
        }
        process.exit();
    }

}



if (process.argv[2]  === '--import') {
    seedUsers();
    
}else if (process.argv[2] === '--delete'){

    deleteData.deleteUser();

}




