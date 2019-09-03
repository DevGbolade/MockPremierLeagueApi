const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const FixtureSchema = new Schema({
    homeTeam: {
        type: String,
        required: true,
        lowercase: true
    },
    awayTeam: {
        type: String,
        required: true,
        lowercase: true
    },
    homeTeamScores: {
        type: Number,
        default: 0
    },
    awayTeamScores: {
        type: Number,
        default: 0
    },
    matchPeriod: {
        type: String,
        enum: ['First Half', 'Half Time', 'Second Half', 'Full Time']
    },
    matchDate: {
        type: Date,
        required: true,
        index: true
    },
    matchWeek: {
        type: Number,
        required: true,
        index: true,
        min: 1,
        max: 38
    },
    matchTime:{
        type: String,
        required: true,
        index: true
    },
    matchStadium: {
        type: String,
        required: true
    },
    matchStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    slug: {
        type: String,
        unique: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
});


function slugify(homeTeam, awayTeam) {
    if (!(typeof(homeTeam) == "string" && typeof (awayTeam) == "string"))return
    const text = `${homeTeam} 'vs' ${awayTeam}`;
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           
        .replace(/[^\w\-]+/g, '')       
        .replace(/\-\-+/g, '-')         
        .replace(/^-+/, '')             
        .replace(/-+$/, '');            
}

FixtureSchema.pre('save', function(next) {
    this.slug = slugify(this.homeTeam, this.awayTeam);
    next();
});

const FixtureModel = mongoose.model('Fixtures', FixtureSchema);

module.exports = FixtureModel;
