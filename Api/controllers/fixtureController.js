const FixtureModel = require('../models/fixtureModel');
const APIFeatures = require('../utilities/apiFeatures');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.addFixture = catchAsync( async (req, res) => {
 const fixture = await FixtureModel.create(req.body);
    res.status(201).json({
        status:"success", 
        data: {fixture}
    }); 
});


exports.editFixture = catchAsync( async (req, res, next) => {     
  const fixture = await FixtureModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
     if (!fixture) return next(new AppError('No fixture found with that ID', 404)); 
        res.status(201).json({
        status: "succes",
        data :{ fixture}
    }); 
});

exports.completedFixtures = catchAsync( async (req, res, next) => {
    const fixtures = await FixtureModel.find({matchStatus: 'completed'});
    if (!fixtures)  return next(new AppError('No Completed fixture is found', 404))
    res.status(201).json({
        status: "succes",
        data :{fixtures}
    });   
});

exports.pendingFixtures = catchAsync( async (req, res, next) => {
    const fixtures = await FixtureModel.find({match_status: 'pending'});
    if (!fixtures) return next(new AppError('No Pending fixture is found', 404))
    res.status(201).json({
        status: "succes",
        data :{fixtures}
    }); 
});


exports.viewOneFixture = catchAsync( async (req, res, next) => {
    const fixture = await FixtureModel.findById(req.params.id);
        if (!fixture) return next(new AppError('No fixture found with that ID', 404));
        res.status(200).json({
        status: "success",
        data :{
            fixture
        }
    });       
});


exports.viewAllFixtures = catchAsync( async (req, res) => {   
 
    const features = new APIFeatures(FixtureModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const fixtures = await features.query;
    res.status(200).json({
        status: "succes",
        result: fixtures.length,
        data :{fixtures}
    });
});

exports.removeFixture = catchAsync( async (req, res, next) => {
    const fixture = await FixtureModel.findByIdAndDelete(req.params.id);
     if(!fixture)  return next(new AppError('No fixture found with that ID', 404))
   res.status(204).json({
     status: "success",
     data : null
   });      
});

