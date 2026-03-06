import {Router} from "express"
import { welcome } from "../controller/welcome.js";


const router = Router();
router.route('/').get(welcome);  //https://dsa-sheets-jgbg.onrender.com/api/dsa-sheets/welcome


export default router;