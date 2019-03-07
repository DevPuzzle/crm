const validator = require('validator');
const CoverLetter = require('../mongodb/models/coverLetter');
const User = require('../mongodb/models/user');

const {checkAuth} = require('../helpers/helpers');

async function createCoverLetter({ coverLetterInput }, req) {
    checkAuth(req.isAuth);
    const errors = [];

    if (validator.isEmpty(coverLetterInput.title)) {
        errors.push({message: 'Title required'});
    }  

    const user = await User.findById({ _id: req.userId });
    const companyId = user.company_id;

    if(user === null || companyId === null) {
        errors.push({message: 'User or company not found'});
    }

    if (errors.length > 0) {
        const error = new Error(errors);
        error.data = errors;
        error.code = 422;
        console.log(error);
        throw error;
    }

    const coverLetter = new CoverLetter({
        title: coverLetterInput.title,
        company_id: companyId,
        letters: coverLetterInput.letters
    });
    const createdCoverLetter = await coverLetter.save();
    return { ...createdCoverLetter._doc };
}

async function updateCoverLetter({id, coverLetterInput}, req) {
    // console.log('coverLetterInput', coverLetterInput);
    // checkAuth(req.isAuth);
    const errors = [];

    if (validator.isEmpty(coverLetterInput.title)) {
        errors.push({message: 'Title required'});
    }

    const coverLetter = await CoverLetter.findById({ _id: id });
    if (!coverLetter) {
      const error = new Error('No Cover letter found!');
      error.code = 404;
      throw error;
    }
    if (coverLetter._id.toString() !== id) {
      const error = new Error('No authorized!');
      error.code = 403;
      throw error;
    }
    coverLetter.title = coverLetterInput.title;
    coverLetter.letters = coverLetterInput.letters;
  
    const updatedcoverLetter = await coverLetter.save();
    return {...updatedcoverLetter._doc, _id: updatedcoverLetter._id.toString()};
  }

async function getCoverLetterById (_, {_id}, req) {
    checkAuth(req.isAuth);
    try{
        const foundCoverLetter = await CoverLetter.findById(_id);
        return foundCoverLetter;
      }catch(err) {
        const error = new Error();
        error.data = 'CoverLetter was not found';
        error.code = 422;
        throw error;
      }
}

async function getCoverLetters(req) {
    checkAuth(req.isAuth);
    const coverLetters = await CoverLetter.find({company_id: req.companyId});
    return coverLetters;
}

async function deleteCoverLetter({id}, req) {
    
    checkAuth(req.isAuth);
    const coverLetter = await CoverLetter.findById(id);
    if(!coverLetter) {
      const error = new Error('No cover letter found!');
      error.code = 404;
      throw error;
    }
    await CoverLetter.findByIdAndRemove(id);
    return true;
  }

  async function deleteCoverField({id, fieldId}, req) {

    checkAuth(req.isAuth);

    const coverLetter = await CoverLetter.findById(id);
    if(!coverLetter) {
      const error = new Error('No coverLetter found!');
      error.code = 404;
      throw error;
    }

    await CoverLetter.update({
        _id: id
      }, {
        $pull: {
          letters: {
            _id: fieldId
          }
        }
      });
    
    return true;  
  }  

module.exports = {
    createCoverLetter: createCoverLetter,
    getCoverLetterById: getCoverLetterById,
    getCoverLetters: getCoverLetters,
    deleteCoverLetter: deleteCoverLetter,
    deleteCoverField: deleteCoverField,
    updateCoverLetter: updateCoverLetter
}
