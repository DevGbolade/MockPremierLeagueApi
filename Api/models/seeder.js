const User = require('../models/userModel');
const Fixture = require('../models/fixtureModel');
const Team = require('../models/teamModel');



const seedUsers = (req, res) => {
    // create some events
    const users = [
        { name: 'Sanni Jokotade', email: 'sannijokotade@gmail.com', password: 'jokotade',  role: 'user'  },
        { name: 'Wahab Anjola',  email: 'Anjy@gmail.com', password: 'anjola', role: 'user'  },
        { name: 'Nwonu Chidera',   email: 'chibaby@gmail.com', password: 'chiderababy', role: 'user'  },
        { name: 'Sebili Qudus',   email: 'ogsebili@gmail.com', password: 'sebili', role: 'user'  },
        { name: 'Ola mojoyin',  email: 'olamojoyin@gmail.com', password: 'mojoyin', role:'user'  },
        { name: 'Yomi fagbure',   email: 'yomifagbure@gmail.com', password: 'fagbure', role: 'user'},

    ];

    // use the User model to insert/save
    User.remove({}, () => {
        for (user of users) {
            const newUser = new User(user);
            newUser.save();
        }
    });

    // seeded!
    res.send('Users Database seeded!');
}

const seedAdmins = (req, res) => {
    // create some events
    const admins = [
        { name: 'Samuel Akinpelumi',  email: 'samakins@gmail.com', password: 'samakins', role: 'admin'  },
        { name: 'Temitope babariga',   email: 'temibag@gmail.com', password: 'temitope', role: 'admin ' },
        { name: 'Godswill king',  email: 'willy@gmail.com', password: 'godswill', role: 'admin'  },
        { name: 'Praise Mbanali',   email: 'ladypraise@gmail.com', password: 'ladypraise', role: 'admin'  },
        { name: 'Yusuf Jimoh',  email: 'yusufjimoh@gmail.com', password: 'billions99', role: 'admin'  },
        { name: 'Soyoye Ajibola',  email: 'soyoyeAji@gmail.com', password: 'oceanicranger', role: 'admin' },

    ];

    // use the Admin model to insert/save
    User.remove({}, () => {
        for (admin of admins) {
            const newAdmin = new User(admin);
            newAdmin.save();
        }
    });

    // seeded!
    res.send('Admin Database seeded!');
}

const seedTeams = (req, res) => {
    // create some events
    const teams = [
        { teamName: 'Chelsea',  manager: 'Frank Lampard', website: 'https://www.chelsea.com', stadium: 'Old trafford'},
        { teamName: 'Arsenal',  manager: 'Unai Emery', website: 'https://www.arsenal.com', stadium: 'Emirate'},
        { teamName: 'Liverpool',  manager: 'Jurgen Klopp', website: 'https://www.liverpool.com', stadium: 'Anfield'},
        { teamName: 'Tottenham',  manager: 'Rafa Benitez', website: 'https://www.newcastle.com', stadium: 'Wembley'},
        { teamName: 'Manchester city',  manager: 'Pep Guardiolla', website: 'https://www.manchestercity.com', stadium: 'Etihad'},

    ];

    // use the Team model to insert/save
    Team.remove({}, () => {
        for (team of teams) {
            const newTeam = new Team(team);
            newTeam.save();
        }
    });

    // seeded!
    res.send('Team Database seeded!');
}


const seedFixtures = (req, res) => {
    // create some events
    const fixtures = [
        { homeTeam: 'Chelsea',  awayTeam: 'Arsenal', matchDate: 07-09-2019, matchWeek: 1, matchTime: '13:00', matchStadium: 'Stamford Bridge'},
        { homeTeam: 'Manchester city',  awayTeam: 'Tottenham', matchDate: 14-09-2019, matchWeek: 2, matchTime: '14:00', matchStadium: 'Etihad'},
        { homeTeam: 'Arsenal',  awayTeam: 'crystal palace', matchDate: 21-09-2019, matchWeek: 20, matchTime: '13:00', matchStadium: 'O2 Arena'},
        { homeTeam: 'Liverpool',  awayTeam: 'Wolves', matchDate: 01-09-2019, matchWeek: 4, matchTime: '13:00', matchStadium: 'Anfield'},
        { homeTeam: 'Manchester united',  awayTeam: 'Burnley', matchDate: 08-09-2019, matchWeek: 3, matchTime: '15:00', matchStadium: 'Old Trafford'},


    ];

    // use the Fixture model to insert/save
    FixtureModel.remove({}, () => {
        for (fixture of fixtures) {
            const newFixture = new Fixture(fixture);
            newFixture.save();
        }
    });

    // seeded!
    res.send('Fixture Database seeded!');
}


module.exports = {
    seedAdmins,
    seedFixtures,
    seedTeams,
    seedUsers
}

