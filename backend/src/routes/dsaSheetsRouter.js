import {Router} from "express"
import { welcome ,createUser,userLoginCheck, getProfile,retrieveTopics,AssignProblemSolved ,
    
    retrieveUserProgress,
    retrieveTopicWiseSolvedProblems,
    insertSheets,
    fetchSheets,
    insertLoveBabbarSheet,
    insertApnaCollegeSheet,
    fetchProblems,

} from "../controller/queries.js";


const router = Router();

// Health route (optional)
router.route('/health').get((req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'DSA Sheets API is running'
  });
});

// Main routes
router.route('/').get(welcome);
router.route('/create-user').post(createUser);
router.route('/fetch-sheets').get(fetchSheets);
router.route('/user-login').post(userLoginCheck);
router.route('/profile/:userId').get(getProfile);
router.route('/retrieveTopics').post(retrieveTopics);
router.route('/assignProblemSolved').post(AssignProblemSolved);
router.route('/retrieveUserProgress').post(retrieveUserProgress);
router.route('/retrieveTopicWiseSolvedProblems').post(retrieveTopicWiseSolvedProblems);
router.route('/insertSheets').get(insertSheets);
router.route('/insert-love-babbar-sheet').get(insertLoveBabbarSheet);
router.route('/insert-apna-college-sheet').get(insertApnaCollegeSheet);
router.route('/fetch-problems').post(fetchProblems);

export default router;
