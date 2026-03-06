import {Router} from "express"
import { welcome ,createUser} from "../controller/queries.js";


const router = Router();
router.route('/').get(welcome);  //https://dsa-sheets-jgbg.onrender.com/api/dsa-sheets/
router.route('/create-user').post(createUser);  //https://dsa-sheets-jgbg.onrender.com/api/dsa-sheets/create-user


export default router;