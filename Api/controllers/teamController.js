const TeamModel = require('../models/teamModel');
const APIFeatures = require('../utilities/apiFeatures');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');


exports.addTeams = catchAsync( async (req, res) => {
        const team = await TeamModel.create(req.body);
        res.status(201).json({
            status:"success", 
            data: {team}
    }); 
});

exports.editTeam = catchAsync( async (req, res, next) => {
    
    const team = await TeamModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        });

        if (!team) return next(new AppError('No tour found with that ID', 404));
        res.status(201).json({
        status: "succes",
        data :{
            team
        }
    });       
});

exports.viewOneTeam = catchAsync( async (req, res, next) => {
    const team = await TeamModel.findById(req.params.id);
        if (!team) return next(new AppError('No team found with that ID', 404));
        res.status(201).json({
        status: "succes",
        data :{
            team
        }
    });       
});


exports.viewAllTeams = catchAsync(async (req, res) => {
    const features = new APIFeatures(TeamModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const teams = await features.query;;
    res.status(200).json({
        status: "success",
        results: teams.length,
        data: {
          teams
        }
    });
   
});


exports.removeTeam = catchAsync( async (req, res, next) => {

    const team = await TeamModel.findByIdAndDelete(req.params.id);
     if(!team) {
      return next(new AppError('No team found with that ID', 404));
     }
   res.status(204).json({
     status: "succes",
     data : null
   });
       
});

exports.searchTeam =  catchAsync( async (req, res) => {

    const teamName = req.body.teamName.toLowerCase()
    const team = await TeamModel.findOne({teamName: teamName});
      
});
